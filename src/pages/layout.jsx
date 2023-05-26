import Wrapper from "../components/wrapper";
import Navbar from "../components/navbar";

export default function Layout({ children, className }) {
  return (
    <Wrapper>
      <Navbar />
      <div className="container">
        <section className={className}>{children}</section>
      </div>
    </Wrapper>
  );
}
