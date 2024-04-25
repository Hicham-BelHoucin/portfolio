import { twMerge } from "tailwind-merge";
import Heading from "../components/heading";
import Button from "../components/button";

const experience = [
    {
        title: "Full Stack Developer",
        type: "Contract",
        startDate: "Nov 2023",
        endDate: "Present",
        location: "Remote",
        company: "High Tech Vision",
        description: `Crafted a dynamic streaming platform as a full-stack developer,
specializing in user authentication, playback functionality, and
support ticket integration. Collaborated closely with the team to
optimize user experiences and platform performance.`
    },
    {
        title: "scraping-most-salled-products",
        type: "Project",
        startDate: "Jan 2022",
        endDate: "Feb 2022",
        location: "N/A",
        company: "Personal Project",
        description: "Implemented a Python web scraping script to collect data on most sold products from various online platforms."
    },
    {
        title: "camping-app",
        type: "Project",
        startDate: "Mar 2022",
        endDate: "Apr 2022",
        location: "N/A",
        company: "Personal Project",
        description: "Developed a camping app using TypeScript, HTML, CSS, and JavaScript to practice CSS skills and create multiple sections for camping enthusiasts."
    },
    {
        title: "Swifty-Companion",
        type: "Project",
        startDate: "May 2022",
        endDate: "Jun 2022",
        location: "N/A",
        company: "Personal Project",
        description: "Introduction to iOS and Android application development using JavaScript."
    },
    {
        title: "ft_containers",
        type: "Project",
        startDate: "Jul 2022",
        endDate: "Aug 2022",
        location: "N/A",
        company: "Personal Project",
        description: "Implemented C++ containers (vector, stack, map, set) and associated tools (equal, enable_if) as part of the 42 project ft_containers."
    },
    {
        title: "portfolio",
        type: "Project",
        startDate: "Sep 2022",
        endDate: "Oct 2022",
        location: "N/A",
        company: "Personal Project",
        description: "Built a personal portfolio website using React.js to showcase projects, skills, and experiences in an interactive manner."
    },
    {
        title: "youtube-downloader",
        type: "Project",
        startDate: "Nov 2022",
        endDate: "Dec 2022",
        location: "N/A",
        company: "Personal Project",
        description: "Developed a user-friendly YouTube playlist downloader in Python to convert videos to mp3 format."
    },
    {
        title: "inception",
        type: "Project",
        startDate: "Jan 2023",
        endDate: "Feb 2023",
        location: "N/A",
        company: "Personal Project",
        description: "Explored system administration using Docker by virtualizing Docker images in a personal virtual machine."
    },
    {
        title: "todo-list-using-angular",
        type: "Project",
        startDate: "Mar 2023",
        endDate: "Apr 2023",
        location: "N/A",
        company: "Personal Project",
        description: "Built a simple todo list application using Angular framework and local storage."
    },
    {
        title: "ft_transcendence",
        type: "Project",
        startDate: "May 2023",
        endDate: "Jun 2023",
        location: "N/A",
        company: "Personal Project",
        description: "Developed an all-in-one single-page website featuring a classic pong game with advanced features like JWT/2FA authentication, chat system, and matchmaking."
    },
    {
        title: "Cub3d",
        type: "Project",
        startDate: "Jul 2023",
        endDate: "Aug 2023",
        location: "N/A",
        company: "Personal Project",
        description: "Inspired by the 90's game, implemented Ray Casting to create a dynamic view inside a maze using C and Makefile."
    },
    {
        title: "websrv",
        type: "Project",
        startDate: "Sep 2023",
        endDate: "Oct 2023",
        location: "N/A",
        company: "Personal Project",
        description: "Wrote an HTTP server in C++ to understand HTTP protocol and test it with a real browser."
    },
    {
        title: "simple_ping_pong",
        type: "Project",
        startDate: "Nov 2023",
        endDate: "Dec 2023",
        location: "N/A",
        company: "Personal Project",
        description: "Developed a simple ping pong game in JavaScript and HTML, inspired by the classic tennis game."
    },
];


const Card = ({
    title,
    type,
    startDate,
    endDate,
    location,
    company,
    description
}: {
    title: string;
    type: string;
    startDate: string;
    endDate: string;
    location: string;
    company: string;
    description: string;
}) => {
    return (
        <div className="w-full p-8 bg-neutral-900 rounded-[80px] flex flex-col md:flex-row justify-center">
            <div className="w-full flex flex-col justify-start items-start gap-2 mt-8">
                <div className="text-white text-[28px] font-semibold font-raleway">{title}</div>
                <div className="text-violet-400 text-[22px] font-normal font-raleway">{type}</div>
                <div className="flex items-center gap-3">
                    <div className="text-neutral-500 text-base font-light font-nunito">{startDate}</div>
                    <div className="w-1.5 h-1.5 bg-emerald-300 rounded-full" />
                    <div className="text-neutral-500 text-base font-light font-nunito">{endDate}</div>
                </div>
                <div className="text-neutral-500 text-base font-light font-raleway">{location}</div>
            </div>
            <div className="w-full flex justify-center items-center mt-8">
                <div className="w-[817px] flex flex-col justify-start items-start gap-7">
                    <div className="text-violet-400 text-[22px] font-semibold font-raleway">{company}</div>
                    <div className="w-full text-neutral-500 text-[22px] font-normal font-raleway leading-[42px]">
                        {description}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function Experience() {
    return (
        <div className="w-full mt-20 relative container mx-auto p-8 3xl:p-2">
            <div className="w-full h-[500px] relative">
                <img
                    className="absolute w-[400px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-90"
                    src="/Vector.svg"
                    alt="Hero"
                />
                <div className="w-full text-center flex text-2xl flex-col items-center justify-center absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <span className="text-stone-300  font-light font-raleway">
                        &lt; Here, you can know me a little more and see my whole experience as a
                    </span>
                    <span className="text-stone-300  font-light font-raleway">
                        Full Stack Developer.
                        /&gt;
                    </span>
                    <a className="mt-4" href="/my-resume.pdf">
                        <Button variant="primary" className="!px-8 !py-4">Download CV</Button>
                    </a>
                </div>
            </div>
            <div className="p-4 flex flex-col gap-4 h-full">
                {
                    experience.map((exp, index) => (
                        <Card key={index} {...exp} />
                    ))
                }
            </div>
        </div>
    )
}
