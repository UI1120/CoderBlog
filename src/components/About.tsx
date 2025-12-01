export function About() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-gray-900 mb-6 text-[24px]">
            OPUCoderとは？
          </h2>
          <p className="text-gray-700 mb-8 leading-relaxed">
            岡山県立大学の技術系サークル。ゲーム制作・AI・Unity・Web・ロボットなど、<br />
            多分野の技術プロジェクトに挑戦しています。詳しくはサークル紹介へ。
          </p>
          <button className="bg-[#67e0b8] text-gray-900 px-6 py-3 rounded-lg hover:bg-[#55c9a3] transition-colors">
            もっと詳しく
          </button>
        </div>
      </div>
    </section>
  );
}