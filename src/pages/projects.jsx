import Layout from "./layout";
import Project from "../components/project";
import Spinner from "../components/spinner";
import "./../styles/projects.css";

import { useEffect, useState } from "react";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchProjects = async () => {
      const getProjectsName = async () => {
        try {
          const accessToken = process.env.REACT_APP_GITHUB_ACCESS_TOKEN;
          const headers = {
            Authorization: `Bearer ${accessToken}`,
          };
          const response = await fetch(
            "https://api.github.com/users/Hicham-BelHoucin/repos",
            { headers }
          );
          if (response.ok) {
            const data = await response.json();
            return data.map((item) => item.name);
          } else {
            throw new Error("Failed to fetch projects");
          }
        } catch (error) {
          console.error(error);
        }
      };

      const fetchProjectData = async (project) => {
        try {
          const accessToken = process.env.REACT_APP_GITHUB_ACCESS_TOKEN;
          const headers = {
            Authorization: `Bearer ${accessToken}`,
          };
          const response = await fetch(
            `https://api.github.com/repos/Hicham-BelHoucin/${project}`,
            { headers }
          );
          if (response.ok) {
            const data = await response.json();
            // setItem(data);
            return data;
          } else {
            throw new Error("Failed to fetch project data");
          }
        } catch (error) {
          console.error(error);
        }
      };

      const fetchProjectLanguages = async (project) => {
        try {
          const accessToken = process.env.REACT_APP_GITHUB_ACCESS_TOKEN;
          const headers = {
            Authorization: `Bearer ${accessToken}`,
          };
          const response = await fetch(
            `https://api.github.com/repos/Hicham-BelHoucin/${project}/languages`,
            { headers }
          );
          if (response.ok) {
            const data = await response.json();
            return data;
          } else {
            throw new Error("Failed to fetch project data");
          }
        } catch (error) {
          console.error(error);
        }
      };

      const getAll = async () => {
        const projectsName = await getProjectsName();

        projectsName.map(async (item, i) => {
          if (item === "Hicham-BelHoucin") return;
          const info = await fetchProjectData(item);
          const languages = await fetchProjectLanguages(item);

          setProjects((prev) => {
            const project = {
              name: info.name,
              description: info.description,
              html_url: info.html_url,
              languages: Object.keys(languages).join(" "),
            };
            return [...prev, project];
          });
          if (i === projectsName.length - 1) setLoading(false);
        });
      };

      getAll();
    };
    fetchProjects();
  }, []);

  const classNames = [
    "slide-in-top",
    "slide-in-bck-left",
    "slide-in-bck-right",
  ];

  return (
    <Layout className="projects">
      {loading ? (
        <div
          style={{
            width: "100%",
            height: "80vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Spinner />
        </div>
      ) : (
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
                      Math.floor(Math.random() * (classNames.length - 1))
                    ]
                  }
                />
              );
            })}
          </div>
        </div>
      )}
    </Layout>
  );
}
