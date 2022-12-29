import { InputText } from 'components/forms/InputText';
import { Error } from 'components/helper/Error';
import { Loading } from 'components/helper/Loading';
import Image from 'next/image';
import Link from 'next/link';
import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import useCountryData from '../../data/hook/useCountryData';
import { Country } from '../../model/Country';
import { DropdownFilter } from './DropdownFilter';

interface ContentProps {
  children?: JSX.Element | JSX.Element[];
}

export const Content = (props: ContentProps) => {
  const { countries, error, loading } = useCountryData();
  const [handleCountries, setHandleCountries] = useState<Country[]>();
  const [searchedCountry, setSearchedCountry] = useState<string>();

  function filterCountries({ target }: ChangeEvent<HTMLInputElement>): void {
    const searchLowerCase = target.value.toLowerCase();
    const filteredCountries = countries.filter(({ name }: Country) =>
      name.toLowerCase().includes(searchLowerCase)
    );

    setSearchedCountry(searchLowerCase);
    setHandleCountries(filteredCountries);
  }

  function filterCountriesByRegion(event: MouseEvent<HTMLElement>): void {
    const element = event.target;
    if (element instanceof HTMLElement) {
      const searchedRegionLowerCase = element.id.toLowerCase();

      const countriesFilteredByRegion = countries.filter(
        ({ region }: Country) =>
          region.toLowerCase().includes(searchedRegionLowerCase)
      );

      setHandleCountries(countriesFilteredByRegion);
    }
  }

  // Next.js special function to load external image urls
  const myLoader = ({ src, width }: { src: string; width: number }): string => {
    return `${src}?=${width}`;
  };

  useEffect(() => {
    setHandleCountries(countries);
  }, [countries]);

  if (error) return <Error error={error} />;
  if (loading) return <Loading />;
  if (countries)
    return (
      <section
        className={`
        flex flex-col
        px-10 lg:px-20 py-6
       bg-very-light-gray dark:bg-very-dark-blue
      `}
      >
        <article
          className={`
          flex flex-wrap gap-10 md:flex-nowrap justify-between 
          md:my-6
        `}
        >
          <InputText value={searchedCountry} onChange={filterCountries} />

          <DropdownFilter
            label="Filter by Region"
            onClick={filterCountriesByRegion}
          />
        </article>

        <section className="min-h-screen">
          <ul
            className={`
            flex flex-wrap items-start justify-start
            gap-8
            mt-10
          `}
          >
            {handleCountries
              ? handleCountries.map(
                  ({ name, population, region, capital, flags }: Country) => (
                    <li
                      key={name}
                      className={`
                      w-full sm:w-72 lg:w-80
                      rounded-md 
                      bg-white dark:bg-dark-blue
                      shadow-md shadow-dark-gray 
                      dark:shadow-md dark:shadow-very-dark
                      transition ease-in-out delay-150 
                      hover:-translate-y-1 hover:scale-x-110 duration-200
                    `}
                    >
                      <Link href={`/country/${name.toLowerCase()}`}>
                        <div
                          className={`
                          h-40 lg:h-52 
                          sm:w-72 lg:w-80
                          relative
                        `}
                        >
                          <Image
                            loader={myLoader}
                            src={`${flags.svg}`}
                            alt={`${name} country flag`}
                            fill
                            sizes="auto"
                            priority={true}
                            className={`
                            rounded-t-md object-cover border-b-2  border-b-very-light-gray dark:border-none
                          `}
                          />
                        </div>

                        <div
                          className={`
                          flex flex-col p-4 lg:p-6 gap-2 
                          text-sm text-very-dark-blue dark:text-white
                        `}
                        >
                          <h2 className={`font-semibold text-lg mb-3`}>
                            {name}
                          </h2>
                          <p className="font-semibold">
                            Population:{' '}
                            <span className="font-light text-dark-gray">
                              {population.toLocaleString('pt-BR')}
                            </span>
                          </p>
                          <p className="font-semibold">
                            Region:{' '}
                            <span className="font-light text-dark-gray">
                              {region}
                            </span>
                          </p>
                          <p className="font-semibold pb-6">
                            Capital:{' '}
                            <span className="font-light text-dark-gray">
                              {capital}
                            </span>
                          </p>
                        </div>
                      </Link>
                    </li>
                  )
                )
              : null}
          </ul>
        </section>

        {props.children}
      </section>
    );
};
function useState<T>(): [any, any] {
  throw new Error('Function not implemented.');
}

function useEffect(arg0: () => void, arg1: any[]) {
  throw new Error('Function not implemented.');
}
