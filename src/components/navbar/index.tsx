import React from "react";
import { twMerge } from "tailwind-merge";
import Button from "../button";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import { FaInstagramSquare } from "react-icons/fa";
import { GrInstagram } from "react-icons/gr";
import { IoMenu } from "react-icons/io5";
/*
    https://github.com/Hicham-BelHoucin/
    https://linkedin.com/in/hicham-bel-houcin
    https://instagram.com/hicham_belhoucin
    https://twitter.com/HichamBelhoucin
*/

const Links = [
    { title: "Home", href: "/" },
    { title: "About", href: "/about" },
    { title: "Career", href: "/career" },
    { title: "Contact", href: "/contact" },
    // { title: "My Services", href: "/my-services" },
    // { title: "Projects", href: "/projects" },
];

const Item = ({
    title,
    href,
    isActive,
}: {
    title: string;
    href: string;
    isActive: boolean;
}) => {
    return (
        <a
            className={twMerge(
                "h-10 bg-background-900 text-sm md:text-base flex  items-center justify-center text-text-600 rounded-full px-4 md:px-6",
                isActive && "text-white"
            )}
            href={href}
            key={title}
        >
            {title}
        </a>
    );
};

const Drawer = ({ isOpen, onClose, children }: {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}) => {
    return (
        <div
            className={`fixed top-0 right-0 z-50 h-screen p-4 overflow-y-auto transition-transform ${isOpen ? 'translate-x-0' : 'translate-x-full'
                } bg-white w-80 dark:bg-gray-800`}
            tabIndex={-1}
            aria-labelledby="drawer-right-label"
        >

            <button
                type="button"
                onClick={onClose}
                aria-controls="drawer-right-example"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
                <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                </svg>
                <span className="sr-only">Close menu</span>
            </button>
            <div className="mt-6">
                {children}
            </div>
        </div>
    );
};


const Navbar = () => {
    const currentPageURL = window.location.href.split("/").pop();
    const [isOpen, setIsOpen] = React.useState(false);

    console.log(currentPageURL);

    return (
        <nav className="flex gap-2 md:gap-8 p-4 z-50 h-16 rounded-full items-center text-text-600 justify-between">
            <h1 className="text-xl">
                Hicham <span className="text-primary-500 font-bold">Bel Houcin</span>
            </h1>
            <button className="xl:hidden" onClick={() => {
                setIsOpen(true);
            }}>
                <IoMenu size={32} />
            </button>
            <Drawer isOpen={isOpen} onClose={() => {
                setIsOpen(false);
            }}>
                <div className="flex flex-col gap-2 md:gap-4 py-4">
                    {Links.map((link) => (
                        <Item
                            key={link.title}
                            title={link.title}
                            href={link.href}
                            isActive={link.href.replace("/", "") === currentPageURL}
                        />
                    ))}
                </div>
            </Drawer>
            <div className="xl:flex gap-2 md:gap-4 hidden">
                {Links.map((link) => (
                    <Item
                        key={link.title}
                        title={link.title}
                        href={link.href}
                        isActive={link.href.replace("/", "") === currentPageURL}
                    />
                ))}
            </div>
        </nav>
    );
};

export default Navbar;
