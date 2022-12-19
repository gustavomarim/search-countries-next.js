export interface Country {
  map(arg0: ({ name, population, region, capital, flags }: Country) => JSX.Element): import("react").ReactNode;
  name: string;
  nativeName: string;
  population: number;
  region: string;
  subRegion: string;
  capital: string;
  topLevelDomain: [string];
  currencies: [Currencies];
  languages: [Languages];
  borders?: [string];
  flags: Flags;
}

type Currencies = {
  code: string;
  name: string;
  symbol: string;
};

type Languages = {
  name: string;
};

type Flags = {
  svg: string;
  png: string;
};
