import Navbar from "./components/navbar";
import Home from "./pages/home";
import { Route, Routes } from "react-router-dom";
import Experience from "./pages/career";
import Education from "./pages/about";
import Footer from "./components/footer";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from "react";

const Contact = () => {
  return (
    <div className="flex gap-[20px] mx-[20px] flex-col">


    </div>
  )
}

export default function App() {

  const ref = React.useRef(false);

  const notify = () => toast.info(`
      🛠️ Work in Progress! 🚧
      I'm still polishing things up, so stay tuned for more updates! ✨
    `,
    {
      position: "top-center",
      autoClose: 10000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  React.useEffect(() => {
    if (!ref.current) {
      ref.current = true;
      notify();
    }
  }, []);


  return (
    <div className="w-screen h-screen max-w-7xl m-auto flex gap-2 md:gap-8 flex-col bg-background-950 overflow-auto scrollbar-hide text-text-100">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<Education />} />
        <Route path="/career" element={<Experience />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <ToastContainer />
      <Footer />
    </div>
  );
}
