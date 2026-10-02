'use client';

/**
 * A tiny spreadsheet: column letters (A, B, C…), row numbers (1, 2, 3…), and cells.
 * Read-only by default; pass onSelect to let the student tap a cell.
 * One empty row is added at the bottom (where a total usually goes).
 */
interface SheetGridProps {
  rows: (string | number)[][];
  selected?: string | null;
  onSelect?: (cell: string) => void;
  disabled?: boolean;
  label: string;
}

export const columnLetter = (index: number) => String.fromCharCode(65 + index);

export function SheetGrid({ rows, selected, onSelect, disabled, label }: SheetGridProps) {
  const columns = Math.max(...rows.map((r) => r.length));
  const allRows = [...rows, Array.from({ length: columns }, () => '')];

  return (
    <div className="max-w-full overflow-x-auto rounded-control border border-line bg-surface">
      <table className="w-full border-collapse text-left text-sm sm:text-base" aria-label={label}>
        <thead>
          <tr>
            <th className="w-9 border border-line bg-slate-100" aria-hidden="true" />
            {Array.from({ length: columns }, (_, c) => (
              <th
                key={c}
                scope="col"
                className="border border-line bg-slate-100 px-2 py-1 text-center font-bold text-muted"
              >
                {columnLetter(c)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {allRows.map((row, r) => (
            <tr key={r}>
              <th
                scope="row"
                className="border border-line bg-slate-100 px-2 text-center font-bold text-muted"
              >
                {r + 1}
              </th>
              {Array.from({ length: columns }, (_, c) => {
                const address = `${columnLetter(c)}${r + 1}`;
                const value = row[c] ?? '';
                const isSelected = selected === address;
                const text = (
                  <span
                    className={
                      typeof value === 'number' ? 'block text-right tabular-nums' : 'block'
                    }
                  >
                    {value}
                  </span>
                );
                return (
                  <td key={c} className={`border border-line p-0 ${r === 0 ? 'font-bold' : ''}`}>
                    {onSelect ? (
                      <button
                        type="button"
                        disabled={disabled}
                        onClick={() => onSelect(address)}
                        aria-label={`${address}${value !== '' ? `: ${value}` : ''}`}
                        aria-pressed={isSelected}
                        className={`min-h-11 w-full min-w-16 px-2 text-left ${
                          isSelected
                            ? 'bg-emerald-100 outline-2 -outline-offset-2 outline-emerald-600'
                            : 'hover:bg-brand-50'
                        }`}
                      >
                        {text}
                      </button>
                    ) : (
                      <div className="min-h-9 min-w-16 px-2 py-1.5">{text}</div>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
