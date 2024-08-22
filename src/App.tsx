import Navbar from "./components/navbar";
import Home from "./pages/home";
import { Route, Routes } from "react-router-dom";
import Experience from "./pages/career";
import Education from "./pages/about";
import Footer from "./components/footer";
import DotRing from "./components/dot-ring";

export default function App() {


  return (
    <div className="w-screen h-screen max-w-7xl m-auto flex gap-2 md:gap-8 flex-col bg-background-950 overflow-auto scrollbar-hide text-text-100">
      <Navbar />
      <DotRing />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<Education />} />
        <Route path="/career" element={<Experience />} />
        <Route path="/contact" element={<Experience />} />
      </Routes>
      <Footer />
    </div>
  );
}
