import { createRoot } from "react-dom/client";
import NotFoundApp from "./NotFoundApp.tsx";
import "@/P01_toppage/index.css"; // Reuse generated styles from toppage

async function enableMocking() {
    if (process.env.NODE_ENV !== 'development') {
        return;
    }

    const { worker } = await import('@/mocks/browser');

    return worker.start({
        onUnhandledRequest: 'bypass',
    });
}

enableMocking().then(() => {
    createRoot(document.getElementById("root")!).render(<NotFoundApp />);
});
