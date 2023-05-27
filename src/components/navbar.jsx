import {
  AiFillLinkedin,
  AiFillTwitterCircle,
  AiOutlineMenu,
} from "react-icons/ai";
import { BsGithub } from "react-icons/bs";
import { Link } from "react-router-dom";
import Wrapper from "./wrapper";
import { useEffect, useState } from "react";
import "./../styles/navbar.css";
import { useLocation, useMedia } from "react-use";

export default function Navbar() {
  const path = useLocation().pathname;
  console.log("path : ", path);
  const isWide = useMedia("(min-width: 768px)");
  const [image, setImage] = useState(localStorage.getItem("mode"));
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (image !== "light" && image !== "dark") {
      localStorage.setItem("mode", "light");
      setImage("light");
    }
    document.documentElement.style.setProperty(
      "--background-color",
      image === "light" ? "#f9f6f6" : "black"
    );
    document.documentElement.style.setProperty(
      "--heading-color",
      image === "light" ? "#42446e" : "#fff"
    );
    document.documentElement.style.setProperty(
      "--dark-content",
      image === "light" ? "#666666" : "#c4b8b8"
    );
    document.documentElement.style.setProperty(
      "--light-content",
      image === "light" ? "#a7a7a7" : "gray"
    );
    document.documentElement.style.setProperty(
      "--spinner-color",
      image === "light" ? "black" : "white"
    );
    document.documentElement.style.setProperty(
      "--card-bg-color",
      image === "light" ? "#fff" : "#191919"
    );
  }, [image]);

  useEffect(() => {
    if (isWide) {
      setShow(false);
    }
  }, [isWide]);

  const ChnageMode = () => {
    setImage((prev) => {
      localStorage.setItem("mode", prev === "light" ? "dark" : "light");
      setShow(false);
      return prev === "light" ? "dark" : "light";
    });
  };

  return (
    <Wrapper>
      <nav className="navbar">
        <div className="name">Hicham Bel Houcin</div>
        {isWide ? (
          <>
            <ul className="links">
              <Link to="/">
                <li className={`link ${path === "/" ? "selected" : ""}`}>
                  Home
                </li>
              </Link>
              <Link to="/about">
                <li className={`link ${path === "/about" ? "selected" : ""}`}>
                  About
                </li>
              </Link>
              <Link to="/tech-stack">
                <li
                  className={`link ${path === "/tech-stack" ? "selected" : ""}`}
                >
                  Tech Stack
                </li>
              </Link>
              <Link to="/projects">
                <li
                  className={`link ${path === "/projects" ? "selected" : ""}`}
                >
                  Projects
                </li>
              </Link>
              <Link to="/contact">
                <li className={`link ${path === "/contact" ? "selected" : ""}`}>
                  Contact
                </li>
              </Link>
            </ul>
            <ul className="links">
              <Link to="https://github.com/Hicham-BelHoucin">
                <li className="link">
                  <BsGithub size={24} />
                </li>
              </Link>
              <Link to="https://www.linkedin.com/in/hicham-bel-houcin-a3931323b/">
                <li className="link">
                  <AiFillLinkedin size={24} />
                </li>
              </Link>
              <Link to="https://twitter.com/HichamBelhoucin">
                <li className="link">
                  <AiFillTwitterCircle size={24} />
                </li>
              </Link>
              <li className="link">
                <button className="button" onClick={ChnageMode}>
                  <img
                    src={`/${image === "light" ? "dark" : "light"}.png`}
                    alt=""
                    width={18}
                  />
                </button>
              </li>
            </ul>
          </>
        ) : (
          <button
            className="button"
            onClick={() => {
              setShow((prev) => !prev);
            }}
          >
            <AiOutlineMenu />
          </button>
        )}
        {show && (
          <ul className="links">
            <Link to="/">
              <li className="link">Home</li>
            </Link>
            <Link to="/about">
              <li className="link">About</li>
            </Link>
            <Link to="/tech-stack">
              <li className="link">Tech Stack</li>
            </Link>
            <Link to="/projects">
              <li className="link">Projects</li>
            </Link>
            <Link to="/contact">
              <li className="link">Contact</li>
            </Link>
            <li className="link">
              <button className="button" onClick={ChnageMode}>
                <img src={`/${image}.png`} alt="" className="mode-icon" />
              </button>
            </li>
          </ul>
        )}
      </nav>
    </Wrapper>
  );
}
