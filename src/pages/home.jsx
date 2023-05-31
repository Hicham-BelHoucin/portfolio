import Layout from "./layout";
import "./../styles/home.css";
import "./../styles/about.css";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <Layout className="about">
      <div className="personal-info">
        <div className="bounce-in-top">HI 👋</div>
        <div className="bounce-in-right"> My Name Is</div>
        <div className="name bounce-in-top">Hicham Bel Houcin</div>
        <div className="bounce-in-right">I build things for Web</div>
        <div className="bounce-in-top">
          <a download="resume.pdf" href="/my-resume.pdf">
            <button class="primary bounce-in-left">
              <i class="fa fa-download"></i> Download CV
            </button>
          </a>
        </div>
      </div>
      <img
        src="/portfolio_image.png"
        alt=""
        width={500}
        className="profile-img roll-in-top"
      />
    </Layout>
  );
}
