
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./assets/Header";
import Footer from "./assets/Footer";
import Banner from "./assets/Banner";
import About from "./assets/About";
import Projects from "./assets/Projects";
import Articles from "./assets/Articles";
import Tutorials from "./assets/Tutorials";
import Gallery from "./assets/Gallery";
import Subscribe from "./assets/Subscribe";
import Login from "./assets/Login";
import Signup from "./assets/Signup";
import Subscription from "./assets/Subscription";

function Home() {
    return (
        <>
            <Banner />
            <About />
            <Articles />
            <Tutorials />
            <Projects />
            <Gallery />
            <Subscribe />
        </>
    );
}

function App() {
    return (
        <BrowserRouter>
            <div className="bg-emerald-100 text-gray-800 font-serif min-h-screen w-full">
                <Header />

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/Subscription" element={<Subscription />} />
                </Routes>

                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;