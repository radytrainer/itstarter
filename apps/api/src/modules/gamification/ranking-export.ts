import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import PDFDocument from 'pdfkit';
import type { RankingPeriod } from '@itstarter/shared';
import { csvCell } from '../teacher/progress-report';
import type { RankingExportRow } from './ranking';

export type ExportLang = 'en' | 'km';

const LABELS = {
  en: {
    title: 'Student ranking',
    period: { all: 'All time', week: 'This week (last 7 days)' },
    periodLabel: 'Period',
    cohort: 'Class',
    allCohorts: 'All classes',
    students: 'Students',
    generated: 'Generated',
    rank: 'Rank',
    name: 'Name',
    username: 'Username',
    xp: { all: 'XP', week: 'XP (7 days)' },
    xpTotal: 'Total XP',
    level: 'Level',
    lessons: 'Lessons',
    lastActive: 'Last active',
    noClass: '-',
    page: (n: number, total: number) => `Page ${n} of ${total}`,
    empty: 'No students yet.',
  },
  km: {
    title: 'ចំណាត់ថ្នាក់សិស្ស',
    period: { all: 'គ្រប់ពេល', week: 'សប្តាហ៍នេះ (7 ថ្ងៃចុងក្រោយ)' },
    periodLabel: 'រយៈពេល',
    cohort: 'ថ្នាក់',
    allCohorts: 'ថ្នាក់ទាំងអស់',
    students: 'សិស្ស',
    generated: 'បង្កើតនៅ',
    rank: 'លេខ',
    name: 'ឈ្មោះ',
    username: 'ឈ្មោះអ្នកប្រើ',
    xp: { all: 'XP', week: 'XP (7 ថ្ងៃ)' },
    xpTotal: 'XP សរុប',
    level: 'កម្រិត',
    lessons: 'មេរៀន',
    lastActive: 'សកម្មចុងក្រោយ',
    noClass: '-',
    page: (n: number, total: number) => `ទំព័រ ${n} / ${total}`,
    empty: 'មិនទាន់មានសិស្សនៅឡើយ។',
  },
} as const;

export interface ExportInfo {
  period: RankingPeriod;
  lang: ExportLang;
  cohortName: string | null;
  /** When the file was made, shown in Cambodia time. */
  now: Date;
}

const stamp = (d: Date) =>
  new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Phnom_Penh',
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(d);

/** CSV for Excel / Google Sheets: UTF-8 with BOM (Khmer opens correctly), one row per student. */
export function rankingCsv(rows: RankingExportRow[], info: ExportInfo): string {
  const L = LABELS[info.lang];
  const header = [
    L.rank,
    L.name,
    L.username,
    L.cohort,
    L.xp[info.period],
    L.xpTotal,
    L.level,
    L.lessons,
    L.lastActive,
  ];
  const lines = rows.map((r) => [
    r.rank ?? '',
    r.displayName,
    r.username,
    r.cohort ?? '',
    r.xp,
    r.xpTotal,
    r.level,
    r.lessonsCompleted,
    r.lastActive ?? '',
  ]);
  return `\uFEFF${[header, ...lines].map((cells) => cells.map(csvCell).join(',')).join('\r\n')}\r\n`;
}

/** Fonts live in apps/api/assets (next to src/ in development, next to dist/ in the image). */
function fontPath(file: string): string {
  for (const up of ['../assets/fonts/', '../../../assets/fonts/']) {
    const path = fileURLToPath(new URL(up + file, import.meta.url));
    if (existsSync(path)) return path;
  }
  throw new Error(`Font not found: ${file}`);
}

// A4 portrait, in points.
const PAGE = { width: 595.28, height: 841.89, margin: 40 };
const COLORS = {
  brand: '#4F46E5',
  ink: '#0F172A',
  muted: '#64748B',
  line: '#E2E8F0',
  zebra: '#F8FAFC',
  head: '#EEF2FF',
  medal: ['#D4A017', '#9CA3AF', '#B87333'],
};

interface Column {
  label: string;
  width: number;
  align: 'left' | 'right' | 'center';
  value: (r: RankingExportRow) => string;
}

