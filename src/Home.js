import ReactGa from 'react-ga';

function Home() {
    ReactGa.pageview(window.location.pathname);
    return (
        <h1>Welcome</h1>
    );
}

export default Home;