import Header from "./assets/Header";
import Banner from "./assets/Banner";
import About from "./assets/About";
import Projects from "./assets/Projects";
import Articles from "./assets/Articles";
import Tutorials from "./assets/Tutorials";
import Gallery from "./assets/Gallery";
import Subscribe from "./assets/Subscribe";
import Footer from "./assets/Footer";

function App()
{
    return (
        <div className="bg-emerald-100 text-gray-800 font-serif">

            <Header />

            <Banner />

            <About />

            <Articles />

            <Tutorials />

            <Projects />

            <Gallery />

            <Subscribe />

            <Footer />

        </div>
    );
}

export default App;