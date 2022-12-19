import Image from 'next/image';
import Link from 'next/link';
import useCountryData from '../../data/hook/useCountryData';
import { Country } from '../../model/Country';

interface ContentProps {
  children?: JSX.Element | JSX.Element[];
}

const Content = (props: ContentProps) => {
  const { countries } = useCountryData();

  // Next.js special function to load external image urls
  const myLoader = ({ src }: { src: string }) => {
    return `${src}`;
  };

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
          ? countries.map(
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
