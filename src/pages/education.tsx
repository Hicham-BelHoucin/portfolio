import Button from "../components/button";
import Heading from "../components/heading";

const education = [
    {
        title: "Literature And Humanities",
        type: "Certificate in literature and humanities",
        startDate: "Nov 2018",
        endDate: "Dec 2021"
    },
    {
        title: "Software Engineering",
        type: "Certificate in software engineering",
        startDate: "Nov 2021",
        endDate: "Present"
    }
]

const Card = ({
    title,
    type,
    startDate,
    endDate
}: {
    title: string;
    type: string;
    startDate: string;
    endDate: string;
}) => {
    return (
        <div className="w-full h-full relative flex flex-col-reverse md:flex-row-reverse rounded-[80px] border-2 border-neutral-800  justify-center items-center px-10 md:px-20 py-4">
            <div className="w-full flex flex-col justify-start items-start gap-2.5">
                <div className="flex flex-col justify-start items-start gap-4">
                    <div className="text-white text-xl md:text-2xl font-semibold font-raleway">
                        {title}
                    </div>
                    <div className="text-violet-400 text-base md:text-xl font-normal font-raleway">
                        {type}
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="text-neutral-500 text-sm md:text-base font-light font-nunito">
                        {startDate}
                    </div>
                    <div className="w-1.5 h-1.5 bg-emerald-300 rounded-full" />
                    <div className="text-neutral-500 text-sm md:text-base font-light font-nunito">
                        {endDate}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function Education() {
    return (
        <div className="flex flex-col container mt-24 items-center gap-8 justify-center text-white p-8 mx-auto">
            <div className="w-full flex flex-col gap-8 items-center justify-center">
                {
                    education.map((item, index) => (
                        <Card
                            key={index}
                            title={item.title}
                            type={item.type}
                            startDate={item.startDate}
                            endDate={item.endDate}
                        />
                    ))
                }
            </div>
        </div>
    );
}
