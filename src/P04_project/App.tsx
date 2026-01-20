import ProjectDetailApp from "./components/ProjectDetailApp";
import ProjectListApp from "./components/ProjectListApp";

export default function App() {
    const pid = new URLSearchParams(window.location.search).get('pid');
    return pid ? <ProjectDetailApp /> : <ProjectListApp />;
}
