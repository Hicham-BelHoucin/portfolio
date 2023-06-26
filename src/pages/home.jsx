import Layout from "./layout";
import "./../styles/home.css";
import "./../styles/about.css";

export default function Home() {
  return (
    <Layout className="about">
      <div className="personal-info slide-in-bck-right">
        <div className="slide-in-bck-right">HI 👋</div>
        <div className="slide-in-bck-right"> My Name Is</div>
        <div className="slide-in-bck-right name">Hicham Bel Houcin</div>
        <div className="slide-in-bck-right">I build things for Web</div>
        <div className="slide-in-bck-right">
          <a download="resume.pdf" href="/my-resume.pdf">
            <button className="primary bounce-in-left">
              <i className="fa fa-download"></i> Download CV
            </button>
          </a>
        </div>
      </div>
      <img
        src="/portfolio_image.png"
        alt=""
        width={500}
        className="profile-img slide-in-bck-left"
      />
    </Layout>
  );
}
