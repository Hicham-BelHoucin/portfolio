
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import { GrInstagram } from "react-icons/gr";
import { LuDownload } from "react-icons/lu";
import Card from "../components/card";
import user from "./user.json";
import Project from "../components/project";
import CustomHeatMap from "../components/heat-map";

const achievement = user.achievements
const pinnedRepos = user.pinnedRepos




export default function App() {

    return (

        <div className="grid m-auto gap-2 md:gap-4 md:grid-cols-4 xl:grid-cols-3 py-4 p-2">
            <div className="grid gap-4 md:col-span-2 xl:col-span-1">
                <Card className="p-0 rounded-2xl relative">
                    <img
                        src="/map.png"
                        alt="Profile"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute  bg-text-800 h-14 xl:h-24 w-14 xl:w-24 rounded-full opacity-40"></div>
                    <img src="/emoji.png" alt="" className="absolute w-10 xl:w-20 " />
                </Card>
                <Card className="p-0 rounded-2xl flex flex-row justify-around items-end" clickable link="/belhoucin.hicham.pdf">
                    <div className="text-center p-4 flex items-center justify-center flex-col  gap-2 h-full">
                        <h1 className="text-xs md:text-sm text-neutral-400  font-normal">MORE ABOUT ME</h1>
                        <h2 className="text-base md:text-xl text-white font-bold ">RESUME</h2>
                        <LuDownload className="text-xl md:text-5xl text-text-500" />
                    </div>
                    <img src="meme1.webp" alt="" className="w-[40%]" />
                </Card>
                <Card className="rounded-2xl w-full max-w-2xl">
                    <h1 className="text-xl md:text-2xl text-white font-bold">GitHub Achievements</h1>
                    <div className="flex p-4 gap-4">
                        {
                            achievement.map((item, index) => (
                                <div key={index} className="flex flex-col items-center gap-2">
                                    <img src={item.img_url} alt="" className="w-20" />
                                    <div>
                                        <h1>{item.name}</h1>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </Card>
            </div>



            <div className="grid gap-2 place-items-center md:col-span-2 xl:col-span-1">
                <Card className="gap-2 md:gap-4" clickable link="/about">
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
                <div className="flex justify-between gap-2  h-full w-full">
                    <Card link="https://github.com/Hicham-BelHoucin" clickable>
                        <FaGithub className="text-xl md:text-5xl text-text-500" />
                    </Card>
                    <Card link="https://linkedin.com/in/hicham-bel-houcin" clickable>
                        <FaLinkedin className="text-xl md:text-5xl text-text-500" />
                    </Card>
                    <Card clickable link="mailto:belhoucin.hicham@gmail.com">
                        <BiLogoGmail className="text-xl md:text-5xl text-text-500" />
                    </Card>
                    <Card clickable link="https://instagram.com/hicham_belhoucin">
                        <GrInstagram className="text-xl md:text-5xl text-text-500" />
                    </Card>
                </div>
                <Card className="p-0 rounded-2xl overflow-hidden h-40 md:h-56" link="/career">
                    <img
                        src="/image(1).png"
                        alt="Profile"
                        className="spinning-image absolute right-[40%] md:-left-[55%] max-w-lg object-cover"
                    />
                </Card>
            </div>


            <div className="grid gap-2 md:gap-4 md:col-span-4 xl:col-span-1">
                <Card className="md:max-w-none rounded-2xl w-full col-span-2 p-1 md:p-4" link="/career">
                    <h1 className="text-xl md:text-2xl text-white font-bold">Pinned Projects</h1>
                    <div className="flex flex-col md:flex-row xl:flex-col p-4 gap-2">
                        {
                            pinnedRepos.map((item, index) => (
                                <Project item={item} key={index} />
                            ))
                        }
                    </div>
                </Card>
            </div>


            <CustomHeatMap />
        </div>

    );
}





