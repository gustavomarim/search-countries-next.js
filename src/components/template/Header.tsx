import useAppData from '../../data/hook/useAppData';
import { Title } from './Title';
import { ToggleThemeButton } from './ToggleThemeButton';

interface HeaderProps {
  title: string;
}

export const Header = (props: HeaderProps) => {
  const { theme, toggleTheme } = useAppData();

  return (
    <header
      className={`
        flex justify-between 
        px-10 md:px-20 py-6 
        bg-white dark:bg-dark-blue
        shadow-sm shadow-dark-gray 
        dark:shadow-sm dark:shadow-very-dark
      `}
    >
      <Title title={props.title}></Title>
      <ToggleThemeButton theme={theme} toggleTheme={toggleTheme} />
    </header>
  );
};
