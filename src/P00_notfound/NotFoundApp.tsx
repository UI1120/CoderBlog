import { Header } from '@/000_common/components/Header';
import { Footer } from '@/000_common/components/Footer';
import { FileQuestion } from 'lucide-react';

export default function NotFoundApp() {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />
            <main className="flex-grow flex items-center justify-center py-16 px-6">
                <div className="max-w-md w-full text-center">
                    <div className="mb-8 flex justify-center">
                        <div className="bg-[#67e0b8]/20 p-6 rounded-full">
                            <FileQuestion className="w-16 h-16 text-[#67e0b8]" />
                        </div>
                    </div>
                    <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">ページが見つかりません</h2>
                    <p className="text-gray-600 mb-10 leading-relaxed">
                        お探しのページは移動または削除されたか、URLが間違っている可能性があります。
                    </p>
                    <a
                        href="/index"
                        className="inline-block bg-[#67e0b8] text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-[#55c9a3] transition-colors shadow-md hover:shadow-lg"
                    >
                        トップページへ戻る
                    </a>
                </div>
            </main>
            <Footer />
        </div>
    );
}
