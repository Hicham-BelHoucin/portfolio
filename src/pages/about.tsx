import Button from "../components/button";
import Heading from "../components/heading";

export default function About() {
    return (
        <div className="flex flex-col container items-center gap-8 justify-center text-white p-8 mx-auto">
            <Heading title="About Me" />
            <div className="w-full p-8 flex flex-col md:flex-row gap-8">
                <img
                    alt=""
                    src="/image.jfif"
                    className="w-full md:w-[50%] max-w-xl object-contain rounded-xl"
                />
                <div className="flex flex-col items-center justify-center gap-4 text-center">
                    <div className="font-bold text-2xl">Software Engineer</div>
                    <p className=" max-h-64 overflow-scroll scrollbar-hide">
                        I'm a passionate software engineer based in Morocco, specializing in
                        web development. With a solid foundation in React, Node.js, and a
                        proficiency in JavaScript, TypeScript, HTML, and CSS, I create
                        dynamic user experiences. My studies in Software Engineering at 1337
                        Coding School equipped me with a versatile skill set, including
                        expertise in Git, C, C++, and database management with PostgreSQL
                        and Prisma. I'm adept at containerization using Docker and bring
                        efficiency to development with tools like Visual Studio Code. Let's
                        build something innovative!
                    </p>
                    <Button>
                        <a download="resume.pdf" href="/my-resume.pdf">
                            Download Cv
                        </a>
                    </Button>
                </div>
            </div>
        </div>
    );
}
