import { twMerge } from "tailwind-merge";

const Card = ({
    className,
    children,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div
            className={twMerge(
                "flex flex-col items-center justify-center bg-background-900  p-4 text-text-100 max-w-md rounded-xl overflow-hidden",
                className
            )}
        >
            {children}
        </div>
    );
};

export default Card;