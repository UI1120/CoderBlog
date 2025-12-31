import { HERO_CONFIG } from '@/config/siteConfig';

export function Hero() {
  const handlePrimaryClick = () => {
    window.location.assign(HERO_CONFIG.primaryButtonPref);
  };

  const handleSecondaryClick = () => {
    window.location.assign(HERO_CONFIG.secondaryButtonPref);
  };

  return (
    <section
      id="home"
      className="relative bg-cover bg-center"
      style={{
        backgroundImage: `url('${HERO_CONFIG.backgroundImageUrl}')`,
      }}
    >
      <div className="container mx-auto px-6 py-24 md:py-32">
        <div className="max-w-3xl mx-auto text-center backdrop-blur-md bg-[#2d7a5f]/70 rounded-2xl p-8 border-2 border-[#67e0b8] shadow-lg">
          <h1 className="text-white mb-0 text-[24px] drop-shadow-lg">
            {HERO_CONFIG.title}
          </h1>
          <p className="text-gray-200 mb-8 max-w-2xl mx-auto drop-shadow-md">
            {HERO_CONFIG.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              type="button"
              onClick={handlePrimaryClick}
              className="bg-[#67e0b8] text-gray-900 px-6 py-3 rounded-lg hover:bg-[#55c9a3] transition-colors"
            >
              {HERO_CONFIG.primaryButtonText}
            </button>
            <button
              type="button"
              onClick={handleSecondaryClick}
              className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-lg border border-white/30 hover:bg-white/30 transition-colors"
            >
              {HERO_CONFIG.secondaryButtonText}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
