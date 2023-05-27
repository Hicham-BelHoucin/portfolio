import Wrapper from "../components/wrapper";
import Navbar from "../components/navbar";
import React, { useState, useEffect, useRef } from "react";
import BIRDS from "vanta/dist/vanta.birds.min";

export default function Layout({ children, className }) {
  const [vantaEffect, setVantaEffect] = useState(null);
  const myRef = useRef(null);
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        BIRDS({
          el: myRef.current,
          backgroundColor: "#f9f6f6",
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          colorMode: "variance",
          birdSize: 1.0,
          wingSpan: 26.0,
          speedLimit: 3.0,
          separation: 29.0,
          alignment: 19.0,
          cohesion: 21.0,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
      }}
      ref={myRef}
    >
      <Wrapper>
        <Navbar />
        <div className="container">
          <section className={className}>{children}</section>
        </div>
      </Wrapper>
    </div>
  );
}
