
import { RiGitForkFill } from "react-icons/ri";
import { FaStar } from "react-icons/fa";
import Card from "../card";


const toTitleCase = (str: string) => {
    return str.replace(
        /\w\S*/g,
        function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
};

export default function Project({ item }: {
    item: {
        name: string;
        description: string;
        html_url: string;
        stargazers_count: number; forks_count: number;
        languages_url: string;
        language: string
    }
}) {




    return (
        <Card className="bg-background-800 text-left min-h-72 justify-between" link={item.html_url} clickable >
            <img src="/project-bg.png" className="z-10 absolute top-0 left-0 w-full" alt="all1" />

            <div className="text-left w-full h-full flex items-end z-30">
                <div>

                    <h1 className=" text-text-200 font-bold">{toTitleCase(item.name)}</h1>
                    <p className=" text-sm max-h-[60px] overflow-auto scrollbar-hide text-text-400 font-semibold">{item.description}</p>
                </div>

                <div className="z-30">
                    <div className="flex p-2 items-center gap-2">
                        <FaStar />
                        <h1>{item.stargazers_count}</h1>
                    </div>
                    <div className="flex p-2 items-center gap-2">
                        <RiGitForkFill />
                        <h1>{item.forks_count}</h1>
                    </div>
                </div>
            </div>
            <img
                src={`/${item.name}.png`}
                alt="Profile"
                className="z-20 spinning-image absolute -top-[70%] -right-[50%] md:-right-[40%] max-w-xs object-cover"
            />
        </Card>
    )
}
/* <div className="grid gap-2 py-2">
                <h1 className="text-xl">{toTitleCase(item.name)}</h1>
                <h2 className=" text-text-500 max-h-[150px] overflow-auto scrollbar-hide">{item.description}</h2>
            </div>
            <div className="flex gap-2 justify-between w-full">
                <div className="grid grid-flow-col gap-2">
                    <img src={`/${item.language}.png`} alt="" className="w-10 object-cover rounded-md" />
                </div>
                <div className="flex">
                    <div className="flex p-2 items-center gap-2">
                        <FaStar />
                        <h1>{item.stargazers_count}</h1>
                    </div>
                    <div className="flex p-2 items-center gap-2">
                        <RiGitForkFill />
                        <h1>{item.forks_count}</h1>
                    </div>
                </div>
            </div> */
