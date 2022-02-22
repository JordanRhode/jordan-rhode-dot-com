import ReactGa from 'react-ga';
import WindowDimensions from "./Components/WindowDimensions";

function step() {
    // console.log("step");
    window.requestAnimationFrame(step);
}

export default function Home() {
    document.title="Home | JordanRhode.com";
    ReactGa.pageview(window.location.pathname);

    const { width, height } = WindowDimensions();
    window.requestAnimationFrame(step);

    return (
        <h1>{width} | {height}</h1>
    );
}
