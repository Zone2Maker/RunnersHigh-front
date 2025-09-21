/** @jsxImportSource @emotion/react */
import { useNavigate } from "react-router-dom";
import * as s from "./styles";

function Header() {
  const navigate = useNavigate();
  return (
    <div css={s.container} onClick={() => navigate("/")}>
      <span>LOGO</span>
    </div>
  );
}

export default Header;
