import { twMerge } from "tailwind-merge";
import Button from "../components/button";
import React, { useRef, useEffect, useState } from "react";

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
    title,
    skills,
}: {
    title: string;
    skills: {
        label: string;
        icon: string;
    }[];
}) => {
    return (
        <div className="w-[305px] border border-neutral-800 rounded-xl">
            <div className="flex-col justify-center items-start gap-3 inline-flex p-8">
                <div className="text-white text-base font-normal font-['Nunito']">{title}</div>
                <div className="w-[200px] py-3.5 flex-col justify-center items-start gap-3.5 inline-flex">
                    {skills.map((item) => (
                        <div key={item.label} className="justify-start items-center gap-3.5 inline-flex">
                            <div className="w-[34px] h-[35px] relative">
                                <div className="w-[34px] h-[35px]  bg-neutral-800 rounded-full" />
                                <div className="w-[19.43px] h-5 px-px py-0.5 left-[7px]  flex-col justify-center items-center inline-flex" />
                                <img src={item.icon} alt="icons" className="w-[19.43px] -z-0 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                            </div>
                            <div className="text-white text-base font-normal font-['Nunito']">{item.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

}

export default function Home() {
    const [selectedSkill, setSelectedSkill] = useState<string>("");
    const [target, setTarget] = useState<string>("");

    return (
        <div>
            <section className="flex container bg-[#0C0C0D] items-center justify-center gap-4 text-white px-12 mx-auto flex-wrap md:flex-nowrap py-8 h-screen">
                <div className="text-left w-full order-2 md:order-1">
                    <h1 className="text-xl md:text-5xl font-bold">HI, I'm Hicham</h1>
                    <p className="text-md md:text-2xl text-[#6E6E6E]">
                        During this <span className="text-white">1 year</span> as{" "}
                        <span className="text-white">Full Stack Developer</span>. My
                        role has extended beyond coding to effective communication with
                        various departments, to define new features and spearheading the
                        development of new apps.
                    </p>
                    <div className="mt-8 flex items-center gap-4">
                        <a className="mt-4" href="/my-resume.pdf">
                            <Button variant="primary">Download CV</Button>
                        </a>
                        <a href="/experience">
                            <Button variant="text">See experience</Button>
                        </a>
                    </div>
                </div>
                <div className="w-full grid place-items-center order-1 md:order-2">
                    <img src="/Group 39.svg" alt="Hero" className="" />
                </div>
            </section>
            <section className="flex flex-col md:flex-row container h-screen bg-[#0C0C0D] items-center justify-center gap-2 md:gap-4 text-white">
                <div className="w-full relative h-full md:h-auto">
                    <img
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                        src="/Vector.svg"
                        alt="Hero"
                    />
                    <div className="flex h-full md:h-auto flex-col text-xl text-[#6E6E6E] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <span className="">1 year of</span>
                        <span className="text-white text-6xl font-bold">XP</span>
                        <span>with the most popular ecosystem</span>
                        <span>
                            full stack development, from the front-end to the back-end.
                        </span>
                    </div>
                </div>
                <div className="w-full p-4 md:p-0 md:w-[50%]">
                    <div className="flex gap-6 overflow-y-auto scrollbar-hide select-none">
                        {skills.map((skill) => (
                            <SkillCard
                                key={skill.title}
                                title={skill.title}
                                icon={skill.icon}
                                bgColor={skill.bgColor}
                                setSelectedSkill={setSelectedSkill}
                                selectedSkill={selectedSkill}
                            />
                        ))}
                    </div>
                    <ProgressBar
                        skills={skills}
                        selectedSkill={selectedSkill}
                        setSelectedSkill={setSelectedSkill}
                    />
                </div>
            </section>
            <section className="flex flex-col h-screen container mt-8 p-4 mx-auto text-left bg-[#0C0C0D] items-center justify-center gap-8 text-white">
                <div className="flex flex-col justify-center items-center gap-4">
                    <div className="text-purple-400 text-3xl md:text-7xl font-semibold font-['Raleway']">Javascript</div>
                    <div className="text-purple-500 text-3xl md:text-7xl font-semibold font-['Raleway']">React</div>
                    <div className="text-purple-500 text-3xl md:text-7xl font-semibold font-['Raleway']">Node Js</div>
                    <div className="text-violet-700 text-3xl md:text-7xl  font-semibold font-['Raleway']">Coffee</div>
                </div>
            </section>
            <section className="flex flex-col container mt-8 p-4 mx-auto text-left bg-[#0C0C0D] items-center justify-center gap-8 text-white">
                <div className="text-xl md:text-5xl text-white flex flex-col text-left w-full">
                    <span>These are the</span>
                    <span>technologies I’ve been using</span>
                </div>
                <div className="w-full flex flex-col md:flex-row items-center md:items-start justify-center gap-8 md:gap-16">
                    <Card
                        title="Front-end Engineer Design"
                        skills={frontend}
                    />
                    <Card
                        title="Back-end Engineer Design"
                        skills={backend}
                    />
                    <Card
                        title="Languages"
                        skills={languages}
                    />
                    <Card
                        title="DevOps"
                        skills={devops}
                    />
                </div>
            </section>

        </div>
    );
}
