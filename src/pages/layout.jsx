import Wrapper from "../components/wrapper";
import Navbar from "../components/navbar";
import React from "react";

export default function Layout({ children, className }) {
  return (
    <div>
      <Wrapper>
        <Navbar />
        <div className="container">
          <section className={className}>{children}</section>
        </div>
      </Wrapper>
    </div>
  );
}
