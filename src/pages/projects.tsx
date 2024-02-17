import { useEffect, useState } from "react";
import Heading from "../components/heading";
import { Code } from "lucide-react";
import Spinner from "../components/spinner";

interface IProject {
    name: string;
    description: string;
    html_url: string;
    languages: string;
}

const RandomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

const Project = ({ name, description, html_url, languages }: IProject) => {
    return (
        <div className="max-w-xs flex flex-col mx-auto bg-transparent rounded-2xl overflow-hidden shadow-md">
            <img className="w-full h-48 object-cover" src={`/Rectangle ${RandomInt(20, 27)}.png`} alt={"title"} />
            <div className="p-6 text-gray-700 bg-white flex flex-col flex-grow item-center justify-center gap-2">
                <h2 className="font-bold text-xl mb-2">{name}</h2>
                <p className="text-gray-600 text-xs">{description}</p>
                <p className="text-gray-600 text-xs"><span className="font-bold text-sm text-gray-700">Tech used : </span>{languages}</p>
                <a className="text-gray-600 text-xs flex items-center gap-2" href={html_url}><Code className=" text-primary-500 " /> View Code</a>
            </div>
        </div>
    );
};

export default function Projects() {
    const [projects, setProjects] = useState<IProject[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    // console.log(process.env.REACT_APP_GITHUB_ACCESS_TOKEN);
    useEffect(() => {
        const fetchProjects = async () => {
            const getProjectsName = async () => {
                try {
                    const accessToken = process.env.REACT_APP_GITHUB_ACCESS_TOKEN;
                    const headers = {
                        Authorization: `Bearer ${accessToken}`,
                    };
                    const response = await fetch(
                        "https://api.github.com/users/Hicham-BelHoucin/repos",
                        { headers }
                    );
                    if (response.ok) {
                        const data = await response.json();
                        if (!data) return []
                        return data.map((item: any) => item.name);
                    } else {
                        throw new Error("Failed to fetch projects");
                    }
                } catch (error) {
                    console.error(error);
                }
            };

            const fetchProjectData = async (project: string) => {
                try {
                    const accessToken = process.env.REACT_APP_GITHUB_ACCESS_TOKEN;
                    const headers = {
                        Authorization: `Bearer ${accessToken}`,
                    };
                    const response = await fetch(
                        `https://api.github.com/repos/Hicham-BelHoucin/${project}`,
                        { headers }
                    );
                    if (response.ok) {
                        const data = await response.json();
                        // setItem(data);
                        return data;
                    } else {
                        throw new Error("Failed to fetch project data");
                    }
                } catch (error) {
                    console.error(error);
                }
            };

            const fetchProjectLanguages = async (project: string) => {
                try {
                    const accessToken = process.env.REACT_APP_GITHUB_ACCESS_TOKEN;
                    const headers = {
                        Authorization: `Bearer ${accessToken}`,
                    };
                    const response = await fetch(
                        `https://api.github.com/repos/Hicham-BelHoucin/${project}/languages`,
                        { headers }
                    );
                    if (response.ok) {
                        const data = await response.json();
                        return data;
                    } else {
                        throw new Error("Failed to fetch project data");
                    }
                } catch (error) {
                    console.error(error);
                }
            };

            const getAll = async () => {
                const projectsName = await getProjectsName();

                if (!projectsName) {
                    setLoading(false);
                    return ;
                }
                projectsName.map(async (item: string, i: number) => {
                    if (item === "Hicham-BelHoucin") return;
                    const info = await fetchProjectData(item);
                    const languages = await fetchProjectLanguages(item);

                    setProjects((prev) => {
                        const project = {
                            name: info.name,
                            description: info.description,
                            html_url: info.html_url,
                            languages: Object.keys(languages).join(" "),
                        };
                        return [...prev, project];
                    });
                    if (i === projectsName.length - 1) setLoading(false);
                });
            };

            getAll();
        };
        fetchProjects();
    }, []);

    return (
        <div className="flex flex-col container items-center gap-8 justify-center text-white p-8 mx-auto">
            <Heading title="Projects" />
            <h3 className="slide-in-bck-right">Things I’ve built so far</h3>
            <div>
                {loading ? (
                    <div
                        className="w-full h-[85%] flex items-center justify-center"
                    >
                        <Spinner />
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-4 ">
                        {projects && projects.map((item, i) => {
                            return (
                                <Project
                                    key={i}
                                    {...item}
                                />
                            );
                        })}
                    </div>
                )}

            </div>
        </div>
    )
}
