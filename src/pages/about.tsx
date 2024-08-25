import React from "react";
import { LuDownload } from "react-icons/lu";

import Card from "../components/card";

/*
    https://github.com/Hicham-BelHoucin/
    https://instagram.com/hicham_belhoucin
    https://linkedin.com/in/hicham-bel-houcin
    https://twitter.com/HichamBelhoucin
*/
const education = [
    {
        title: "Software Engineering",
        type: "Certificate in software engineering",
        description:
            "1337 Coding School is a project-based, peer-to-peer learning coding school. It is a tuition-free, non-profit and project-based coding school. The school's pedagogy is based on peer-to-peer learning, where students are encouraged to work collaboratively on projects and solve problems together.",
        startDate: "Nov 2021",
        endDate: "Present",
    },
];

const experience = [
    {
        title: "Full Stack Developer",
        type: "Internship",
        startDate: "Nov 2023",
        description: `Crafted a dynamic streaming platform as a full-stack developer, specializing in user authentication, playback functionality, and support ticket integration.Collaborated closely with the team to optimize user experiences and platform performance.`,
        endDate: "May 2024",
    },
];

const TimelineItem = ({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) => {
    return (
        <div className="timeline-item">
            <div className="timeline-marker"></div>
            <div className="timeline-content px-4">
                <h3 className="timeline-title">{title}</h3>
                <div>{children}</div>
            </div>
        </div>
    );
};

const Timeline = ({
    items,
}: {
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

    return (
        <div className="grid place-items-center xl:grid-cols-3 items-center gap-2 md:gap-4 p-2 md:p-4">
            <Card className="col-span-3 md:col-auto xl:row-span-2 p-0 lg:max-w-sm">
                <img
                    src="/image.jfif"
                    alt="Profile"
                    className="w-full rounded-xl object-cover h-full"
                />
            </Card>
            <Card className="max-w-none col-span-3 md:col-span-2">
                <div className="text-left col-span-2 overflow-hidden text-text-500">
                    <h1 className="text-2xl text-white font-bold">
                        Hicham Bel Houcin
                    </h1>
                    <p>
                        I'm a{" "}
                        <span className="text-primary-600 font-bold">
                            Junior Software Engineer
                        </span>{" "}
                        from Morocco passionate about creating dynamic and engaging user
                        experiences. I specialize in React, Node.js, JavaScript,
                        TypeScript, HTML, and CSS. Having studied at 1337 Coding School,
                        I bring a strong foundation in Git, C, C++, PostgreSQL, Prisma,
                        and Docker. Let's work together to bring great solutions to
                        life!
                    </p>
                </div>
            </Card>

            <Card className="w-full col-span-3 xl:col-span-2 flex-2 max-w-none">
                <div className="text-left overflow-hidden text-text-500 w-full">
                    <h1 className="text-2xl text-white font-bold">Education</h1>
                    <Timeline
                        items={education.map((item) => ({
                            title: item.title,
                            content: (
                                <div className="grid gap-2">
                                    <div className="text-base">{item.description}</div>
                                    <p>
                                        {" "}
                                        {item.type} | {item.startDate} - {item.endDate}
                                    </p>
                                </div>
                            ),
                        }))}
                    />
                </div>
            </Card>

            <Card className="w-full flex-2 col-span-3 max-w-none">
                <div className="text-left col-span-2 overflow-hidden text-text-500 w-full">
                    <h1 className="text-2xl text-white font-bold">Work Experience</h1>
                    <Timeline
                        items={experience.map((item) => ({
                            title: item.title,
                            content: (
                                <div className="grid gap-2">
                                    <div className="text-base">{item.description}</div>
                                    <p>
                                        {" "}
                                        {item.type} | {item.startDate} - {item.endDate}
                                    </p>
                                </div>
                            ),
                        }))}
                    />
                </div>
            </Card>
            <div className="w-full grid grid-cols-4 xl:grid-cols-6 gap-2 col-span-3 max-w-none">
                <Card className="rounded-2xl col-span-4 md:col-span-4 xl:col-span-3 max-w-none min-h-52">
                    <div className="text-left w-full grid gap-1">
                        <h1 className="text-xl md:text-md text-neutral-400 flex gap-2 items-center font-normal">
                            Let’s Work Together {" "} <img src="/magic.svg" alt="hand-wave" className="w-6" />
                        </h1>
                        <h2 className="text-md md:text-3xl text-white font-bold ">
                            Get In Touch Now
                        </h2>
                    </div>
                </Card>
                <Card className="p-0 col-span-2 md:col-span-1 w-full" clickable link="https://buymeacoffee.com/belhoucinhicham">
                    <img src="buy-me-a-coffee.png" className="w-full h-full object-cover" alt="" />
                </Card>
                <Card className="p-0 col-span-2 md:col-span-1 relative w-full" clickable link="https://linkedin.com/in/hicham-bel-houcin">
                    <img
                        src="linkedin.png"
                        className="z-20 w-full h-full object-cover"
                        alt=""
                    />
                </Card>
                <Card className="rounded-2xl flex flex-row justify-around items-center col-span-4 md:col-span-2 xl:col-auto max-w-5xl" clickable link="/belhoucin.hicham.pdf">
                    <div className="text-center grid place-items-center gap-2">
                        <h1 className="text-xs md:text-sm text-neutral-400  font-normal">
                            MORE ABOUT ME
                        </h1>
                        <h2 className="text-base md:text-xl text-white font-bold ">
                            RESUME
                        </h2>
                        <LuDownload className="text-xl md:text-5xl text-text-500" />
                    </div>
                </Card>
            </div>
        </div>
    );
}

