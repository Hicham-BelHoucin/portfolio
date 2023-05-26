export default function Project({ item }) {
  return (
    <div className="project-card">
      <h1>{item?.name || ""}</h1>
      <p className="description">{item.description}</p>
      <div className="link-and-tech">
        <a href={item?.html_url || ""}>
          <img src="/link.svg" alt="" color="#fff" />
          View Code
        </a>
        <div>Tech used : {item.laguages}</div>
      </div>
    </div>
  );
}
