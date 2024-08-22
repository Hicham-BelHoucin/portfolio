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



function toTitleCase(str: string) {
    return str
        .toLowerCase() // Convert the string to lowercase
        .replace(/[_-]/g, ' ') // Replace underscores and hyphens with spaces
        .replace(/\b\w/g, char => char.toUpperCase()); // Capitalize the first letter of each word
}

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

    React.useEffect(() => {

        (async () => {
            const topTracks = await fetchTopTracks();
            // select random track from top tracks
            setTopTrack(topTracks[Math.floor(Math.random() * topTracks.length)]);
            // setTopTrack(await fetchTopTracks());
        })()



    }, []);

    return (

        <div className="grid m-auto gap-2 md:gap-4 md:grid-cols-2 xl:grid-cols-3 py-4 p-2">


            <div className="grid gap-2 md:gap-4 w-full">

                <div className="w-full md:col-span-2">
                    <Card className="md:max-w-none rounded-2xl w-full col-span-2" link="/projects">
                        <h1 className="text-xl md:text-2xl text-white font-bold">Pinned Repositories</h1>
                        <div className="flex flex-col p-4 gap-2">
                            {
                                pinnedRepos.map((item, index) => (
                                    <Project item={item} key={index} />
                                ))
                            }
                        </div>
                    </Card>
                </div>
            </div>

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
                            <h2 className="md:text-lg text-neutral-400 font-normal">Age</h2>
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
                <div className="flex justify-between max-w-md gap-2 h-fit">
                    <Card link="https://github.com/Hicham-BelHoucin">
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
                <Card className="p-0 rounded-2xl overflow-hidden h-40 md:h-52" link="/projects">
                    <img
                        src="/image (3).png"
                        alt="Profile"
                        className="spinning-image absolute right-[40%] md:-left-[60%] max-w-lg object-cover"
                    />
                </Card>
            </div>
            <div className="grid gap-4">
                <Card className="p-0 rounded-2xl relative">
                    <img
                        src="/map.png"
                        alt="Profile"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute  bg-text-800 h-14 xl:h-24 w-14 xl:w-24 rounded-full opacity-40"></div>
                    <img src="/emoji.png" alt="" className="absolute w-10 xl:w-20 " />
                </Card>
                <Card className="rounded-2xl w-full max-w-2xl">
                    <h1 className="text-xl md:text-2xl text-white font-bold">GitHub Achievements</h1>
                    <div className="flex p-4 gap-2">
                        {
                            achievement.map((item, index) => (
                                <div key={index} className="flex flex-col items-center gap-2">
                                    <img src={item.img_url} alt="" className="w-32" />
                                    <div>
                                        <h1>{item.name}</h1>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </Card>
            </div>


            <div className="w-full md:col-span-2 xl:col-span-3">
                <Card className="md:max-w-none rounded-2xl w-full col-span-2">
                    <h1 className="text-xl md:text-2xl text-white font-bold">
                        {
                            value.reduce((acc, curr) => acc + curr.count, 0)
                        } {" "}
                        contributions in the last year
                    </h1>
                    <Demo />
                </Card>
            </div>
        </div>

    );
}





