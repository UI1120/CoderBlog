import { Bell } from 'lucide-react';
import { useState, useEffect } from 'react';
import { API_BASE_URL } from '@/constants';

export function Notices() {
  const [notices, setNotices] = useState<string[]>([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/notices`)
      .then(res => res.json())
      .then(data => setNotices(data))
      .catch(err => console.error('Failed to fetch notices:', err));
  }, []);

  if (notices.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-gray-900 mb-8 text-center text-[24px]">
          お知らせ
        </h2>
        <div className="max-w-3xl mx-auto">
          <div className="bg-white/90 backdrop-blur-sm rounded-lg border border-gray-200 p-6 shadow-sm">
            {notices.map((notice, index) => (
              <div
                key={index}
                className={`flex items-start gap-3 ${index > 0 ? 'mt-4 pt-4 border-t border-[#67e0b8]/20' : ''}`}
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
