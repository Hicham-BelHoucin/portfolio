import { twMerge } from "tailwind-merge";
import React from "react";
import Card from "../components/card";
import { motion } from "framer-motion";
import data from "./data.json";
import { getGithubRepos } from "../tools/github";
import { FaStar } from "react-icons/fa";
import { RiGitForkFill } from "react-icons/ri";
import Spinner from "../components/spinner";

const skills = data

const experience = [
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
        title: "inception",
        type: "Project",
        startDate: "Jan 2023",
        endDate: "Feb 2023",
        location: "N/A",
        company: "Personal Project",
        description: "Explored system administration using Docker by virtualizing Docker images in a personal virtual machine."
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
];

interface Repository {
    name: string;
    html_url: string;
    languages_url: string;
    description: string;
    stargazers_count: number;
    forks_count: number;
}

function toTitleCase(str: string) {
    return str
        .toLowerCase() // Convert the string to lowercase
        .replace(/[_-]/g, ' ') // Replace underscores and hyphens with spaces
        .replace(/\b\w/g, char => char.toUpperCase()); // Capitalize the first letter of each word
}

export default function Experience() {
    const ref = React.useRef<HTMLDivElement>(null);
    const [repos, setRepos] = React.useState<Repository[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        (async () => {
            try {
                const data = await getGithubRepos();
                setRepos(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    return (
        <>
            <div className="grid md:grid-cols-2  xl:grid-cols-3 md:p-4 place-content-center gap-4">
                {
                    loading ? <div className="flex items-center justify-center h-[75vh] md:col-span-2 xl:col-span-3">
                        <Spinner />
                    </div> : (

                        repos && repos.length ? repos.map((exp, index) => {
                            if (exp.name === "Hicham-BelHoucin" || exp.description === null) {
                                return null
                            }
                            return (
                                <React.Fragment key={index}>
                                    <Card className="bg-background-900 max-w-none text-left min-h-72 justify-between" key={exp.name} link={exp.html_url} clickable >
                                        <img src="/bg-image.png" className="z-10 absolute top-0 left-0 w-full" alt="all1" />

                                        <div className="text-left w-full h-full flex items-end z-30">
                                            <div>

                                                <h1 className=" text-text-200 font-bold">{toTitleCase(exp.name)}</h1>
                                                <p className=" text-sm max-h-[60px] overflow-auto scrollbar-hide text-text-400 font-semibold">{exp.description}</p>
                                            </div>

                                            <div className="z-30">
                                                <div className="flex p-2 items-center gap-2">
                                                    <FaStar />
                                                    <h1>{exp.stargazers_count}</h1>
                                                </div>
                                                <div className="flex p-2 items-center gap-2">
                                                    <RiGitForkFill />
                                                    <h1>{exp.forks_count}</h1>
                                                </div>
                                            </div>
                                        </div>
                                        <img
                                            src={`/${exp.name}.png`}
                                            alt="Profile"
                                            className="z-20 spinning-image absolute -top-[70%] -right-[50%] md:-right-[40%] max-w-xs object-cover"
                                        />
                                    </Card>
                                    {index === Math.floor((experience.length - 1) / 2) && (
                                        <motion.div
                                            ref={ref}
                                            className="flex flex-row flex-wrap bg-background-900 gap-2 md:gap-4 items-center justify-center rounded-md p-4"
                                            style={{
                                                overflow: "hidden", // Prevent elements from overflowing the container
                                                position: "relative" // Ensure drag constraints are relative to this container
                                            }}
                                            key={index}
                                        >
                                            {skills.map((skill, index) => (
                                                <motion.div
                                                    // drag
                                                    dragConstraints={ref}
                                                    // dragElastic={0.5}
                                                    dragMomentum={true}
                                                    key={index}
                                                    // dragTransition={{ bounceStiffness: 600, bounceDamping: 25 }}
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    style={{
                                                        position: "relative", // Ensure drag doesn't affect layout flow
                                                        zIndex: index, // Stack order to avoid overlap
                                                    }}
                                                >
                                                    <img src={skill.icon} alt={skill.label} className={twMerge("w-10")} />
                                                </motion.div>
                                            ))}
                                        </motion.div>
                                    )}
                                </React.Fragment>
                            )
                        }) : <div className="m-auto flex flex-col items-center h-[75vh] justify-center gap-2 md:col-span-2 xl:col-span-3">
                            <img src="no-results.png" alt="" className="w-28 md:w-52" />
                            <h1 className="text-text-200 font-bold">No Repositories Found</h1>
                        </div>
                    )
                }
            </div>
        </>
    )
}
