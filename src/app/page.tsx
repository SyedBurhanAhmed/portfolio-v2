import Navigation from '@/components/navigation';
import Hero from '@/components/hero';
import About from '@/components/about';
import Skills from '@/components/skills';
import Experience from '@/components/experience';
import Projects from '@/components/projects';
import Publications from '@/components/publications';
import Awards from '@/components/awards';
import Contact from '@/components/contact';
import Footer from '@/components/footer';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Publications />
      <Awards />
      <Contact />
      <Footer />
    </div>
  );
};

export default HomePage;
