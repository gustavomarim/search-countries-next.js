import { useState } from 'react';
import { SearchIcon } from '../icons/Index';

export const Input = () => {
  const [input, setInput] = useState('');

  function handleInput(e: any) {
    console.log(e.target.value);
  }

  return (
    <label className="relative block">
      <span className="absolute inset-y-0 left-0 flex items-center pl-2">
        {SearchIcon}
      </span>
      <input
        className={`
          placeholder:text-slate-400 block bg-white 
          rounded-lg 
          py-5 pl-9 pr-3 focus:outline-none
        `}
        placeholder="Search for a country..."
        type="text"
        name="search"
        onChange={handleInput}
      />
    </label>
  );
};
