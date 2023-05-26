import { useState, useEffect } from "react";
import Spinner from "../components/spinner";

export default function Project({ project }) {
  const [item, setItem] = useState();
  const [languages, setLanguages] = useState();

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/repos/Hicham-BelHoucin/${project.name}`
        );
        if (response.ok) {
          const data = await response.json();
          setItem(data);
        } else {
          throw new Error("Failed to fetch project data");
        }
      } catch (error) {
        console.error(error);
      }
    };

    const fetchProjectLanguages = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/repos/Hicham-BelHoucin/${project.name}/languages`
        );
        if (response.ok) {
          const data = await response.json();
          setLanguages(data);
        } else {
          throw new Error("Failed to fetch project data");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchProjectData();
    fetchProjectLanguages();
  });

  if (!item || !languages) return <Spinner />;
  return (
    <div className="project-card">
      <h1>{item?.name || ""}</h1>
      <p className="description">{item.description}</p>
      <div className="link-and-tech">
        <a href={item?.html_url || ""}>
          <img src="/link.svg" alt="" color="#fff" />
          View Code
        </a>
        <div>Tech used : {Object.keys(languages).join(" ")}</div>
      </div>
    </div>
  );
}
