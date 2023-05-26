import Layout from "./layout";
import Project from "../components/project";
import "./../styles/projects.css";
import projects from "./../data/data";

export default function Projects() {
  return (
    <Layout className="projects">
      <div className="projects-main">
        <div className="heading">
          <h1>Projects</h1>
          <h3>Things I’ve built so far</h3>
        </div>
        <div className="projects-contianer">
          {projects.map((item, i) => {
            return <Project key={i} item={item} />;
          })}
        </div>
      </div>
    </Layout>
  );
}
