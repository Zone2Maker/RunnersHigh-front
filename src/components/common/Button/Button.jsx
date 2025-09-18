/** @jsxImportSource @emotion/react */
import * as s from "./styles";

function Button({ onClick, isDisabled, children }) {
  return (
    <button onClick={onClick} css={s.button} disabled={isDisabled}>
      {children}
    </button>
  );
}

export default Button;
