CREATE TYPE "public"."content_status" AS ENUM('draft', 'published', 'archived');--> statement-breakpoint
CREATE TYPE "public"."lesson_progress_status" AS ENUM('in_progress', 'completed');--> statement-breakpoint
CREATE TYPE "public"."lesson_step" AS ENUM('welcome', 'learn', 'see', 'play', 'challenge', 'reward');--> statement-breakpoint
CREATE TYPE "public"."user_status" AS ENUM('active', 'disabled');--> statement-breakpoint
CREATE TYPE "public"."xp_source" AS ENUM('activity', 'lesson', 'achievement', 'admin');--> statement-breakpoint
CREATE TABLE "achievements" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"code" varchar(40) NOT NULL,
	"name" jsonb NOT NULL,
	"description" jsonb NOT NULL,
	"icon" varchar(16) NOT NULL,
	"criteria" jsonb NOT NULL,
	"xp_bonus" integer DEFAULT 0 NOT NULL,
	"status" "content_status" DEFAULT 'published' NOT NULL,
	"position" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "achievements_code_uq" UNIQUE("code"),
	CONSTRAINT "achievements_xp_bonus_ck" CHECK ("achievements"."xp_bonus" >= 0)
);
--> statement-breakpoint
CREATE TABLE "activities" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"lesson_id" uuid NOT NULL,
	"step" "lesson_step" NOT NULL,
	"type" varchar(40) NOT NULL,
	"title" jsonb,
	"config" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"is_scored" boolean DEFAULT false NOT NULL,
	"pass_score" smallint DEFAULT 0 NOT NULL,
	"xp_reward" integer DEFAULT 10 NOT NULL,
	"position" integer DEFAULT 0 NOT NULL,
	"status" "content_status" DEFAULT 'published' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone,
	CONSTRAINT "activities_pass_score_ck" CHECK ("activities"."pass_score" between 0 and 100),
	CONSTRAINT "activities_xp_ck" CHECK ("activities"."xp_reward" >= 0)
);
--> statement-breakpoint
CREATE TABLE "badges" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"code" varchar(40) NOT NULL,
	"name" jsonb NOT NULL,
	"description" jsonb NOT NULL,
	"icon" varchar(16) NOT NULL,
	"criteria" jsonb NOT NULL,
	"status" "content_status" DEFAULT 'published' NOT NULL,
	"position" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "badges_code_uq" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "courses" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" varchar(80) NOT NULL,
	"title" jsonb NOT NULL,
	"description" jsonb,
	"status" "content_status" DEFAULT 'draft' NOT NULL,
	"published_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone,
	CONSTRAINT "courses_slug_uq" UNIQUE("slug"),
	CONSTRAINT "courses_slug_ck" CHECK ("courses"."slug" ~ '^[a-z0-9]+(-[a-z0-9]+)*$')
);
--> statement-breakpoint
CREATE TABLE "lessons" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"world_id" uuid NOT NULL,
	"slug" varchar(80) NOT NULL,
	"title" jsonb NOT NULL,
	"summary" jsonb,
	"icon" varchar(16),
	"estimated_minutes" smallint DEFAULT 5 NOT NULL,
	"xp_reward" integer DEFAULT 50 NOT NULL,
	"position" integer DEFAULT 0 NOT NULL,
	"status" "content_status" DEFAULT 'draft' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone,
	CONSTRAINT "lessons_world_slug_uq" UNIQUE("world_id","slug"),
	CONSTRAINT "lessons_slug_ck" CHECK ("lessons"."slug" ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
	CONSTRAINT "lessons_minutes_ck" CHECK ("lessons"."estimated_minutes" between 1 and 60),
	CONSTRAINT "lessons_xp_ck" CHECK ("lessons"."xp_reward" >= 0)
);
--> statement-breakpoint
CREATE TABLE "levels" (
	"number" smallint PRIMARY KEY NOT NULL,
	"name" jsonb NOT NULL,
	"icon" varchar(16) NOT NULL,
	"min_xp" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "levels_min_xp_uq" UNIQUE("min_xp"),
	CONSTRAINT "levels_number_ck" CHECK ("levels"."number" >= 1),
	CONSTRAINT "levels_min_xp_ck" CHECK ("levels"."min_xp" >= 0)
);
--> statement-breakpoint
CREATE TABLE "question_options" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"question_id" uuid NOT NULL,
	"label" jsonb NOT NULL,
	"media" jsonb,
	"group_key" varchar(40),
	"is_correct" boolean DEFAULT false NOT NULL,
	"match_key" varchar(40),
	"correct_order" smallint,
	"position" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "questions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"activity_id" uuid NOT NULL,
	"kind" varchar(40) NOT NULL,
	"prompt" jsonb NOT NULL,
	"media" jsonb,
	"hint" jsonb,
	"explanation" jsonb,
	"difficulty" smallint DEFAULT 1 NOT NULL,
	"config" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"position" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "questions_difficulty_ck" CHECK ("questions"."difficulty" between 1 and 3)
);
--> statement-breakpoint
CREATE TABLE "worlds" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"course_id" uuid NOT NULL,
	"slug" varchar(80) NOT NULL,
	"title" jsonb NOT NULL,
	"description" jsonb,
	"icon" varchar(16) NOT NULL,
	"color" varchar(20) NOT NULL,
	"position" integer DEFAULT 0 NOT NULL,
	"status" "content_status" DEFAULT 'draft' NOT NULL,
	"badge_id" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone,
	CONSTRAINT "worlds_course_slug_uq" UNIQUE("course_id","slug"),
	CONSTRAINT "worlds_slug_ck" CHECK ("worlds"."slug" ~ '^[a-z0-9]+(-[a-z0-9]+)*$')
);
--> statement-breakpoint
CREATE TABLE "cohorts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"course_id" uuid NOT NULL,
	"name" varchar(100) NOT NULL,
	"year" smallint NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone,
	CONSTRAINT "cohorts_course_name_uq" UNIQUE("course_id","name")
);
--> statement-breakpoint
CREATE TABLE "roles" (
	"id" smallint PRIMARY KEY NOT NULL,
	"code" varchar(20) NOT NULL,
	CONSTRAINT "roles_code_uq" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"token_hash" varchar(64) NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"last_seen_at" timestamp with time zone DEFAULT now() NOT NULL,
	"user_agent" varchar(255),
	"revoked_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "sessions_token_hash_uq" UNIQUE("token_hash")
);
--> statement-breakpoint
CREATE TABLE "staff" (
	"user_id" uuid PRIMARY KEY NOT NULL,
	"title" varchar(80),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "students" (
	"user_id" uuid PRIMARY KEY NOT NULL,
	"cohort_id" uuid,
	"xp_total" integer DEFAULT 0 NOT NULL,
	"level" smallint DEFAULT 1 NOT NULL,
	"current_streak" integer DEFAULT 0 NOT NULL,
	"longest_streak" integer DEFAULT 0 NOT NULL,
	"last_active_date" date,
	"timezone" varchar(40) DEFAULT 'Asia/Phnom_Penh' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "students_xp_ck" CHECK ("students"."xp_total" >= 0),
	CONSTRAINT "students_streak_ck" CHECK ("students"."current_streak" >= 0 and "students"."longest_streak" >= 0)
);
--> statement-breakpoint
CREATE TABLE "teacher_cohorts" (
	"staff_user_id" uuid NOT NULL,
	"cohort_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "teacher_cohorts_pk" PRIMARY KEY("staff_user_id","cohort_id")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" varchar(50) NOT NULL,
	"email" varchar(254),
	"password_hash" text NOT NULL,
	"role_id" smallint NOT NULL,
	"display_name" varchar(80) NOT NULL,
	"locale" varchar(5) DEFAULT 'en' NOT NULL,
	"status" "user_status" DEFAULT 'active' NOT NULL,
	"must_change_password" boolean DEFAULT false NOT NULL,
	"last_login_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone,
	CONSTRAINT "users_username_ck" CHECK ("users"."username" ~ '^[a-z0-9][a-z0-9._-]{2,49}$'),
	CONSTRAINT "users_locale_ck" CHECK ("users"."locale" in ('en', 'km'))
);
--> statement-breakpoint
CREATE TABLE "student_achievements" (
	"student_id" uuid NOT NULL,
	"achievement_id" uuid NOT NULL,
	"awarded_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "student_achievements_pk" PRIMARY KEY("student_id","achievement_id")
);
--> statement-breakpoint
CREATE TABLE "student_activity_attempts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"student_id" uuid NOT NULL,
	"activity_id" uuid NOT NULL,
	"question_id" uuid,
	"answer" jsonb NOT NULL,
	"is_correct" boolean,
	"score" smallint,
	"duration_ms" integer,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "attempts_score_ck" CHECK ("student_activity_attempts"."score" between 0 and 100)
);
--> statement-breakpoint
CREATE TABLE "student_badges" (
	"student_id" uuid NOT NULL,
	"badge_id" uuid NOT NULL,
	"awarded_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "student_badges_pk" PRIMARY KEY("student_id","badge_id")
);
--> statement-breakpoint
CREATE TABLE "student_creations" (
	"student_id" uuid NOT NULL,
	"activity_id" uuid NOT NULL,
	"content" jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "student_creations_pk" PRIMARY KEY("student_id","activity_id")
);
--> statement-breakpoint
CREATE TABLE "student_daily_activity" (
	"student_id" uuid NOT NULL,
	"day" date NOT NULL,
	"xp_earned" integer DEFAULT 0 NOT NULL,
	"seconds_active" integer DEFAULT 0 NOT NULL,
	"activities_completed" integer DEFAULT 0 NOT NULL,
	"lessons_completed" integer DEFAULT 0 NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "student_daily_activity_pk" PRIMARY KEY("student_id","day")
);
--> statement-breakpoint
CREATE TABLE "student_lesson_progress" (
	"student_id" uuid NOT NULL,
	"lesson_id" uuid NOT NULL,
	"status" "lesson_progress_status" DEFAULT 'in_progress' NOT NULL,
	"current_position" integer DEFAULT 0 NOT NULL,
	"best_score" smallint,
	"attempts" integer DEFAULT 0 NOT NULL,
	"time_spent_seconds" integer DEFAULT 0 NOT NULL,
	"started_at" timestamp with time zone DEFAULT now() NOT NULL,
	"completed_at" timestamp with time zone,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "student_lesson_progress_pk" PRIMARY KEY("student_id","lesson_id"),
	CONSTRAINT "student_lesson_progress_score_ck" CHECK ("student_lesson_progress"."best_score" between 0 and 100)
);
--> statement-breakpoint
CREATE TABLE "student_progress" (
	"student_id" uuid NOT NULL,
	"world_id" uuid NOT NULL,
	"lessons_completed" integer DEFAULT 0 NOT NULL,
	"lessons_total" integer DEFAULT 0 NOT NULL,
	"percent" smallint DEFAULT 0 NOT NULL,
	"last_activity_at" timestamp with time zone,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "student_progress_pk" PRIMARY KEY("student_id","world_id"),
	CONSTRAINT "student_progress_percent_ck" CHECK ("student_progress"."percent" between 0 and 100)
);
--> statement-breakpoint
CREATE TABLE "xp_transactions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"student_id" uuid NOT NULL,
	"amount" integer NOT NULL,
	"source_type" "xp_source" NOT NULL,
	"source_id" uuid NOT NULL,
	"reason" varchar(200),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "xp_transactions_source_uq" UNIQUE("student_id","source_type","source_id"),
	CONSTRAINT "xp_transactions_amount_ck" CHECK ("xp_transactions"."amount" <> 0)
);
--> statement-breakpoint
CREATE TABLE "audit_logs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"actor_user_id" uuid,
	"action" varchar(60) NOT NULL,
	"entity_type" varchar(40) NOT NULL,
	"entity_id" uuid,
	"metadata" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "notifications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"type" varchar(40) NOT NULL,
	"payload" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"read_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "activities" ADD CONSTRAINT "activities_lesson_id_lessons_id_fk" FOREIGN KEY ("lesson_id") REFERENCES "public"."lessons"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lessons" ADD CONSTRAINT "lessons_world_id_worlds_id_fk" FOREIGN KEY ("world_id") REFERENCES "public"."worlds"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "question_options" ADD CONSTRAINT "question_options_question_id_questions_id_fk" FOREIGN KEY ("question_id") REFERENCES "public"."questions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "questions" ADD CONSTRAINT "questions_activity_id_activities_id_fk" FOREIGN KEY ("activity_id") REFERENCES "public"."activities"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "worlds" ADD CONSTRAINT "worlds_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "worlds" ADD CONSTRAINT "worlds_badge_id_badges_id_fk" FOREIGN KEY ("badge_id") REFERENCES "public"."badges"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cohorts" ADD CONSTRAINT "cohorts_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "staff" ADD CONSTRAINT "staff_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "students" ADD CONSTRAINT "students_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "students" ADD CONSTRAINT "students_cohort_id_cohorts_id_fk" FOREIGN KEY ("cohort_id") REFERENCES "public"."cohorts"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "teacher_cohorts" ADD CONSTRAINT "teacher_cohorts_staff_user_id_staff_user_id_fk" FOREIGN KEY ("staff_user_id") REFERENCES "public"."staff"("user_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "teacher_cohorts" ADD CONSTRAINT "teacher_cohorts_cohort_id_cohorts_id_fk" FOREIGN KEY ("cohort_id") REFERENCES "public"."cohorts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_role_id_roles_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_achievements" ADD CONSTRAINT "student_achievements_student_id_students_user_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."students"("user_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_achievements" ADD CONSTRAINT "student_achievements_achievement_id_achievements_id_fk" FOREIGN KEY ("achievement_id") REFERENCES "public"."achievements"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_activity_attempts" ADD CONSTRAINT "student_activity_attempts_student_id_students_user_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."students"("user_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_activity_attempts" ADD CONSTRAINT "student_activity_attempts_activity_id_activities_id_fk" FOREIGN KEY ("activity_id") REFERENCES "public"."activities"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_activity_attempts" ADD CONSTRAINT "student_activity_attempts_question_id_questions_id_fk" FOREIGN KEY ("question_id") REFERENCES "public"."questions"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_badges" ADD CONSTRAINT "student_badges_student_id_students_user_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."students"("user_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_badges" ADD CONSTRAINT "student_badges_badge_id_badges_id_fk" FOREIGN KEY ("badge_id") REFERENCES "public"."badges"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_creations" ADD CONSTRAINT "student_creations_student_id_students_user_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."students"("user_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_creations" ADD CONSTRAINT "student_creations_activity_id_activities_id_fk" FOREIGN KEY ("activity_id") REFERENCES "public"."activities"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_daily_activity" ADD CONSTRAINT "student_daily_activity_student_id_students_user_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."students"("user_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_lesson_progress" ADD CONSTRAINT "student_lesson_progress_student_id_students_user_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."students"("user_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_lesson_progress" ADD CONSTRAINT "student_lesson_progress_lesson_id_lessons_id_fk" FOREIGN KEY ("lesson_id") REFERENCES "public"."lessons"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_progress" ADD CONSTRAINT "student_progress_student_id_students_user_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."students"("user_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_progress" ADD CONSTRAINT "student_progress_world_id_worlds_id_fk" FOREIGN KEY ("world_id") REFERENCES "public"."worlds"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "xp_transactions" ADD CONSTRAINT "xp_transactions_student_id_students_user_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."students"("user_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_actor_user_id_users_id_fk" FOREIGN KEY ("actor_user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "activities_lesson_position_idx" ON "activities" USING btree ("lesson_id","position");--> statement-breakpoint
CREATE INDEX "badges_status_position_idx" ON "badges" USING btree ("status","position");--> statement-breakpoint
CREATE INDEX "lessons_world_position_idx" ON "lessons" USING btree ("world_id","position");--> statement-breakpoint
CREATE INDEX "question_options_question_idx" ON "question_options" USING btree ("question_id","position");--> statement-breakpoint
CREATE INDEX "questions_activity_position_idx" ON "questions" USING btree ("activity_id","position");--> statement-breakpoint
CREATE INDEX "worlds_course_position_idx" ON "worlds" USING btree ("course_id","position");--> statement-breakpoint
CREATE INDEX "sessions_user_idx" ON "sessions" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "sessions_expires_idx" ON "sessions" USING btree ("expires_at");--> statement-breakpoint
CREATE INDEX "students_cohort_idx" ON "students" USING btree ("cohort_id");--> statement-breakpoint
CREATE INDEX "students_xp_idx" ON "students" USING btree ("xp_total");--> statement-breakpoint
CREATE INDEX "teacher_cohorts_cohort_idx" ON "teacher_cohorts" USING btree ("cohort_id");--> statement-breakpoint
CREATE UNIQUE INDEX "users_username_active_uq" ON "users" USING btree ("username") WHERE "users"."deleted_at" is null;--> statement-breakpoint
CREATE UNIQUE INDEX "users_email_active_uq" ON "users" USING btree (lower("email")) WHERE "users"."email" is not null and "users"."deleted_at" is null;--> statement-breakpoint
CREATE INDEX "users_role_idx" ON "users" USING btree ("role_id");--> statement-breakpoint
CREATE INDEX "student_achievements_achievement_idx" ON "student_achievements" USING btree ("achievement_id");--> statement-breakpoint
CREATE INDEX "attempts_student_activity_idx" ON "student_activity_attempts" USING btree ("student_id","activity_id");--> statement-breakpoint
CREATE INDEX "attempts_activity_correct_idx" ON "student_activity_attempts" USING btree ("activity_id","is_correct");--> statement-breakpoint
CREATE INDEX "attempts_created_idx" ON "student_activity_attempts" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "student_badges_badge_idx" ON "student_badges" USING btree ("badge_id");--> statement-breakpoint
CREATE INDEX "student_daily_activity_day_idx" ON "student_daily_activity" USING btree ("day");--> statement-breakpoint
CREATE INDEX "student_lesson_progress_lesson_status_idx" ON "student_lesson_progress" USING btree ("lesson_id","status");--> statement-breakpoint
CREATE INDEX "student_progress_world_idx" ON "student_progress" USING btree ("world_id");--> statement-breakpoint
CREATE INDEX "xp_transactions_student_created_idx" ON "xp_transactions" USING btree ("student_id","created_at");--> statement-breakpoint
CREATE INDEX "audit_logs_entity_idx" ON "audit_logs" USING btree ("entity_type","entity_id");--> statement-breakpoint
CREATE INDEX "audit_logs_created_idx" ON "audit_logs" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "notifications_user_read_idx" ON "notifications" USING btree ("user_id","read_at");