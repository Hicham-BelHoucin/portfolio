import { twMerge } from "tailwind-merge";
import { IoMdArrowBack } from "react-icons/io";
import React from "react";

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

    const ref = React.useRef<HTMLAnchorElement>(null);


    return (
        <div className={twMerge(
            "flex flex-col items-center relative justify-center bg-background-900  p-4 text-text-100 max-w-lg rounded-xl overflow-hidden w-full h-full",
            !clickable ? "cursor-default" : "cursor-pointer",
            className
        )} onClick={() => {
            clickable &&
                ref.current?.click()
        }}>
            <a href={clickable ? link : undefined} ref={ref} className="hidden"></a>
            {!!link && !clickable && (
                <button onClick={() => {
                    ref.current?.click()
                }} className="top-2 right-2 absolute transform rotate-[145deg] hover:bg-background-400 hover:scale-110 w-10 h-10 flex items-center justify-center rounded-full transition-all">
                    <IoMdArrowBack size={20} />
                </button>
            )}

            {children}
        </div>
    );
};

export default Card;