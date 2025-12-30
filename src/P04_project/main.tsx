import { createRoot } from "react-dom/client";
import ProjectDetailApp from "./ProjectDetailApp";
import ProjectListApp from "./ProjectListApp";
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

const pid = new URLSearchParams(window.location.search).get('pid');

enableMocking().then(() => {
    createRoot(document.getElementById("root")!).render(
        pid ? <ProjectDetailApp /> : <ProjectListApp />
    );
});
