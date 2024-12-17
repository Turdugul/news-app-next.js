import Header from './_components/Header';
import Footer from './_components/Footer';
import NewsDashboard from './_components/NewsDashboard';

export default function Home() {
  return (
    <main className='bg-gray-50 dark:bg-gray-200'>
      <Header />
      <NewsDashboard />
      <Footer />
    </main>
  );
}
