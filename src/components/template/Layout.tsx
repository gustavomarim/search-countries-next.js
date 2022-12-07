import useAppData from '../../data/hook/useAppData';
import Content from './Content';
import { Header } from './Header';

interface LayoutProps {
  title: string;
  children?: any;
}

export const Layout = (props: LayoutProps) => {
  const { theme } = useAppData();

  return (
    <main className={`${theme} h-full w-full`}>
      <Header title={props.title} />
      <Content>{props.children}</Content>
    </main>
  );
};
