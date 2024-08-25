import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import { GrInstagram } from "react-icons/gr";
import { LuDownload } from "react-icons/lu";
import Card from "../card";
import user from "../../pages/user.json";
import HeatMap from "@uiw/react-heat-map";
import Project from "../project";
import React, { useState } from "react";
import { getGitHubContributionData } from "../../tools/github";

const Demo = ({
    value,
}: {
    value: {
        date: string;
        count: number;
    }[];
}) => {
    return (
        <div className="w-full">
            <HeatMap
                className="w-full"
                value={value}
                weekLabels={["", "Mon", "", "Wed", "", "Fri", ""]}
                style={{ color: "#fff" }}
                startDate={new Date(value[0].date)}
                panelColors={{
                    0: "#f0e7fe",
                    2: "#e0cffc",
                    4: "#c19efa",
                    10: "#a26ef7",
                    20: "#843df5",
                    30: "#510ac2",
                }}
            />
        </div>
    );
};

export default function CustomHeatMap() {
    const [data, setData] = useState<
        {
            date: string;
            count: number;
        }[]
    >([]);

    React.useEffect(() => {
        (async () => {
            try {
                const data = await getGitHubContributionData();
                setData(data);
            } catch (error) {
                console.error(error);
            }
        })();
    }, []);

    return (
        <div className="w-full md:col-span-4">
            <Card className="md:max-w-none rounded-2xl w-full col-span-2">
                <h1 className="text-xl md:text-2xl text-white font-bold text-center">
                    {data.length && data.reduce((acc, curr) => acc + curr.count, 0)} contributions in the
                    last year
                </h1>
                {data.length && <Demo value={data} />}
            </Card>
        </div>
    );
}
