import { ChevronDown } from 'components/icons/Index';
import { useState } from 'react';

type Region = {
  name: string;
  value: string;
};

const regions: Region[] = [
  { name: 'Africa', value: 'africa' },
  { name: 'America', value: 'americas' },
  { name: 'Asia', value: 'asia' },
  { name: 'Europe', value: 'europe' },
  { name: 'Oceania', value: 'oceania' },
];

export const DropdownFilter = ({
  label,
  onClick,
}: {
  label: string;
  onClick: any;
}) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  function toggleDropdown(): void {
    setIsActive((isActive) => !isActive);
  }

  return (
    <div
      className={`
        flex justify-center items-center w-50
        bg-white dark:bg-dark-blue
        shadow-md shadow-dark-gray 
        dark:shadow-sm dark:shadow-very-dark
        hover:bg-very-light-gray
        rounded-md cursor-pointer
        h-16 
      `}
      onClick={toggleDropdown}
    >
      <p
        className={`
          px-5 py-2 
          text-base text-very-dark dark:text-white
          rounded-l-md
        `}
      >
        {label}
      </p>

      <div className="relative">
        <i
          className={`
            inline-flex items-center justify-center 
            h-full px-2 
            text-base text-very-dark dark:text-white
            rounded-r-md   
          `}
        >
          {ChevronDown(6)}
        </i>

        <div
          className={`
            absolute right-0 z-10 
            w-48 mt-6 origin-top-right 
            bg-white dark:bg-dark-blue
            shadow-md shadow-dark-gray 
            dark:shadow-md dark:shadow-very-dark
            rounded-md
            ${isActive ? 'block' : 'hidden'}
          `}
        >
          <div className="p-2">
            {regions.map(({ name, value }) => (
              <li
                id={value}
                key={name}
                onClick={onClick}
                className={`
                  block px-4 py-2 
                  text-base text-very-dark dark:text-white
                  hover:bg-very-light-gray dark:hover:bg-very-dark-blue
                  rounded-lg cursor-pointer
                `}
              >
                {name}
              </li>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
