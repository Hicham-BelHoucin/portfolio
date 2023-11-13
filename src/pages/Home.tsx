import Button from "./../components/button";
import { Instagram, Linkedin, Twitter, Github } from "lucide-react";

export default function Home() {
    return (
        <div className="flex container bg-[#31065A] items-center justify-center gap-4 h-full text-white px-8 mx-auto flex-wrap md:flex-nowrap py-8">
            <div className="flex flex-col items-center justify-center gap-4 text-center">
                <h1 className="text-white text-xl md:text-6xl font-semibold">
                    Hi👋, I'm <span className=" text-primary-500 font-bold">Hicham</span>
                </h1>

                <p className="text-lg md:text-3xl font-normal">
                    I'm a{" "}
                    <span className="text-primary-500 text-4xl font-semibold">
                        Software Engineer
                    </span>{" "}
                    based in Morocco, I have a passion for web development and creating
                    intuitive, dynamic user experiences.
                </p>
                <div className="hidden md:flex gap-4">
                    <a href="https://instagram.com/hicham_belhoucin">
                        <Instagram size={32} />
                    </a>
                    <a href="https://linkedin.com/in/hicham-bel-houcin">
                        <Linkedin size={32} />
                    </a>
                    <a href="https://twitter.com/HichamBelhoucin">
                        <Twitter size={32} />
                    </a>
                    <a href="https://github.com/Hicham-BelHoucin/">
                        <Github size={32} />
                    </a>
                </div>
                <div className="hidden md:block">
                    <Button>
                        <a download="resume.pdf" href="/my-resume.pdf">
                            Download Cv
                        </a>
                    </Button>
                </div>
            </div>
            <img
                src="/Banner Image.png"
                alt="banner"
                className="w-full md:w-[70%] md:h-[70%] object-contain"
            />
            <div className="md:hidden flex gap-4 w-full justify-center">
                <a href="https://instagram.com/hicham_belhoucin">
                    <Instagram size={32} />
                </a>
                <a href="https://linkedin.com/in/hicham-bel-houcin">
                    <Linkedin size={32} />
                </a>
                <a href="https://twitter.com/HichamBelhoucin">
                    <Twitter size={32} />
                </a>
                <a href="https://github.com/Hicham-BelHoucin/">
                    <Github size={32} />
                </a>
            </div>
            <div className="md:hidden block">
                <Button>
                    <a download="resume.pdf" href="/my-resume.pdf">
                        Download Cv
                    </a>
                </Button>
            </div>
        </div>
    );
}
