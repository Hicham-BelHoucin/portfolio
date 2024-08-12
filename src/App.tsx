import React from "react";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import { Route, Routes } from "react-router-dom";
import Experience from "./pages/career";
import Education from "./pages/about";
import Footer from "./components/footer";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import { GrInstagram } from "react-icons/gr";
import { twMerge } from "tailwind-merge";
import { BiArrowToRight } from "react-icons/bi";
import Button from "./components/button";
import { FaSpotify } from "react-icons/fa6";
import fetchTopTracks, { fetchPlayingNow } from "./tools/spotify";
import { LuDownload } from "react-icons/lu";


const ToggleSwitch = () => {
  return (
    <label className="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        value=""
        className="sr-only peer"
        defaultChecked
        disabled
      />
      <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-primary-300  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
    </label>
  );
};


export default function App() {
  const [topTrack, setTopTrack] = React.useState<{
    name: string;
    artists: {
      name
      : string
    }[];
  }>({
    name: 'MARADONA',
    artists: [{ name: 'Stormy' }]
  });

  // Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
  React.useEffect(() => {

    (async () => {
      const topTracks = await fetchTopTracks();
      // select random track from top tracks
      setTopTrack(topTracks[Math.floor(Math.random() * topTracks.length)]);
      // setTopTrack(await fetchTopTracks());
      console.log(await fetchPlayingNow());
    })()

  }, []);

  const [active, setActive] = React.useState(0);
  const [state, setState] = React.useState<"education" | "experience">("education");

  return (
    <div className="w-screen h-screen max-w-7xl m-auto flex gap-2 md:gap-8 flex-col bg-background-950 overflow-auto scrollbar-hide text-text-100">
      <Navbar />
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





