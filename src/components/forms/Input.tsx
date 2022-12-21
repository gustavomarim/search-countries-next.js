import { SearchIcon } from '../icons/Index';

export const Input = ({
  value,
  onChange,
}: {
  value: string;
  onChange: any;
}) => {
  return (
    <label className="relative inline-flex">
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
          placeholder:text-slate-400 block bg-white 
          rounded-lg 
          py-5 pl-9 pr-3 focus:outline-none
          lg:w-1/3
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
