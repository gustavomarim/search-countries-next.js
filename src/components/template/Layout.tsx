import useAppData from '../../data/hook/useAppData';
import { Content } from './Content';
import { Header } from './Header';

interface LayoutProps {
  title: string;
  children?: JSX.Element | JSX.Element[];
}

export const Layout = (props: LayoutProps) => {
  const { theme } = useAppData();

  return (
    <main className={`${theme}`}>
      <Header title={props.title} />
      <Content>{props.children}</Content>
    </main>
  );
};
