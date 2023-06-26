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
  const isWide = useMedia("(min-width: 768px)");
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isWide) {
      setShow(false);
    }
  }, [isWide]);

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
              <Link to="https://www.linkedin.com/in/hicham-bel-houcin/">
                <li className="link">
                  <AiFillLinkedin size={24} />
                </li>
              </Link>
              <Link to="https://twitter.com/HichamBelhoucin">
                <li className="link">
                  <AiFillTwitterCircle size={24} />
                </li>
              </Link>
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
          <>
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
            </ul>
          </>
        )}
      </nav>
    </Wrapper>
  );
}
