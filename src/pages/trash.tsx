import React from "react";

import { RiGitForkLine, RiGitRepositoryFill } from "react-icons/ri";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import { GrInstagram } from "react-icons/gr";
import { twMerge } from "tailwind-merge";
import { BiArrowToRight } from "react-icons/bi";
import { FaSpotify } from "react-icons/fa6";
import { LuDownload } from "react-icons/lu";
import fetchTopTracks, { fetchPlayingNow } from "../tools/spotify";
import Card from "../components/card";
import user from "./user.json";
import { RiGitForkFill } from "react-icons/ri";
import { FaStar } from "react-icons/fa";
import HeatMap from '@uiw/react-heat-map';
import { IoMdPerson } from "react-icons/io";
import { RiGroupFill } from "react-icons/ri";
import { FaLocationArrow } from "react-icons/fa6";
import Project from "../components/project";

const achievement = user.achievements
const pinnedRepos = user.pinnedRepos
const languages = user.languageBreakdown





const value = user.heatmap

const Demo = () => {
    return (
        <div className="w-full">
            <HeatMap
                className="w-full"
                value={value}
                weekLabels={['', 'Mon', '', 'Wed', '', 'Fri', '']}
                style={{ color: '#fff' }}
                startDate={new Date(value[0].date)}
                panelColors={{
                    0: '#f0e7fe',
                    2: '#e0cffc',
                    4: '#c19efa',
                    10: '#a26ef7',
                    20: '#843df5',
                    30: '#510ac2',
                }}
            />
        </div>
    )
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

export default function Trash() {

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

    React.useEffect(() => {

        (async () => {
            const topTracks = await fetchTopTracks();
            // select random track from top tracks
            setTopTrack(topTracks[Math.floor(Math.random() * topTracks.length)]);
            // setTopTrack(await fetchTopTracks());
        })()



    }, []);

    return (
        <div>
            <Card className="p-0 rounded-2xl flex flex-row justify-around items-center">
                <img src="mymac1.webp" alt="" className="w-32" />
                <div className="text-center grid place-items-center gap-2">
                    <ToggleSwitch />
                    <h1 className="text-xl md:text-2xl text-white font-bold">Available</h1>
                    <h2 className="md:text-lg text-neutral-400 font-normal">For work</h2>
                </div>
            </Card>
            <Card className="rounded-2xl flex flex-row justify-around items-center p-0">
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
                <img src="IMG_42821.webp" alt="" className="w-[40%]" />
            </Card>
            <Card className="p-0 rounded-2xl flex flex-row justify-around items-end">
                <div className="text-center flex items-center justify-center flex-col  gap-2 h-full">
                    <h1 className="text-xs md:text-sm text-neutral-400  font-normal">MORE ABOUT ME</h1>
                    <h2 className="text-base md:text-xl text-white font-bold ">RESUME</h2>
                    <LuDownload className="text-xl md:text-5xl text-text-500" />
                </div>
                <img src="meme1.webp" alt="" className="w-[40%]" />
            </Card>

        </div >
    );
}