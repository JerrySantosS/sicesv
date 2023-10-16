import styles from './Input.module.css';

function Input({
  type,
  text,
  name,
  placeholder,
  handleOnChange,
  value,
  required,
  readOnly,
}) {
  return (
    <div className={styles.form_control}>
      <label htmlFor={name}>{text}:</label>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        onChange={handleOnChange}
        value={value}
        required={required}
        readOnly={readOnly}
        style={readOnly ? { backgroundColor: '#eee' } : {}}
      />
    </div>
  );
}

export default Input;
