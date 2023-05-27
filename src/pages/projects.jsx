import Layout from "./layout";
import Project from "../components/project";
import "./../styles/projects.css";
import projects from "./../data/data";

export default function Projects() {
  const classNames = [
    "bounce-in-top",
    "bounce-in-right",
    "roll-in-top",
    "slide-in-top",
    "slide-in-bck-left",
    "slide-in-bck-right",
  ];
  return (
    <Layout className="projects">
      <div className="projects-main">
        <div className="heading">
          <h1 className="slide-in-bck-left">Projects</h1>
          <h3 className="slide-in-bck-right">Things I’ve built so far</h3>
        </div>
        <div className="projects-contianer">
          {projects.map((item, i) => {
            return (
              <Project
                key={i}
                item={item}
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
