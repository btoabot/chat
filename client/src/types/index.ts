declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.riv' {
  const value: string;
  export default value;
}
