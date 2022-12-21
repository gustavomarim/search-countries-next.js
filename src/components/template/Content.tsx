import { InputText } from 'components/forms/InputText';
import Image from 'next/image';
import Link from 'next/link';
import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import useCountryData from '../../data/hook/useCountryData';
import { Country } from '../../model/Country';
import { DropdownFilter } from './DropdownFilter';

interface ContentProps {
  children?: JSX.Element | JSX.Element[];
}

const Content = (props: ContentProps) => {
  const { countries } = useCountryData();
  const [handleCountries, setHandleCountries] = useState<Country>();
  const [searchedCountry, setSearchedCountry] = useState<string>('');

  function filterCountries({ target }: ChangeEvent<HTMLInputElement>): void {
    const searchLowerCase = target.value.toLowerCase();
    const filteredCountries = countries.filter(({ name }: Country) =>
      name.toLocaleLowerCase().includes(searchLowerCase)
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

  return (
    <section
      className={`
        flex flex-col
        px-20 py-6
        bg-very-light-gray dark:bg-very-dark-blue
      `}
    >
      <article className="flex justify-between my-6">
        <InputText value={searchedCountry} onChange={filterCountries} />

        <DropdownFilter
          label="Filter by Region"
          onClick={filterCountriesByRegion}
        />
      </article>

      <ul
        className={`
          flex flex-wrap justify-between
          gap-8 xl:gap-20
          mt-10 
        `}
      >
        {handleCountries
          ? handleCountries.map(
              ({ name, population, region, capital, flags }: Country) => (
                <li
                  key={name}
                  className={`
                  w-72 lg:w-80
                  rounded-md 
                  bg-white dark:bg-dark-blue
                  shadow-md shadow-dark-gray 
                  dark:shadow-md dark:shadow-very-dark
                `}
                >
                  <Link href={`/country/${name.toLocaleLowerCase()}`}>
                    <div
                      className={`
                      h-40 lg:h-52 
                      w-72 lg:w-80 
                      relative
                    `}
                    >
                      <Image
                        loader={myLoader}
                        src={`${flags.svg}`}
                        alt={`${name} country flag`}
                        fill
                        sizes="auto"
                        className="rounded-t-md object-cover"
                        priority={true}
                      />
                    </div>

                    <div
                      className={`
                      flex flex-col p-4 lg:p-6 gap-2 
                      text-sm text-very-dark-blue dark:text-white
                    `}
                    >
                      <h2
                        className={`
                        font-semibold text-lg 
                        mb-3
                    `}
                      >
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

      {props.children}
    </section>
  );
};

export default Content;
