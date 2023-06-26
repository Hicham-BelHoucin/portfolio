export default function Project({ item, className }) {
  return (
    <div className={`project-card ${className}`}>
      <h1>{item?.name || ""}</h1>
      <p className="description">{item.description}</p>
      <div className="link-and-tech">
        <a href={item?.html_url || ""}>
          <img src="/link.svg" alt="" color="#fff" />
          View Code
        </a>
        <div>
          Tech used :
          <div
            style={{
              overflow: "hidden",
            }}
          >
            <div className="slide-text">{item.languages}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
