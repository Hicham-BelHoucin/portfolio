import React from "react";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import { Route, Routes } from "react-router-dom";
import Experience from "./pages/experience";
import Education from "./pages/education";
import Footer from "./components/footer";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import { GrInstagram } from "react-icons/gr";
import { twMerge } from "tailwind-merge";
import { BiArrowToRight } from "react-icons/bi";
import Button from "./components/button";
import { FaSpotify } from "react-icons/fa6";
import fetchTopTracks from "./tools/spotify";
import { LuDownload } from "react-icons/lu";

const Card = ({
  className,
  children,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={twMerge(
        "flex flex-col items-center justify-center bg-background-900  p-4 text-text-100 max-w-md rounded-xl overflow-hidden",
        className
      )}
    >
      {children}
    </div>
  );
};

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

const Typewriter = ({
  text,
  delay = 100,
}: {
  text: string;
  delay?: number;
}) => {
  const [currentText, setCurrentText] = React.useState("");
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text]);

  return <span>{currentText}</span>;
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
      setTopTrack(await fetchTopTracks());
    })()

  }, []);

  const [active, setActive] = React.useState(0);
  const [state, setState] = React.useState<"education" | "experience">("education");

  return (
    <div className="w-screen h-screen max-w-7xl m-auto flex gap-2 md:gap-8 flex-col bg-background-950 overflow-auto scrollbar-hide text-text-100">
      <Navbar />
      <div className="grid m-auto gap-2 md:gap-4 md:grid-cols-2 xl:grid-cols-3 py-4 p-2">
        <div className="grid gap-2 md:gap-4">
          <Card className="gap-2 md:gap-4">
            <img
              src="image-1.png"
              alt="Profile"
              className="rounded-xl w-32 h-32 object-cover"
            />
            <div className="flex justify-center text-center items-center gap-2 md:gap-4">
              <div>
                <h1 className="text-xl md:text-2xl text-white font-bold">
                  Hicham Bel Houcin
                </h1>
                <h2 className=" md:text-xl text-neutral-400 font-normal">
                  Junior Software Engineer
                </h2>
              </div>
            </div>
            <div className="flex gap-1 md:gap-4">
              <Card>
                <h1 className="text-xl md:text-2xl text-white font-bold">21</h1>
                <h2 className="md:text-lg text-neutral-400 font-normal">Years</h2>
              </Card>
              <Card>
                <h1 className="text-xl md:text-2xl text-white font-bold">Morocco</h1>
                <h2 className="md:text-lg text-neutral-400 font-normal">Location</h2>
              </Card>
              <Card>
                <h1 className="text-xl md:text-2xl text-white font-bold">English</h1>
                <h2 className="md:text-lg text-neutral-400 font-normal">Language</h2>
              </Card>
            </div>
          </Card>
          <Card className="p-0 rounded-2xl flex flex-row justify-around items-center">
            <div className="text-center grid place-items-center gap-2">
              <h1 className="text-xs md:text-sm text-neutral-400  font-normal">MORE ABOUT ME</h1>
              <h2 className="text-base md:text-xl text-white font-bold ">RESUME</h2>
              <LuDownload className="text-xl md:text-5xl text-text-500" />
            </div>
            <img src="meme1.webp" alt="" className="w-32" />
          </Card>
        </div>
        <div className="grid gap-2 md:gap-4">
          <Card className="p-0 rounded-2xl flex flex-row justify-around items-center">
            <img src="mymac1.webp" alt="" className="w-32" />
            <div className="text-center grid place-items-center gap-2">
              <ToggleSwitch />
              <h1 className="text-xl md:text-2xl text-white font-bold">Available</h1>
              <h2 className="md:text-lg text-neutral-400 font-normal">For work</h2>
            </div>
          </Card>
          <Card className="rounded-2xl flex flex-row justify-around items-center">
            <div className="text-center grid place-items-center gap-2">
              <FaSpotify color="#62dabe" size={42} />
              <div className="flex items-center gap-2 text-[#62dabe]">
                <div className="wave-container">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 100 100"
                    className="wave"
                  >
                    <rect className="wave-rect" x="10" y="30" width="5" height="40" />
                    <rect className="wave-rect" x="25" y="20" width="5" height="60" />
                    <rect className="wave-rect" x="40" y="10" width="5" height="80" />
                    <rect className="wave-rect" x="55" y="20" width="5" height="60" />
                    <rect className="wave-rect" x="70" y="30" width="5" height="40" />
                  </svg>
                </div>
                <p>
                  Top Track
                </p>
              </div>
              <h1 className="text-2xl text-white font-bold">{topTrack?.artists[0].name}</h1>
              <h2 className="text-lg text-neutral-400 font-normal">{topTrack?.name}</h2>
            </div>
            <img src="IMG_42821.webp" alt="" className="w-32" />
          </Card>
          <div className="flex justify-between max-w-md gap-2 h-fit">
            <Card>
              <FaGithub className="text-3xl md:text-5xl text-text-500" />
            </Card>
            <Card>
              <FaLinkedin className="text-3xl md:text-5xl text-text-500" />
            </Card>
            <Card>
              <BiLogoGmail className="text-3xl md:text-5xl text-text-500" />
            </Card>
            <Card>
              <GrInstagram className="text-3xl md:text-5xl text-text-500" />
            </Card>
          </div>
          <Card className="p-0 rounded-2xl overflow-hidden h-40 md:h-52 relative">
            <img
              src="/image (3).png"
              alt="Profile"
              className="spinning-image absolute right-[40%] md:-left-[60%] max-w-lg object-cover"
            />
            <BiArrowToRight className="absolute right-6 top-6 text-text-500 text-5xl" />
          </Card>
        </div>
        <Card className="p-0 rounded-2xl relative">
          <img
            src="/map.png"
            alt="Profile"
            className="w-full h-full object-cover"
          />
          <div className="absolute  bg-text-800 h-14 xl:h-24 w-14 xl:w-24 rounded-full opacity-40"></div>
          <img src="/emoji.png" alt="" className="absolute w-10 xl:w-20 " />
        </Card>
      </div>
      <Footer />
    </div>
  );
}





