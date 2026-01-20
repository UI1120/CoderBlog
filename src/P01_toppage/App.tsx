import { Header } from '@/P00_common/components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { ProjectHighlights } from './components/ProjectHighlights';
import { LatestArticles } from './components/LatestArticles';
import { Notices } from './components/Notices';
import { Footer } from '@/P00_common/components/Footer';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <About />
        <ProjectHighlights />
        <LatestArticles />
        <Notices />
      </main>
      <Footer />
    </div>
  );
}
