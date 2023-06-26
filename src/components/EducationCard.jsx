export default function EducationCard({ title, place, date, className }) {
  return (
    <div className={`education-card ${className}`}>
      <div className="education-title">{title}</div>
      <div className="education-place-date">
        <div className="place">
          <img alt="" src="/Vector.png" width={20} />
          <div>{place}</div>
        </div>
        <div className="date">
          <img alt="" src="/Group.png" width={20} />
          <div>{date}</div>
        </div>
      </div>
      <hr />
    </div>
  );
}
