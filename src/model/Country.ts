export interface Country {
  name: string;
  nativeName: string;
  population: number;
  region: string;
  subRegion: string;
  capital: string;
  topLevelDomain: string[];
  currencies: Currency[];
  languages: Language[];
  borders?: string[];
  flags: Flags;
}

type Currency = {
  code: string;
  name: string;
  symbol: string;
};

type Language = {
  name: string;
};

type Flags = {
  svg: string;
  png: string;
};
