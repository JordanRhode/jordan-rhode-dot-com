import ReactGa from 'react-ga';
import WindowDimensions from "./Components/WindowDimensions";
import BouncingLogo from "./Components/BouncingLogo";

export default function Home() {
    document.title="Home | JordanRhode.com";
    ReactGa.pageview(window.location.pathname);

    let { width, height } = WindowDimensions();

    return (
        <BouncingLogo width={width} height={height - 10} />
    );
}
