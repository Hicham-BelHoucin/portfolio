import { twMerge } from "tailwind-merge";
import Heading from "../components/heading";
import Button from "../components/button";
import { BiArrowToRight } from "react-icons/bi";
import React from "react";
import Card from "../components/card";

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


export default function Experience() {
    const [active, setActive] = React.useState(0);
    const [state, setState] = React.useState<"education" | "experience">("experience");
    return (
        <>
            <div className="flex flex-col gap-2 md:gap-4 items-center justify-center">
                <h1 className="text-3xl">Project Showcase</h1>
                <p>
                    Here are some of the projects I have worked on. Click on the arrow to
                    view more details.
                </p>
                <div className="flex gap-2 md:gap-4">
                    <Button className={active === 0 ? "active-button" : "inactive-button"} onClick={() => {
                        setActive(0)
                    }}>
                        All
                    </Button>
                    <Button className={active === 1 ? "active-button" : "inactive-button"} onClick={() => {
                        setActive(1)
                    }}>
                        Personal
                    </Button>
                    <Button className={active === 2 ? "active-button" : "inactive-button"} onClick={() => {
                        setActive(2)
                    }}>
                        Educational
                    </Button>

                    <Button className={active === 3 ? "active-button" : "inactive-button"} onClick={() => {
                        setActive(3)
                    }}>
                        Professional
                    </Button>

                </div>
                <div className="grid grid-cols-3 items-center gap-2 md:gap-4">
                    {new Array(3).fill(0).map((_, index) => (
                        <Card className="p-0 relative">
                            <BiArrowToRight className="absolute right-6 top-6 text-text-100 text-5xl" />
                            <img
                                src="/Rectangle 24.png"
                                alt="Project"
                                className="rounded-xl w-full object-cover"
                            />
                            <div className="p-4">
                                <h1 className="text-2xl text-white font-bold">Project 1</h1>
                                <h2 className="text-lg text-neutral-400 font-normal">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
                                    hic eius eum voluptatum pariatur perferendis accusantium.
                                    Error doloremque eos placeat nihil repellat tenetur nobis
                                    excepturi cum atque. Est, fuga dolor.
                                </h2>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
            <div className="flex flex-col gap-2 md:gap-4 items-center justify-center">
                <h1 className="text-3xl">Education & Career</h1>
                <p>
                    Here are some of the projects I have worked on. Click on the arrow to
                    view more details.
                </p>
                {/* <LandingPageSelector state={state} setState={setState} selectable /> */}
                <div className="flex gap-2 md:gap-4">
                    <Button className={state === "experience" ? "active-button" : "inactive-button"} onClick={() => {
                        setState("experience")
                    }}>
                        Experience
                    </Button>
                    <Button className={state === "education" ? "active-button" : "inactive-button"} onClick={() => {
                        setState("education")
                    }}>
                        Education
                    </Button>

                </div>
                <div className="grid grid-cols-3 items-center gap-2 md:gap-4">
                    {new Array(3).fill(0).map((_, index) => (
                        <Card className="p-0 relative">
                            <BiArrowToRight className="absolute right-6 top-6 text-text-100 text-5xl" />

                            <img
                                src="/Rectangle 24.png"
                                alt="Project"
                                className="rounded-xl w-full object-cover"
                            />
                            <div className="p-4">
                                <h1 className="text-2xl text-white font-bold">Project 1</h1>
                                <h2 className="text-lg text-neutral-400 font-normal">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
                                    hic eius eum voluptatum pariatur perferendis accusantium.
                                    Error doloremque eos placeat nihil repellat tenetur nobis
                                    excepturi cum atque. Est, fuga dolor.
                                </h2>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </>
    )
}
