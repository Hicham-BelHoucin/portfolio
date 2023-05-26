import EducationCard from "../components/EducationCard";
import Layout from "./layout";

export default function About() {
  const education = [
    {
      title: "front-end developer",
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
          <h1>About</h1>
          <p className="about-pragraph">
            I'm Hicham Bel Houcin, a 19-year-old front-end developer with a
            passion for continuous learning. I am enthusiastic, self-motivated,
            reliable, responsible, and hardworking. I work well both in a team
            environment and independently.
          </p>
        </div>
        <div className="">
          <h1>Education</h1>
          {education.map((item, i) => {
            return <EducationCard key={i} {...item} />;
          })}
        </div>
      </div>
    </Layout>
  );
}
