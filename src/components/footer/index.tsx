import { FaGithub, FaInstagramSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import { GrInstagram } from "react-icons/gr";

export default function Footer() {
    return (
        <section className="flex flex-col container mt-8 p-4 mx-auto text-left bg-[#0C0C0D] items-center justify-center gap-8 text-white ">
            <div className="w-full flex flex-col justify-center items-center">
                <div className="w-[90%] h-[90px] bg-neutral-900 rounded-[100px] flex justify-between items-center p-4">
                    <div className="text-neutral-500 text-2xl font-normal font-['Nunito']">
                        Follow me
                    </div>
                    <div className="flex items-center gap-4">
                        <a href="https://github.com/Hicham-BelHoucin/">
                            <FaGithub className="h-6 w-6 text-[#8A72C5]" />
                        </a>
                        <a href="https://linkedin.com/in/hicham-bel-houcin">
                            <FaLinkedin className="h-6 w-6 text-[#8A72C5]" />
                        </a>
                        <a href="mailto:belhoucin.hicham@gmail.com">
                            <BiLogoGmail className="h-6 w-6 text-[#8A72C5]" />
                        </a>
                        <a href="https://instagram.com/hicham_belhoucin">
                            <GrInstagram className="h-6 w-6 text-[#8A72C5]" />
                        </a>
                    </div>
                </div>
                <div className="p-4 text-white text-base font-light font-['Nunito'] leading-7">
                    Hicham Bel Houcin © 2024
                </div>
            </div>
        </section>
    );
}
