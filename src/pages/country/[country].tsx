import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { BackPageButton } from '../../components/template/BackPageButton';
import { Header } from '../../components/template/Header';
import useAppData from '../../data/hook/useAppData';
import useCountryData from '../../data/hook/useCountryData';
import { Country } from '../../model/Country';

interface ContentProps {
  children?: unknown;
}

const CountryDetail = (props: ContentProps) => {
  const { theme } = useAppData();
  const { country, handleCountry } = useCountryData();
  const router = useRouter();
  const countryName = router.query.country;

  const myLoader = ({ src }: { src: string }) => {
    return `${src}`;
  };

  useEffect(() => {
    handleCountry(countryName);
  }, [countryName, handleCountry]);

  return (
    <div
      className={`
        ${theme} 
        w-screen h-screen
        ${theme === 'dark' ? 'bg-very-dark-blue' : 'bg-very-light-gray'}
      `}
    >
      <Header title="Where in the world?" />

      <section className={`px-5 md:px-20`}>
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
                <div key={name} className={`grid grid-cols-2 gap-20 mt-16`}>
                  <Image
                    loader={myLoader}
                    src={`${flags.svg}`}
                    alt={`${name} country flag`}
                    width={700}
                    height={400}
                    className=""
                  />

                  <div className={`grid grid-cols-2 grid-rows-2`}>
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
                        <span
                          className={`
                            font-light text-dark-gray
                          `}
                        >
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
                          key={country}
                          className={`
                            text-center text-very-dark dark:text-dark-gray
                            bg-white dark:bg-dark-blue
                            py-1 px-3 rounded
                            shadow-sm shadow-dark-gray 
                            dark:shadow-sm dark:shadow-very-dark
                          `}
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
