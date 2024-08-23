import { twMerge } from "tailwind-merge";
import Heading from "../components/heading";
import Button from "../components/button";
import { BiArrowToRight } from "react-icons/bi";
import React from "react";
import Card from "../components/card";
import { motion } from "framer-motion";

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
            <div className="flex flex-col gap-2 md:gap-4 items-center justify-center bg-background-800 rounded-md w-[50%] h-[50%]">
                <motion.div
                    drag
                    dragConstraints={{
                        top: -50,
                        left: -50,
                        right: 50,
                        bottom: 50,
                    }}
                />
            </div>
        </>
    )
}
