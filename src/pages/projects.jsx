import Layout from "./layout";
import { useState, useEffect } from "react";
import Spinner from "../components/spinner";
import Project from "../components/project";
import "./../styles/projects.css";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const accessToken = "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";
        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };
        const response = await fetch(
          "https://api.github.com/users/Hicham-BelHoucin/repos",
          { headers }
        );
        if (response.ok) {
          const data = await response.json();
          setProjects(data);
        } else {
          throw new Error("Failed to fetch projects");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchProjects();
  }, []);
  if (!projects) return <Spinner />;
  return (
    <Layout className="projects">
      <div className="projects-main">
        <div className="heading">
          <h1>Projects</h1>
          <h3>Things I’ve built so far</h3>
        </div>
        <div className="projects-contianer">
          {projects.map((item, i) => {
            if (item.name === "Hicham-BelHoucin") return <></>;
            console.log(i);
            return <Project key={i} project={item} />;
          })}
        </div>
      </div>
    </Layout>
  );
}
