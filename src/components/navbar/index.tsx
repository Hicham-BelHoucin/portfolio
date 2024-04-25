import React from "react";
import { twMerge } from "tailwind-merge";
import Button from "../button";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import { FaInstagramSquare } from "react-icons/fa";
import { GrInstagram } from "react-icons/gr";

/*
    https://github.com/Hicham-BelHoucin/
    https://linkedin.com/in/hicham-bel-houcin
    https://instagram.com/hicham_belhoucin
    https://twitter.com/HichamBelhoucin
*/

const Links = [
    { title: "Home", href: "/" },
    { title: "Education", href: "/education" },
    { title: "Experience", href: "/experience" },
    // { title: "My Services", href: "/my-services" },
    // { title: "Projects", href: "/projects" },
    // { title: "Contact", href: "/contact" },
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
                "h-10 md:h-16 text-sm md:text-base flex  items-center justify-center text-[#8A72C5] ",
                isActive && "text-white"
            )}
            href={href}
            key={title}
        >
            {title}
        </a>
    );
};

const Navbar = () => {
    const currentPageURL = window.location.href.split("/").pop();

    console.log(currentPageURL);

    return (
        <nav className="bg-[#131315] flex gap-2 md:gap-8 px-2 md:px-4 h-16 min-w-[200px] rounded-full absolute top-4 left-1/2 transform -translate-x-1/2 items-center z-10">
            {Links.map((link) => (
                <Item
                    key={link.title}
                    title={link.title}
                    href={link.href}
                    isActive={link.href.replace("/", "") === currentPageURL}
                />
            ))}
            <a href="https://github.com/Hicham-BelHoucin/"><FaGithub className="h-4 w-4 md:h-6 md:w-6 text-[#8A72C5]" /></a>
            <a href="https://linkedin.com/in/hicham-bel-houcin"><FaLinkedin className="h-4 w-4 md:h-6 md:w-6 text-[#8A72C5]" /></a>
            <a href="mailto:belhoucin.hicham@gmail.com"><BiLogoGmail className="h-4 w-4 md:h-6 md:w-6 text-[#8A72C5]" /></a>
            <a href="https://instagram.com/hicham_belhoucin">
                <GrInstagram className="h-4 w-4 md:h-6 md:w-6 text-[#8A72C5]" />
            </a>
        </nav>
    );
};

export default Navbar;
