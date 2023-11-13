import React from "react";
import { twMerge } from "tailwind-merge";
import Button from "../button";
import { Menu, X } from "lucide-react";

const Links = [
    { title: "Home", href: "/" },
    { title: "About", href: "/about" },
    { title: "Tech Stack", href: "/tech-stack" },
    { title: "My Services", href: "/my-services" },
    { title: "Projects", href: "/projects" },
    { title: "Contact", href: "/contact" },
];

const Navbar = () => {
    const currentPageURL = window.location.href.split("/").pop();

    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    return (
        <nav className=" bg-[#170550] h-16">
            <div className="container md:max-w-5xl mx-auto md:px-8">
                <div className="relative flex items-center justify-between md:justify-around h-16 px-4  ">

                    <div className="text-white font-bold text-sm xl:text-base">
                        Hicham <span className="text-primary-500">Bel Houcin</span>
                    </div>

                    <Button
                        className="md:hidden text-white"
                        variant="text"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X /> : <Menu />}
                    </Button>

                    <div className="w-full md:flex-1 md:flex md:items-center md:justify-center items-stretch justify-start hidden">
                        <div className="hidden sm:block">
                            <div className="flex space-x-4">
                                {Links.map((link) => (
                                    <a
                                        key={link.title}
                                        href={link.href}
                                        className={twMerge(
                                            `text-white px-3 py-2 rounded-md text-sm font-medium`,
                                            link.href === "/" + currentPageURL &&
                                            "relative text-primary-500 before:absolute before:w-2 before:h-2 before:bottom-0 before:left-1/2 before:transform before:-translate-x-1  before:rounded-full before:bg-primary-500 before:text-primary-500 before:content-['']"
                                        )}
                                    >
                                        {link.title}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    <Button
                        className="hidden text-sm md:text-base md:block text-white"
                        variant="primary"
                        onClick={() => {
                            window.location.href = "/contact";
                        }}
                    >
                        Contact me
                    </Button>
                </div>
                {isMenuOpen && (
                    <div className="flex-1 absolute top-10 left-0 w-full m-auto md:hidden flex flex-col align-center justify-end gap-2 p-4 z-10 bg-[#170550]">
                        {Links.map((link) => (
                            <div className="w-full"
                                key={link.title}
                            >
                                <a
                                    href={link.href}
                                    className={twMerge(
                                        `text-white px-3 py-2 rounded-md text-sm font-medium w-fit `,
                                        link.href === "/" + currentPageURL &&
                                        "text-primary-500"

                                    )}
                                >
                                    {link.title}
                                </a>
                                <div className="w-[90%] h-[1px] bg-gray-600 m-auto"></div>
                            </div>
                        ))}
                        <Button
                            variant="primary"
                            onClick={() => {
                                window.location.href = "/contact";
                            }}
                            className="max-w-[200px] m-auto"
                        >
                            Contact me
                        </Button>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