/** A clean, printable A4 PDF: title, period/class/date, then the ranked table on every page. */
export function rankingPdf(rows: RankingExportRow[], info: ExportInfo): Promise<Buffer> {
  const L = LABELS[info.lang];
  const doc = new PDFDocument({
    size: 'A4',
    margin: PAGE.margin,
    bufferPages: true,
    info: { Title: `IT Starter 2028 — ${LABELS.en.title}`, Author: 'IT Starter 2028' },
  });
  const regular = fontPath('Battambang-Regular.ttf');
  const bold = fontPath('Battambang-Bold.ttf');
  doc.registerFont('regular', regular);
  doc.registerFont('bold', bold);

  const columns: Column[] = [
    {
      label: L.rank,
      width: 42,
      align: 'center',
      value: (r) => (r.rank === null ? '-' : String(r.rank)),
    },
    { label: L.name, width: 150, align: 'left', value: (r) => r.displayName },
    { label: L.username, width: 100, align: 'left', value: (r) => r.username },
    { label: L.cohort, width: 88, align: 'left', value: (r) => r.cohort ?? L.noClass },
    {
      label: L.xp[info.period],
      width: 55,
      align: 'right',
      value: (r) => r.xp.toLocaleString('en-US'),
    },
    { label: L.level, width: 35, align: 'center', value: (r) => String(r.level) },
    { label: L.lessons, width: 45, align: 'right', value: (r) => String(r.lessonsCompleted) },
  ];
  const tableWidth = columns.reduce((n, c) => n + c.width, 0);
  const left = PAGE.margin;
  const rowHeight = 22;
  const bottom = PAGE.height - PAGE.margin - 24; // room for the footer

  /** Draws text cut to its cell (with ... when too long), vertically centred in the row. */
  const cell = (text: string, x: number, y: number, col: Column, font: string, size: number) => {
    doc.font(font).fontSize(size);
    let shown = text;
    const max = col.width - 10;
    if (doc.widthOfString(shown) > max) {
      while (shown.length > 1 && doc.widthOfString(`${shown}...`) > max) shown = shown.slice(0, -1);
      shown = `${shown}...`;
    }
    doc.text(shown, x + 5, y + (rowHeight - size * 1.45) / 2, {
      width: max,
      align: col.align,
      lineBreak: false,
    });
  };

  const tableHeader = (y: number) => {
    doc.rect(left, y, tableWidth, rowHeight).fill(COLORS.head);
    doc.fillColor(COLORS.brand);
    let x = left;
    for (const col of columns) {
      cell(col.label, x, y, col, 'bold', 9);
      x += col.width;
    }
    return y + rowHeight;
  };

  // Title block (first page).
  doc.rect(0, 0, PAGE.width, 6).fill(COLORS.brand);
  doc.fillColor(COLORS.brand).font('bold').fontSize(11).text('IT Starter 2028', left, 28);
  doc.fillColor(COLORS.ink).font('bold').fontSize(22).text(L.title, left, 44);
  const meta = [
    `${L.periodLabel}: ${L.period[info.period]}`,
    `${L.cohort}: ${info.cohortName ?? L.allCohorts}`,
    `${L.students}: ${rows.length}`,
    `${L.generated}: ${stamp(info.now)}`,
  ].join('    |    '); // the PDF font has no bullet or long dash
  doc
    .fillColor(COLORS.muted)
    .font('regular')
    .fontSize(9)
    .text(meta, left, 80, { width: tableWidth });
  doc
    .moveTo(left, 100)
    .lineTo(left + tableWidth, 100)
    .lineWidth(0.5)
    .strokeColor(COLORS.line)
    .stroke();

  let y = tableHeader(112);
  if (rows.length === 0) {
    doc
      .fillColor(COLORS.muted)
      .font('regular')
      .fontSize(11)
      .text(L.empty, left, y + 12);
  }
  rows.forEach((r, i) => {
    if (y + rowHeight > bottom) {
      doc.addPage();
      doc.rect(0, 0, PAGE.width, 6).fill(COLORS.brand);
      y = tableHeader(PAGE.margin);
    }
    if (i % 2 === 1) doc.rect(left, y, tableWidth, rowHeight).fill(COLORS.zebra);
    const top3 = r.rank !== null && r.rank <= 3;
    if (top3) {
      // A small medal disc behind the rank number: gold, silver, bronze.
      doc
        .circle(left + columns[0]!.width / 2, y + rowHeight / 2, 8)
        .fill(COLORS.medal[r.rank! - 1]!);
    }
    let x = left;
    columns.forEach((col, c) => {
      doc.fillColor(c === 0 && top3 ? '#FFFFFF' : c === 0 ? COLORS.muted : COLORS.ink);
      cell(col.value(r), x, y, col, top3 || c === 0 ? 'bold' : 'regular', 9.5);
      x += col.width;
    });
    doc
      .moveTo(left, y + rowHeight)
      .lineTo(left + tableWidth, y + rowHeight)
      .lineWidth(0.4)
      .strokeColor(COLORS.line)
      .stroke();
    y += rowHeight;
  });

  // Footer on every page: name of the report and "Page n of N".
  const range = doc.bufferedPageRange();
  for (let p = range.start; p < range.start + range.count; p += 1) {
    doc.switchToPage(p);
    doc.page.margins.bottom = 0; // the footer sits in the margin (no new page)
    const fy = PAGE.height - PAGE.margin;
    doc.fillColor(COLORS.muted).font('regular').fontSize(8);
    doc.text(`IT Starter 2028 - ${L.title}`, left, fy, { lineBreak: false });
    doc.text(L.page(p + 1, range.count), left, fy, {
      width: tableWidth,
      align: 'right',
      lineBreak: false,
    });
  }

  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    doc.on('data', (c: Buffer) => chunks.push(c));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);
    doc.end();
  });
}
