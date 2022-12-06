import { Header } from '../components/template/Header';
import useAppData from '../data/hook/useAppData';

export default function Home() {
  const { theme } = useAppData();

  return (
    <section className={`${theme}`}>
      <Header title="Where in the world?" />
    </section>
  );
}
