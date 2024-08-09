import { twMerge } from "tailwind-merge";
import Button from "../components/button";
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
const { frontend, backend, languages, devops, skills } = data;

/*
    https://github.com/Hicham-BelHoucin/
    https://instagram.com/hicham_belhoucin
    https://linkedin.com/in/hicham-bel-houcin
    https://twitter.com/HichamBelhoucin
*/


const SkillCard = ({
    title,
    icon,
    bgColor,
    setSelectedSkill,
    selectedSkill,

}: {
    title: string;
    icon: string;
    bgColor: string;
    setSelectedSkill: (skill: string) => void;
    selectedSkill: string;

}) => {
    const targetRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setSelectedSkill(title);
                }
            },
            {
                root: null, // viewport
                rootMargin: "0px", // no margin
                threshold: 0.7, // at least 50% of the target is visible
            }
        );

        if (targetRef.current) {
            observer.observe(targetRef.current);
        }

        // Cleanup observer
        return () => {
            if (targetRef.current) {
                observer.unobserve(targetRef.current);
            }
        };
    }, []);


    useEffect(() => {



        const scrollIntoViewIfNeeded = () => {
            if (title === selectedSkill && targetRef.current) {
                targetRef.current.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                });
            }
        };

        scrollIntoViewIfNeeded();


    }, [selectedSkill]);

    return (
        <div
            ref={targetRef}
            className={`flex flex-shrink-0 justify-center px-10 flex-col gap-4 w-[409px] h-[277px] rounded-[5rem]`}
            style={{ backgroundColor: bgColor }}
        >
            <img src={icon} alt="Skill" className="w-16" />
            <h1 className="text-2xl font-bold text-black">{title}</h1>
        </div>
    );
};

const ProgressBar = ({
    selectedSkill,
    skills,
    setSelectedSkill,
}: {
    selectedSkill: string;
    skills: {
        title: string;
        icon: string;
        bgColor: string;
    }[];
    setSelectedSkill: (skill: string) => void;
}) => {
    return (
        <div className="flex gap-2 mt-4">
            {skills.map((skill) => {
                return (
                    <div
                        key={skill.title}
                        onClick={() => {
                            setSelectedSkill(skill.title);
                        }}
                        className={twMerge(
                            "cursor-pointer w-[20px] h-3 bg-[#606060] text-[#606060] rounded-full transition-width duration-300",
                            selectedSkill === skill.title && "bg-white text-white w-[50px]"
                        )}
                    ></div>
                );
            })}
        </div>
    );
};



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
}

export default function Home() {
    const [selectedSkill, setSelectedSkill] = useState<string>("");
    const [target, setTarget] = useState<string>("");
    const [state, setState] = useState<"experience" | "education">("experience");
    const [active, setActive] = useState(0);


    return (
        <div>
            <div className="flex flex-col gap-2 md:gap-4 items-center justify-center">
                <h1 className="text-3xl">About Me</h1>
                <div className="grid grid-cols-3 items-center gap-2 md:gap-4">
                    <img
                        src="/my-image.jpg"
                        alt="Profile"
                        className="col-span-1 rounded-xl max-w-sm object-cover"
                    />
                    <div
                        className="text-center col-span-2 overflow-hidden text-text-500"
                    >
                        <h1 className="text-2xl text-white font-bold">Hicham Bel Houcin</h1>
                        <Typewriter
                            text="I'm a junior software engineer from Morocco passionate about creating dynamic and engaging user experiences. I specialize in React, Node.js, JavaScript, TypeScript, HTML, and CSS. Having studied at 1337 Coding School, I bring a strong foundation in Git, C, C++, PostgreSQL, Prisma, and Docker. Let's work together to bring great solutions to life!"
                            delay={50}
                        />
                    </div>
                </div>
            </div>
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
        </div>
    );
}
