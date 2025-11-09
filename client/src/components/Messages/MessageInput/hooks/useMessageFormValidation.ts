import { useIntl } from 'react-intl';

export const useMessageFormValidation = () => {
  const intl = useIntl();
  const validate = (value: string): string => {
    if (!value.trim()) return intl.formatMessage({ id: 'message.required' });
    if (value.length > 255) return intl.formatMessage({ id: 'message.max.chars' });
    return '';
  };

  return { validate };
};
