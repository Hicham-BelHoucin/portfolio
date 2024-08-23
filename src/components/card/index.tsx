import { BiArrowFromRight } from "react-icons/bi";
import { twMerge } from "tailwind-merge";
import { FaLocationArrow } from "react-icons/fa6";
import { IoMdArrowBack } from "react-icons/io";
import { useContext } from "react";

const Card = ({
    className,
    children,
    link,
    clickable,
}: {
    children: React.ReactNode;
    className?: string;
    link?: string
    clickable?: boolean;
}) => {



    return (
        <a href={clickable ? link : undefined} className={twMerge(
            "flex flex-col items-center relative justify-center bg-background-900  p-4 text-text-100 max-w-lg rounded-xl overflow-hidden w-full h-full",
            className
        )}>

            {!!link && !clickable && (
                <div className="top-2 right-2 absolute transform rotate-[145deg] hover:bg-background-400 hover:scale-110 w-10 h-10 flex items-center justify-center rounded-full transition-all">
                    <a href={link}>
                        <IoMdArrowBack size={20} />
                    </a>
                </div>
            )}

            {children}
        </a>
    );
};

export default Card;