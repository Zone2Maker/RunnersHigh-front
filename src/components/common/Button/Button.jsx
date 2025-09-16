/** @jsxImportSource @emotion/react */
import * as s from "./styles";

function Button({ onClick, children }) {
  return (
    <button onClick={onClick} css={s.button}>
      {children}
    </button>
  );
}

export default Button;
