import { MoonIcon, SunIcon } from '../icons/Index';

interface ToggleThemeButtonProps {
  theme?: string;
  toggleTheme?: () => void;
}

export const ToggleThemeButton = (props: ToggleThemeButtonProps) => {
  return props.theme === 'dark' ? (
    <button
      onClick={props.toggleTheme}
      className={`flex items-center cursor-pointer`}
    >
      <div className={`items-center justify-center`}>{SunIcon}</div>
      <div className={`hidden sm:block items-center ml-2 text-white`}>
        <span className={`font-light text-base text-white text-center`}>
          Light Mode
        </span>
      </div>
    </button>
  ) : (
    <button
      onClick={props.toggleTheme}
      className={`flex items-center justify-center cursor-pointer`}
    >
      <div className={`items-center justify-center`}>{MoonIcon}</div>
      <div className={`hidden sm:block items-center ml-2 text-white`}>
        <span
          className={`font-light text-center text-base text-very-dark-blue`}
        >
          Dark Mode
        </span>
      </div>
    </button>
  );
};
