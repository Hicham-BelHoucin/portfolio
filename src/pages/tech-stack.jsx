import Layout from "./layout";
import "./../styles/tech-stack.css";

export default function TechStack() {
  const classNames = [
    "bounce-in-top",
    "bounce-in-right",
    "roll-in-top",
    "slide-in-top",
    "slide-in-bck-left",
    "slide-in-bck-right",
  ];
  const techStack = [
    "react",
    "node",
    "postgresql",
    "nest",
    "javascript",
    "typescript",
    "css",
    "html",
    "nginx",
    "mariadb",
    "github",
    "git",
    "tailwind",
    "vscode",
    "c",
    "sass",
    "c++",
    "docker",
  ];
  return (
    <Layout className="tech-stack">
      <div className="main">
        <div className="heading">
          <h1 className="slide-in-bck-left">My Tech Stack</h1>
          <h3 className="slide-in-bck-right">
            Technologies I've been working with recently
          </h3>
        </div>
        <div className="tech-stack-icons">
          {techStack.map((item, i) => {
            // Math.random() * max + min
            return (
              <img
                src={`/${item}.png`}
                key={i}
                alt=""
                width={70}
                className={
                  classNames[
                    Math.floor(Math.random() * (classNames.length - 1) + 0)
                  ]
                }
              />
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
