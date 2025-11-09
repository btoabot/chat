import { ReactNode } from 'react';
import { IntlProvider as P, ReactIntlErrorCode } from 'react-intl';
import { AppLanguages, IIntlProps } from 'types/intl';
import { catalogs } from 'locale';

const IntlProvider = (props: IIntlProps): ReactNode => {
  const { children } = props;

  const onError = (e: any): void => {
    if (e.code === ReactIntlErrorCode.MISSING_DATA) return;
    console.error(e);
  };

  return (
    <P
      messages={catalogs[AppLanguages.UA]}
      locale={AppLanguages.UA}
      defaultLocale={AppLanguages.UA}
      onError={onError}
    >
      {children}
    </P>
  );
};

export default IntlProvider;
