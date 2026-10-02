import { useTranslations } from 'next-intl';
import type { ServiceState, SystemStatus } from '@/lib/system-status';

const SERVICES: (keyof SystemStatus)[] = ['web', 'api', 'database', 'redis'];

const STATE_STYLES: Record<ServiceState, { icon: string; className: string }> = {
  up: { icon: '✅', className: 'bg-emerald-50 text-emerald-800' },
  down: { icon: '⚠️', className: 'bg-amber-50 text-amber-900' },
  unknown: { icon: '❔', className: 'bg-slate-100 text-slate-700' },
};

export function StatusList({ status }: { status: SystemStatus }) {
  const t = useTranslations('status');
  return (
    <ul className="flex flex-col gap-3" aria-label={t('list')}>
      {SERVICES.map((service) => {
        const state = status[service];
        const style = STATE_STYLES[state];
        return (
          <li
            key={service}
            className={`flex min-h-14 items-center justify-between gap-3 rounded-control px-4 py-3 ${style.className}`}
          >
            <span className="font-semibold">{t(`services.${service}`)}</span>
            <span>
              <span aria-hidden="true">{style.icon}</span> {t(`states.${state}`)}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
