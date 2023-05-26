import Layout from "./layout";
import "./../styles/tech-stack.css";

export default function TechStack() {
  const techStack = [
    "react",
    "javascript",
    "typescript",
    "css",
    "html",
    localStorage.getItem("mode") === "light" ? "github" : "github-white",
    "git",
    "tailwind",
    "vscode",
    "c",
    "c++",
    "docker",
  ];
  return (
    <Layout className="tech-stack">
      <div className="main">
        <div className="heading">
          <h1>My Tech Stack</h1>
          <h3> Technologies I've been working with recently</h3>
        </div>
        <div className="tech-stack-icons">
          {techStack.map((item) => {
            return <img src={`/${item}.png`} alt="" width={70} />;
          })}
        </div>
      </div>
    </Layout>
  );
}
