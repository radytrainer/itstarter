import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { AppShell } from '@/components/app-shell';
import { BadgeIcon } from '@/components/ui/badge-icon';
import { Button, ButtonLink } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Feedback } from '@/components/ui/feedback';
import { ProgressBar } from '@/components/ui/progress-bar';
import { StatPill } from '@/components/ui/stat-pill';
import { TextField } from '@/components/ui/text-field';
import { WORLD_STYLES } from '@/lib/worlds';

// Living style guide for the team: every UI building block on one page. Not available in production.
export const dynamic = 'force-dynamic';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-xl font-extrabold">{title}</h2>
      {children}
    </section>
  );
}

export default async function DesignPage() {
  if (process.env.NODE_ENV === 'production') notFound();
  const t = await getTranslations();
  const correct = t.raw('feedback.correct') as string[];
  const tryAgain = t.raw('feedback.tryAgain') as string[];

  return (
    <AppShell signedIn>
      <h1 className="text-3xl font-extrabold">Design system</h1>

      <Section title="Typography">
        <Card className="flex flex-col gap-2">
          <p className="text-3xl font-extrabold">Heading 1 · {t('app.name')}</p>
          <p className="text-xl font-extrabold">Heading 2 · {t('dashboard.worldsTitle')}</p>
          <p className="text-lg">Body large · {t('app.tagline')}</p>
          <p>Body · {t('auth.login.subtitle')}</p>
          <p className="text-sm text-muted">Small / muted · {t('auth.login.forgot')}</p>
          <p lang="km" className="text-lg">
            ខ្មែរ · ក្តារចុច កុំព្យូទ័រ អ៊ីនធឺណិត
          </p>
        </Card>
      </Section>

      <Section title="Buttons">
        <div className="flex flex-wrap gap-3">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="success">Success</Button>
          <Button loading loadingText={t('common.saving')}>
            Loading
          </Button>
          <Button disabled>Disabled</Button>
          <ButtonLink href="/" size="lg">
            Large link
          </ButtonLink>
        </div>
      </Section>

      <Section title="Stats">
        <div className="flex flex-wrap gap-2">
          <StatPill icon="⭐" tone="xp">
            {t('common.xp', { xp: 420 })}
          </StatPill>
          <StatPill icon="🔥" tone="streak">
            {t('dashboard.streak', { count: 3 })}
          </StatPill>
          <StatPill icon="🌱" tone="level">
            {t('dashboard.level', { number: 1 })}
          </StatPill>
        </div>
      </Section>

      <Section title="Progress & world colours">
        <Card className="flex flex-col gap-3">
          {Object.entries(WORLD_STYLES).map(([color, style], i) => (
            <div key={color} className="flex items-center gap-3">
              <span className="w-20 text-sm font-semibold">{color}</span>
              <ProgressBar value={15 + i * 18} label={color} barClassName={style.bar} />
            </div>
          ))}
        </Card>
      </Section>

      <Section title="Badges">
        <div className="flex flex-wrap gap-3">
          <BadgeIcon icon="🧠" name="Brain Master" earned lockedLabel={t('badges.locked')} />
          <BadgeIcon icon="🖱️" name="Mouse Master" earned lockedLabel={t('badges.locked')} />
          <BadgeIcon
            icon="🛡️"
            name="Cyber Guardian"
            earned={false}
            lockedLabel={t('badges.locked')}
          />
          <BadgeIcon
            icon="🚀"
            name="IT Starter"
            earned={false}
            size="lg"
            lockedLabel={t('badges.locked')}
          />
        </div>
      </Section>

      <Section title="Feedback (positive by design)">
        <Feedback tone="success" title={correct[0]}>
          {t('lesson.complete.xpEarned', { xp: 10 })}
        </Feedback>
        <Feedback tone="encourage" title={tryAgain[0]}>
          {t('lesson.hint')}: {t('lesson.matchingHelp')}
        </Feedback>
        <Feedback tone="info">{t('lesson.orderingHelp')}</Feedback>
        <Feedback tone="warning">{t('errors.NETWORK_ERROR')}</Feedback>
      </Section>

      <Section title="Form fields">
        <Card className="flex max-w-md flex-col gap-4">
          <TextField label={t('auth.login.username')} placeholder="student.demo" />
          <TextField label={t('lesson.numberLabel')} hint={t('lesson.hint')} inputMode="decimal" />
          <TextField
            label={t('auth.changePassword.new')}
            error={t('auth.changePassword.problems.TOO_SHORT', { min: 8 })}
          />
        </Card>
      </Section>
    </AppShell>
  );
}
