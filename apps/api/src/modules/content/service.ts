import { and, asc, eq, isNull } from 'drizzle-orm';
import type { CourseSummary, LocalizedText } from '@itstarter/shared';
import type { Database } from '../../db/client';
import { courses, levels, lessons, worlds } from '../../db/schema';
import type { LevelDef } from '../../engine/levels';
import type { Cache } from '../../lib/cache';
import { AppError } from '../../lib/errors';

const CONTENT_TTL_SECONDS = 60 * 60;

export interface LessonBase {
  id: string;
  slug: string;
  title: LocalizedText;
  summary: LocalizedText | null;
  icon: string | null;
  estimatedMinutes: number;
  xpReward: number;
  position: number;
}

export interface WorldBase {
  id: string;
  slug: string;
  title: LocalizedText;
  description: LocalizedText | null;
  icon: string;
  color: string;
  position: number;
  lessons: LessonBase[];
}

/** A published course with its published worlds and lessons, in display order. No student data. */
export interface CourseStructure extends CourseSummary {
  worlds: WorldBase[];
}

/** Visible to students: published and not soft-deleted. */
export const published = (table: typeof courses | typeof worlds | typeof lessons) =>
  and(eq(table.status, 'published'), isNull(table.deletedAt));

/**
 * Read-only access to published learning content, cached in Redis (content changes rarely and
 * every student reads it). Students only ever see `published`, non-deleted content.
 */
export class ContentService {
  constructor(
    private readonly db: Database,
    private readonly cache: Cache,
  ) {}

  async listCourses(): Promise<CourseSummary[]> {
    return this.cache.getOrLoad(await this.cache.contentKey('courses'), CONTENT_TTL_SECONDS, () =>
      this.db
        .select({
          id: courses.id,
          slug: courses.slug,
          title: courses.title,
          description: courses.description,
        })
        .from(courses)
        .where(published(courses))
        .orderBy(asc(courses.createdAt)),
    );
  }

  async courseStructure(courseId: string): Promise<CourseStructure> {
    const structure = await this.cache.getOrLoad(
      await this.cache.contentKey(`course:${courseId}`),
      CONTENT_TTL_SECONDS,
      () => this.loadCourseStructure(courseId),
    );
    if (!structure) throw AppError.notFound('COURSE_NOT_FOUND', 'Course not found');
    return structure;
  }

  /** The course a world belongs to, plus the world itself. */
  async worldWithCourse(worldId: string): Promise<{ course: CourseStructure; world: WorldBase }> {
    const [row] = await this.db
      .select({ courseId: worlds.courseId })
      .from(worlds)
      .where(and(eq(worlds.id, worldId), published(worlds)));
    if (!row) throw AppError.notFound('WORLD_NOT_FOUND', 'World not found');
    const course = await this.courseStructure(row.courseId);
    const world = course.worlds.find((w) => w.id === worldId);
    if (!world) throw AppError.notFound('WORLD_NOT_FOUND', 'World not found');
    return { course, world };
  }

  async levels(): Promise<LevelDef[]> {
    return this.cache.getOrLoad(await this.cache.contentKey('levels'), CONTENT_TTL_SECONDS, () =>
      this.db
        .select({
          number: levels.number,
          name: levels.name,
          icon: levels.icon,
          minXp: levels.minXp,
        })
        .from(levels)
        .orderBy(asc(levels.minXp)),
    );
  }

  private async loadCourseStructure(courseId: string): Promise<CourseStructure | null> {
    const [course] = await this.db
      .select({
        id: courses.id,
        slug: courses.slug,
        title: courses.title,
        description: courses.description,
      })
      .from(courses)
      .where(and(eq(courses.id, courseId), published(courses)));
    if (!course) return null;

    const rows = await this.db
      .select({ world: worlds, lesson: lessons })
      .from(worlds)
      .leftJoin(lessons, and(eq(lessons.worldId, worlds.id), published(lessons)))
      .where(and(eq(worlds.courseId, courseId), published(worlds)))
      .orderBy(
        asc(worlds.position),
        asc(worlds.createdAt),
        asc(lessons.position),
        asc(lessons.createdAt),
      );

    const byId = new Map<string, WorldBase>();
    for (const { world, lesson } of rows) {
      let entry = byId.get(world.id);
      if (!entry) {
        entry = {
          id: world.id,
          slug: world.slug,
          title: world.title,
          description: world.description,
          icon: world.icon,
          color: world.color,
          position: world.position,
          lessons: [],
        };
        byId.set(world.id, entry);
      }
      if (lesson) {
        entry.lessons.push({
          id: lesson.id,
          slug: lesson.slug,
          title: lesson.title,
          summary: lesson.summary,
          icon: lesson.icon,
          estimatedMinutes: lesson.estimatedMinutes,
          xpReward: lesson.xpReward,
          position: lesson.position,
        });
      }
    }
    return { ...course, worlds: [...byId.values()] };
  }
}
