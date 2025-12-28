import { Header } from '@/000_common/components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { ProjectHighlights } from './components/ProjectHighlights';
import { LatestArticles } from './components/LatestArticles';
import { Notices } from './components/Notices';
import { Footer } from '@/000_common/components/Footer';

export default function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
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
