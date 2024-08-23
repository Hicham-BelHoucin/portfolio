import React from "react";

import { RiGitForkLine, RiGitRepositoryFill } from "react-icons/ri";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import { GrInstagram } from "react-icons/gr";
import { twMerge } from "tailwind-merge";
import { BiArrowToRight } from "react-icons/bi";
import { FaSpotify } from "react-icons/fa6";
import { LuDownload } from "react-icons/lu";
import { RiGitForkFill } from "react-icons/ri";
import { FaStar } from "react-icons/fa";
import HeatMap from '@uiw/react-heat-map';
import { IoMdPerson } from "react-icons/io";
import { RiGroupFill } from "react-icons/ri";
import { FaLocationArrow } from "react-icons/fa6";
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
        <Card className="bg-background-800 text-left min-h-72 justify-between" link={item.html_url}>
            <div className="grid gap-2 py-2">
                <h1 className="text-xl">{toTitleCase(item.name)}</h1>
                <h2 className=" text-text-500 max-h-[150px] overflow-auto">{item.description}</h2>
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
            </div>
        </Card>
    )
}

