import { useState, useEffect } from "react";
import CreatorDetail from "./components/CreatorDetail";
import CreatorList from "./components/CreatorList";

export default function App() {
    const [cid, setCid] = useState<string | null>(null);
    const [gid, setGid] = useState<string | null>(null);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        setCid(urlParams.get('cid'));
        setGid(urlParams.get('gid'));

        const handlePopState = () => {
            const params = new URLSearchParams(window.location.search);
            setCid(params.get('cid'));
            setGid(params.get('gid'));
        };
        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    if (cid || gid) {
        return <CreatorDetail cid={cid} gid={gid} />;
    }

    return <CreatorList />;
}
