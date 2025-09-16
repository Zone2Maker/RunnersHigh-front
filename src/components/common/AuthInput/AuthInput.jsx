/** @jsxImportSource @emotion/react */
import * as s from "./styles";

function AuthInput({ 
  type = "text", 
  placeholder, 
  value, 
  onChange, 
  name, 
  disabled = false 
}) {
  return (
    <input
      css={s.input}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name}
      disabled={disabled}
    />
  );
}

export default AuthInput;