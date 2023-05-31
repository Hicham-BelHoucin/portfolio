function Input({ label, value, onChange, placeHolder, className }) {
  const classNames = [
    "bounce-in-top",
    "bounce-in-right",
    "roll-in-top",
    "slide-in-top",
    "slide-in-bck-left",
    "slide-in-bck-right",
  ];
  return (
    <div
      className={`input-contianer ${
        classNames[Math.floor(Math.random() * (classNames.length - 1) + 0)]
      }`}
    >
      <label htmlFor="input" className="label">
        {label}
      </label>
      <input
        type="text"
        id="input"
        placeholder={placeHolder}
        className={`input ${className} ${
          classNames[Math.floor(Math.random() * (classNames.length - 1) + 0)]
        }`}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default Input;
