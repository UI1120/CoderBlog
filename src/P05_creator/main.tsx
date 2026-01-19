import { createRoot } from "react-dom/client";
import CreatorApp from "./CreatorApp";
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
    createRoot(document.getElementById("root")!).render(
        <CreatorApp />
    );
});
