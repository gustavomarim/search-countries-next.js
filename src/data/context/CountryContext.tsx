import React, { createContext, useEffect, useState } from 'react';
import { Country } from '../../model/Country';

const CountryContext = createContext<any>({});

interface CountryProviderProps {
  children: React.ReactNode;
}

export const CountryProvider = ({ children }: CountryProviderProps) => {
  const BASE_URL = 'https://restcountries.com/v2';

  const [countries, setCountries] = useState<Country>();
  const [country, setCountry] = useState<Country>();

  async function handleCountries(): Promise<void> {
    const response = await fetch(`${BASE_URL}/all`);
    const data = await response.json();
    setCountries(data);
  }

  async function handleCountry(country: string): Promise<void> {
    const response = await fetch(`${BASE_URL}/name/${country}`);
    const data = await response.json();
    setCountry(data);
  }

  async function fetchCountryByCode(code: string): Promise<Country> {
    const response = await fetch(`${BASE_URL}/alpha/${code}`);
    const data = await response.json();
    return data;
  }

  useEffect(() => {
    handleCountries();
  }, []);

  return (
    <CountryContext.Provider
      value={{
        countries,
        setCountries,
        country,
        setCountry,
        handleCountries,
        handleCountry,
        fetchCountryByCode,
      }}
    >
      {children}
    </CountryContext.Provider>
  );
};

export default CountryContext;
