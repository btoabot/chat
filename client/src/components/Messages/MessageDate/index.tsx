import { FormattedDate, FormattedTime } from 'react-intl';

interface MessageDateProps {
  ts: number;
}

const isToday = (date: Date) => {
  const now = new Date();
  return (
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()
  );
};

const MessageDate = ({ ts }: MessageDateProps) => {
  const date = new Date(ts);
  const today = isToday(date);

  return today ? (
    <>
      <FormattedDate value={date} weekday="long" />{' '}
      <FormattedTime value={date} hour="2-digit" minute="2-digit" hour12={false} />
    </>
  ) : (
    <>
      <FormattedDate value={date} day="2-digit" month="short" />{' '}
      <FormattedTime value={date} hour="2-digit" minute="2-digit" hour12={false} />
    </>
  );
};

export default MessageDate;
