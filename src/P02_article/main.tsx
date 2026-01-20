import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "@/globals.css";

async function enableMocking() {
    if (!import.meta.env.DEV) {
        return;
    }

    const { worker } = await import('@/mocks/browser');

    return worker.start({
        onUnhandledRequest: 'bypass',
    });
}

enableMocking().then(() => {
    const rootElement = document.getElementById("root");
    if (rootElement) {
        createRoot(rootElement).render(<App />);
    }
});
