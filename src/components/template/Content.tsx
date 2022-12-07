import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface ContentProps {
  children?: any;
}

interface Country {
  name: Name;
  capital: string;
  population: number;
  region: string;
  flags: Flags;
}

type Name = {
  common: string;
  official: string;
};

type Flags = {
  png: string;
  svg: string;
};

const Content = (props: ContentProps) => {
  const [countries, setCountries] = useState<Country[]>();

  async function handleData(region = 'all') {
    const BASE_URL = 'https://restcountries.com/v3.1';

    const response = await fetch(`${BASE_URL}/${region}`);
    const data = await response.json();
    setCountries(data);
  }

  // Next.js special function to load external image urls
  const myLoader = ({ src }: { src: string }) => {
    return `${src}`;
  };

  useEffect(() => {
    handleData();
  }, []);

  return (
    <section
      className={`
        flex flex-col
        px-20 py-6
        bg-very-light-gray dark:bg-very-dark-blue
      `}
    >
      <ul
        className={`
          flex flex-wrap justify-between
          gap-8 xl:gap-20
          mt-10 
        `}
      >
        {countries
          ? countries.map((country: Country) => (
              <li
                key={country.name.common}
                className={`
                  w-72 lg:w-80
                  rounded-md 
                  bg-white dark:bg-dark-blue
                  shadow-md shadow-dark-gray 
                  dark:shadow-md dark:shadow-very-dark
                `}
              >
                <Link href={`/country/${country.name.common.toLowerCase()}`}>
                  <div
                    className={`
                      h-40 lg:h-52 
                      w-72 lg:w-80 
                      relative
                    `}
                  >
                    <Image
                      loader={myLoader}
                      src={country.flags.png}
                      alt={`${country.name.common} country flag`}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-t-md"
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
                      {country.name.common}
                    </h2>
                    <p className="font-semibold">
                      Population:{' '}
                      <span className="font-light text-dark-gray">
                        {country.population.toLocaleString('pt-BR')}
                      </span>
                    </p>
                    <p className="font-semibold">
                      Region:{' '}
                      <span className="font-light text-dark-gray">
                        {country.region}
                      </span>
                    </p>
                    <p className="font-semibold pb-6">
                      Capital:{' '}
                      <span className="font-light text-dark-gray">
                        {country.capital}
                      </span>
                    </p>
                  </div>
                </Link>
              </li>
            ))
          : null}
      </ul>

      {props.children}
    </section>
  );
};

export default Content;
