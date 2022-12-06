import { createContext, useEffect, useState } from 'react';

interface AppContextProps {
  theme: string;
  toggleTheme?: () => void;
}

const AppContext = createContext<AppContextProps>({ theme: 'dark' });

export const AppProvider = (props: any) => {
  const [theme, setTheme] = useState('dark');

  function toggleTheme(): void {
    const newTheme = theme === '' ? 'dark' : '';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  }

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') ?? '';
    setTheme(savedTheme);
  }, []);

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContext;
