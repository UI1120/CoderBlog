import { ABOUT_CONFIG } from '@/R01_config/siteConfig';

export function About() {
  return (
    <section id="about" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-gray-900 mb-8 text-center text-[24px]">
          {ABOUT_CONFIG.title}
        </h2>
        <div className="max-w-3xl mx-auto text-gray-700 space-y-4">
          {ABOUT_CONFIG.paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
