import Layout from "./layout";
import "./../styles/home.css";
import "./../styles/about.css";

export default function Home() {
  return (
    <Layout className="about">
      <div className="personal-info">
        <div>HI 👋</div>
        <div> My Name Is</div>
        <div className="name">Hicham Bel Houcin</div>
        <div>I build things for Web</div>
      </div>
      <img
        src="/portfolio_image.png"
        alt=""
        width={500}
        className="profile-img"
      />
    </Layout>
  );
}
