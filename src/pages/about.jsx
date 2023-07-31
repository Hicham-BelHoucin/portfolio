import EducationCard from "../components/EducationCard";
import Layout from "./layout";

export default function About() {
  const education = [
    {
      title: "Software Engineering",
      place: "1337 Conding School - 42 network",
      date: "2021 - present",
    },
    {
      title: "Baccalaureate in Literature and Human Sciences",
      place: "Ibn Lhaitam high School",
      date: "2021",
    },
  ];

  return (
    <Layout className="about">
      <div className="about-main">
        <div className="about-heading">
          <h1 className="slide-in-bck-left">About</h1>
          <p className="about-pragraph slide-in-bck-right">
            I'm Hicham Bel Houcin, a 20-year-old software developer with a
            passion for continuous learning. I am enthusiastic, self-motivated,
            reliable, responsible, and hardworking. I work well both in a team
            environment and independently.
          </p>
        </div>
        <div className="">
          <h1 className="slide-in-top">Education</h1>
          {education.map((item, i) => {
            return (
              <EducationCard
                key={i}
                {...item}
                className={i % 2 ? "slide-in-bck-left" : "slide-in-bck-right"}
              />
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
