import Button from "../components/button";
import Heading from "../components/heading";
import { twMerge } from "tailwind-merge";
import React, { useRef, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import { GrInstagram } from "react-icons/gr";
import { BiArrowToRight } from "react-icons/bi";
import { FaSpotify } from "react-icons/fa6";
import { LuDownload } from "react-icons/lu";

import data from "./data.json";
import Card from "../components/card";
import Typewriter from "../components/type-writer";
const { frontend, backend, languages, devops, skills } = data;

/*
    https://github.com/Hicham-BelHoucin/
    https://instagram.com/hicham_belhoucin
    https://linkedin.com/in/hicham-bel-houcin
    https://twitter.com/HichamBelhoucin
*/
const education = [
    {
        title: "Literature And Humanities",
        type: "Certificate in literature and humanities",
        startDate: "Nov 2018",
        endDate: "Dec 2021",
    },
    {
        title: "Software Engineering",
        type: "Certificate in software engineering",
        startDate: "Nov 2021",
        endDate: "Present",
    },
];

const TimelineItem = ({ title, children }: {
    title: string;
    children: React.ReactNode;
}) => {
    return (
        <div className="timeline-item">
            <div className="timeline-marker"></div>
            <div className="timeline-content px-4">
                <h3 className="timeline-title">{title}</h3>
                <p>{children}</p>
            </div>
        </div>
    );
};

const Timeline = ({ items }: {
    items: { title: string; content: React.ReactNode }[];
}) => {
    return (
        <div className="timeline w-full p-4">
            {items.map((item, index) => (
                <TimelineItem key={index} title={item.title}>
                    {item.content}
                </TimelineItem>
            ))}
        </div>
    );
};

export default function Home() {
    const [selectedSkill, setSelectedSkill] = useState<string>("");
    const [target, setTarget] = useState<string>("");
    const [state, setState] = useState<"experience" | "education">("experience");
    const [active, setActive] = useState(0);

    return (
        <div className="flex flex-col gap-2 md:gap-4 items-center justify-center m-auto">
            <div className="grid grid-cols-3 items-center gap-2 md:gap-4">
                <img
                    src="/my-image.jpg"
                    alt="Profile"
                    className="col-span-1 rounded-xl max-w-sm object-cover"
                />
                <div className="col-span-2 flex flex-col gap-2 md:gap-4">
                    <Card className="col-span-2 max-w-5xl">
                        <div className="text-left col-span-2 overflow-hidden text-text-500">
                            <h1 className="text-2xl text-white font-bold">
                                Hicham Bel Houcin
                            </h1>
                            <p>
                                I'm a <span className="text-primary-600 font-bold">Junior Software Engineer</span> from Morocco passionate about
                                creating dynamic and engaging user experiences. I specialize in
                                React, Node.js, JavaScript, TypeScript, HTML, and CSS. Having
                                studied at 1337 Coding School, I bring a strong foundation in
                                Git, C, C++, PostgreSQL, Prisma, and Docker. Let's work together
                                to bring great solutions to life!
                            </p>
                        </div>
                    </Card>
                    <Card className="col-span-2 max-w-5xl">
                        <div className="text-left col-span-2 overflow-hidden text-text-500 w-full">
                            <h1 className="text-2xl text-white font-bold">Education</h1>
                            <Timeline
                                items={education.map((item) => ({
                                    title: item.title,
                                    content: (
                                        <div>
                                            <p>{item.type}</p>
                                            <p>{item.startDate} - {item.endDate}</p>
                                        </div>
                                    ),
                                }))}
                            />
                        </div>
                    </Card>
                </div>
                <Card className="p-0 rounded-2xl flex flex-row justify-around items-center col-span-2 max-w-5xl">
                    <div className="text-center grid place-items-center gap-2">
                        <h1 className="text-xs md:text-sm text-neutral-400  font-normal">MORE ABOUT ME</h1>
                        <h2 className="text-base md:text-xl text-white font-bold ">RESUME</h2>
                        <LuDownload className="text-xl md:text-5xl text-text-500" />
                    </div>
                    <img src="meme1.webp" alt="" className="max-w-[230px]" />
                </Card>
                <div className="flex gap-2">
                    <Card className="p-0 max-w-xs">
                        <img src="buy-me-a-coffee.png" alt="" />
                    </Card>
                    <Card className="p-0 max-w-xs">
                        <img src="linkedin-logo-png-free-11660255212jmwsbnextx-removebg-preview (6).png" alt="" />
                    </Card>
                </div>
            </div>
        </div>
    );
}
