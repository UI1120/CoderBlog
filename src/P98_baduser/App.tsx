import { ShieldAlert, LogIn, Home } from "lucide-react";

export default function App() {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 font-sans">
            <div className="max-w-md w-full text-center space-y-8">
                {/* Animated Icon Container */}
                <div className="relative inline-block">
                    <div className="absolute inset-0 bg-red-100 rounded-full animate-ping opacity-25"></div>
                    <div className="relative w-24 h-24 bg-white rounded-full border-2 border-red-100 shadow-xl flex items-center justify-center text-red-500 mx-auto">
                        <ShieldAlert className="w-12 h-12" />
                    </div>
                </div>

                <div className="space-y-4">
                    <h1 className="text-3xl font-black text-gray-800 uppercase tracking-tighter">
                        Access Denied
                    </h1>
                    <p className="text-gray-500 font-medium leading-relaxed">
                        認証に失敗しました。このページにアクセスする権限がないか、セッションが切れています。
                    </p>
                    <div className="h-1 w-12 bg-red-500 mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 gap-4 pt-4">
                    <a
                        href="/login"
                        className="flex items-center justify-center gap-3 bg-gray-900 text-white rounded-2xl py-4 font-bold hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
                    >
                        <LogIn className="w-5 h-5" />
                        ログイン画面へ
                    </a>
                    <a
                        href="/"
                        className="flex items-center justify-center gap-3 bg-white border border-gray-200 text-gray-600 rounded-2xl py-4 font-bold hover:bg-gray-50 transition-all shadow-sm"
                    >
                        <Home className="w-5 h-5" />
                        トップページへ
                    </a>
                </div>

                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] pt-8">
                    System Protocol // Unauthorized Access Logged
                </p>
            </div>
        </div>
    );
}
