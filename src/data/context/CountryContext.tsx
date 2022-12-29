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
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCountries(): Promise<void> {
    try {
      setError(null);
      setLoading(true);
      const response = await fetch(`${BASE_URL}/all`);
      if (!response.ok) throw new Error(`Error: ${response.statusText}`);
      const data = await response.json();
      setCountries(data);
    } catch (error) {
      if (error instanceof Error) setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleCountry(country: string): Promise<void> {
    try {
      setError(null);
      setLoading(true);
      const response = await fetch(`${BASE_URL}/name/${country}`);
      if (!response.ok) throw new Error(`Error: ${response.statusText}`);
      const data = await response.json();
      setCountry(data);
    } catch (error) {
      if (error instanceof Error) setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function fetchCountryByCode(code: string): Promise<Country> {
    let data;
    try {
      setError(null);
      setLoading(true);
      const response = await fetch(`${BASE_URL}/alpha/${code}`);
      if (!response.ok) throw new Error(`Error: ${response.statusText}`);
      data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) setError(error.message);
    } finally {
      setLoading(false);
    }
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
        loading,
        error,
      }}
    >
      {children}
    </CountryContext.Provider>
  );
};

export default CountryContext;
