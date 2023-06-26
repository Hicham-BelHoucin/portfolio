function Input({ label, value, onChange, placeHolder, className }) {
  return (
    <div className={`input-contianer `}>
      <label htmlFor="input" className="label">
        {label}
      </label>
      <input
        type="text"
        id="input"
        placeholder={placeHolder}
        className={`input ${className}`}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default Input;
