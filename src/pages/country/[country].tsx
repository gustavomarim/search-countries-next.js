import { BackPageButton } from 'components/template/BackPageButton';
import { Header } from 'components/template/Header';
import { Country } from 'model/Country';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { MouseEvent, useEffect } from 'react';
import useAppData from '../../data/hook/useAppData';
import useCountryData from '../../data/hook/useCountryData';

interface ContentProps {
  children?: unknown;
}

const CountryDetail = (props: ContentProps) => {
  const { theme } = useAppData();
  const { country, handleCountry, fetchCountryByCode } = useCountryData();
  const router = useRouter();
  const countryName = router.query.country;

  //
  function capitalizeFirstLetter(str: unknown): string {
    if (typeof str !== 'string') return '';
    return str.charAt(0).toUpperCase() + str.substring(1);
  }

  // Next.js special function to load external image urls
  const myLoader = ({ src, width }: { src: string; width: number }): string => {
    return `${src}?=${width}`;
  };

  async function handleCountryByCode(event: MouseEvent<HTMLElement>) {
    const element = event.target;
    if (element instanceof HTMLElement) {
      const country = element.id.toLowerCase();
      const { name } = await fetchCountryByCode(country.toLowerCase());
      router.push(`/country/${name.toLowerCase()}`);
    }
  }

  useEffect(() => {
    handleCountry(countryName);
    const capitalizedCountryName = capitalizeFirstLetter(countryName);
    document.title = `${capitalizedCountryName} | Search Country`;
  }, [countryName, handleCountry]);

  return (
    <div
      className={`
        ${theme} 
        ${theme === 'dark' ? 'bg-very-dark-blue' : 'bg-very-light-gray'}
        h-screen
      `}
    >
      <Header title="Where in the world?" />

      <section
        className={`
         px-10 md:px-20 
        bg-very-light-gray dark:bg-very-dark-blue
        `}
      >
        <BackPageButton />

        {country
          ? country.map(
              ({
                name,
                nativeName,
                population,
                region,
                subRegion,
                capital,
                topLevelDomain,
                currencies,
                languages,
                borders,
                flags,
              }: Country) => (
                <div
                  key={name}
                  className={`
                    flex flex-wrap justify-start
                    md:grid grid-rows-2 grid-cols-1 gap-4 
                    lg:grid-cols-2 lg:gap-20 mt-16
                  `}
                >
                  <Image
                    loader={myLoader}
                    src={`${flags.svg}`}
                    alt={`${name} country flag`}
                    width={700}
                    height={400}
                    className={`
                      rounded-sm
                      shadow-md shadow-dark-gray 
                      dark:shadow-md dark:shadow-very-dark
                    `}
                  />

                  <div
                    className={`
                      sm:grid grid-cols-2 grid-rows-2 gap-3
                    `}
                  >
                    <h1
                      className={`
                        col-span-full self-center
                        text-3xl text-very-dark dark:text-white
                        font-extrabold
                      `}
                    >
                      {name}
                    </h1>

                    <div className="flex flex-col text-base gap-1">
                      <p
                        className={`
                          font-semibold
                          text-very-dark dark:text-white
                        `}
                      >
                        Native Name:{' '}
                        <span className={`font-light text-dark-gray`}>
                          {nativeName}
                        </span>
                      </p>
                      <p
                        className={`
                          font-semibold
                          text-very-dark dark:text-white
                        `}
                      >
                        Population:{' '}
                        <span className={`font-light text-dark-gray`}>
                          {population.toLocaleString('pt-BR')}
                        </span>
                      </p>
                      <p
                        className={`
                          font-semibold
                          text-very-dark dark:text-white
                        `}
                      >
                        Region:{' '}
                        <span className={`font-light text-dark-gray`}>
                          {region}
                        </span>
                      </p>
                      <p
                        className={`
                          font-semibold
                          text-very-dark dark:text-white
                        `}
                      >
                        {subRegion ? 'Sub Region: ' : ''}{' '}
                        <span className={`font-light text-dark-gray`}>
                          {subRegion}
                        </span>
                      </p>
                      <p
                        className={`
                          font-semibold
                          text-very-dark dark:text-white
                        `}
                      >
                        Capital:{' '}
                        <span className={`font-light text-dark-gray`}>
                          {capital}
                        </span>
                      </p>
                    </div>

                    <div className="flex flex-col gap-1">
                      <p
                        className={`
                          font-semibold
                          text-very-dark dark:text-white
                        `}
                      >
                        Top Level Domain:{' '}
                        <span className={`font-light text-dark-gray`}>
                          {topLevelDomain}
                        </span>
                      </p>
                      <p
                        className={`
                          font-semibold
                          text-very-dark dark:text-white
                        `}
                      >
                        Currencies:{' '}
                        <span className={`font-light text-dark-gray`}>
                          {currencies.map(({ name }) => name)}
                        </span>
                      </p>
                      <p
                        className={`
                          font-semibold
                          text-very-dark dark:text-white
                        `}
                      >
                        Languages:{' '}
                        <span className={`font-light text-dark-gray`}>
                          {languages.map(({ name }) => `${name}`).join(', ')}
                        </span>
                      </p>
                    </div>

                    <ul
                      className={`
                        flex flex-row flex-wrap gap-2 items-center
                        col-span-full mb-14 
                      `}
                    >
                      <p
                        className={`
                          font-semibold
                          text-very-dark dark:text-white
                        `}
                      >
                        {borders ? 'Border Countries:' : ''}{' '}
                      </p>
                      {borders?.map((country) => (
                        <li
                          id={country}
                          key={country}
                          className={`
                            text-center text-very-dark dark:text-dark-gray
                            bg-white dark:bg-dark-blue
                            py-1 px-3 rounded
                            shadow-sm shadow-dark-gray 
                            dark:shadow-sm dark:shadow-very-dark
                            cursor-pointer
                            transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-x-110 duration-300
                          `}
                          onClick={handleCountryByCode}
                        >
                          {country}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )
            )
          : null}
        {props.children}
      </section>
    </div>
  );
};

export default CountryDetail;
