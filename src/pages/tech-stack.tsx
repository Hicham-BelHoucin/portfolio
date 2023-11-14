import { twMerge } from "tailwind-merge";
import Heading from "../components/heading";

export default function TechStack() {
    const techStack = [
        { name: 'react', percentage: 80 },
        { name: 'node', percentage: 80 },
        { name: 'postgresql', percentage: 30 },
        { name: 'nest', percentage: 50 },
        { name: 'javascript', percentage: 80 },
        { name: 'Typescript', percentage: 80 },
        { name: 'css', percentage: 80 },
        { name: 'html', percentage: 80 },
        { name: 'nginx', percentage: 30 },
        { name: 'mariadb', percentage: 30 },
        { name: 'github', percentage: 80 },
        { name: 'git', percentage: 80 },
        { name: 'tailwind', percentage: 80 },
        { name: 'vscode', percentage: 80 },
        { name: 'c', percentage: 80 },
        { name: 'prisma', percentage: 50 },
        { name: 'sass', percentage: 30 },
        { name: 'shell', percentage: 50 },
        { name: 'c++', percentage: 80 },
        { name: 'docker', percentage: 50 },
        { name: 'mui', percentage: 30 }
    ]

    return (
        <div className="flex flex-col container items-center gap-8 justify-center text-white p-8 m-auto">
            <Heading title="My Skills" />
            <h2 className="text-white md:text-2xl font-semibold w-full text-left">
                Technologies I've been working with recently
            </h2>
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
                {techStack.map((tech, index) => {
                    const id = tech.percentage === 80 ? 1 : tech.percentage === 50 ? 2 : 3
                    return (
                        <div className={twMerge(id !== 1 && 'hidden md:block')} key={index}>
                            <div className="flex items-center gap-4 p-2">
                                <div className="w-10 h-10">
                                    <img
                                        src={`/${tech.name}.png`}
                                        alt={tech.name}
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                <h3 className="text-white font-semibold">
                                    {tech.name.charAt(0).toUpperCase() + tech.name.slice(1)}
                                </h3>
                            </div>
                            <div className="relative mb-5 h-4 rounded-full bg-gray-200">
                                <div
                                    className={twMerge(`h-4 customProgressBar${id}  rounded-full bg-red-500 .progress-bar min-w-[100px]`,)}
                                ></div>
                                <span className="absolute inset-0 flex items-center justify-center text-sm font-medium text-black">
                                    {tech.percentage}%
                                </span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}
