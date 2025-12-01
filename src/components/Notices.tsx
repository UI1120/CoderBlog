import { Bell } from 'lucide-react';

const notices = [
  "学祭展示は2025年11月に開催されます — 詳しくはこちら",
  "次回のUnity勉強会は1/28に開催します"
];

export function Notices() {
  return (
    <section className="bg-[#e8f9f4] py-16 md:py-24">
      <div className="container mx-auto px-6">
        <h2 className="text-gray-900 mb-8 text-center text-[24px]">
          お知らせ
        </h2>
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            {notices.map((notice, index) => (
              <div 
                key={index} 
                className={`flex items-start gap-3 ${index > 0 ? 'mt-4 pt-4 border-t border-gray-200' : ''}`}
              >
                <Bell className="w-5 h-5 text-[#67e0b8] flex-shrink-0 mt-1" />
                <p className="text-gray-700">
                  {notice}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}