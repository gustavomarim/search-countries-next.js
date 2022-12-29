import { ChangeEventHandler } from 'react';
import { SearchIcon } from '../icons/Index';

export const InputText = ({
  value,
  onChange,
}: {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}) => {
  return (
    <label className="relative inline-flex w-full sm:w-2/6">
      <span
        className={`
          flex items-center  
          absolute inset-y-0 left-0 pl-2
        `}
      >
        {SearchIcon}
      </span>

      <input
        className={`
          placeholder:text-slate-400 dark:placeholder:text-white
          dark:text-white block 
          bg-white dark:bg-dark-blue
          shadow-md shadow-dark-gray 
          dark:shadow-sm dark:shadow-very-dark
          py-5 pl-9 pr-3 focus:outline-none
          w-full
          rounded-lg 
        `}
        placeholder="Search for a country..."
        type="text"
        name="search"
        value={value}
        onChange={onChange}
      />
    </label>
  );
};
