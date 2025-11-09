export interface IMessages {
  [key: string]: string;
}

export interface ILanguageCatalogs {
  [lang: string]: IMessages;
}

export enum AppLanguages {
  EN = 'en',
  UA = 'ua',
}

export interface IIntlProps {
  children: React.ReactNode;
}
