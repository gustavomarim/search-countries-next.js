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
        bg-white dark:bg-dark-blue
        px-5 md:px-20 py-6 
        shadow-very-light-gray shadow-lg
        dark:shadow-very-dark-blue dark:shadow-lg
      `}
    >
      <Title title={props.title}></Title>
      <ToggleThemeButton theme={theme} toggleTheme={toggleTheme} />
    </header>
  );
};
