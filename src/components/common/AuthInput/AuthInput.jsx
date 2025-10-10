/** @jsxImportSource @emotion/react */
import * as s from "./styles";

function AuthInput({
  type = "text",
  placeholder,
  value,
  onChange,
  onBlur,
  name,
  disabled = false,
}) {
  return (
    <input
      css={s.input(disabled)}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      name={name}
      disabled={disabled}
    />
  );
}

export default AuthInput;
