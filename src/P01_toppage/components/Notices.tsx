import { NoticeCard, Notice } from '@/P00_common/components/NoticeCard.tsx';
import { useState, useEffect } from 'react';
import { API_BASE_URL } from '@/constants';

export function Notices() {
  const [notices, setNotices] = useState<Notice[]>([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/notices/latest?split=3`)
      .then(res => res.json())
      .then(data => setNotices(data))
      .catch(err => console.error('Failed to fetch notices:', err));
  }, []);

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-gray-900 mb-8 text-center text-[24px]">
          お知らせ
        </h2>
        <div className="max-w-3xl mx-auto">
          {notices.length > 0 ? (
            <>
              <NoticeCard notices={notices} />
              <div className="mt-8 text-center">
                <a
                  href="/notices"
                  className="inline-flex items-center text-sm font-medium text-emerald-600 hover:text-emerald-700 hover:underline transition-colors"
                >
                  過去のお知らせ一覧
                  <svg className="ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </>
          ) : (
            <div className="text-center text-gray-400 py-8 text-sm">
              現在、新しいお知らせはありません。
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
