import { ArrowLeftIcon } from '../icons/Index';

export const BackPageButton = () => {
  function goBack() {
    window.history.back();
  }

  return (
    <button
      aria-label="back-page"
      className={`
        flex gap-3 px-12 py-3 rounded-md mt-16
        text-base text-very-dark dark:text-white
        bg-white dark:bg-dark-blue
        shadow-sm shadow-dark-gray 
        dark:shadow-sm dark:shadow-very-dark
        transition ease-in-out delay-150 
        hover:scale-x-105 hover:scale-y-105 duration-150
      `}
      onClick={goBack}
    >
      {ArrowLeftIcon}
      Back
    </button>
  );
};
