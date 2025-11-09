import { useIntl } from 'react-intl';

export const useLatestDate = (timestamps: number[]): string | null => {
  const intl = useIntl();
  if (!Array.isArray(timestamps) || timestamps.length === 0) return null;

  const latest = Math.max(...timestamps);
  if (!isFinite(latest)) return null;

  const now = Date.now();
  const diffMs = now - latest;
  const diffMin = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMin / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMin < 1) return intl.formatMessage({ id: 'justNow' });
  if (diffMin < 60) return intl.formatMessage({ id: 'minutesAgo' }, { value: diffMin });
  if (diffHours < 24) return intl.formatMessage({ id: 'hoursAgo' }, { value: diffHours });
  if (diffDays === 1) return intl.formatMessage({ id: 'yesterday' });
  return intl.formatMessage({ id: 'daysAgo' }, { value: diffDays });
};
