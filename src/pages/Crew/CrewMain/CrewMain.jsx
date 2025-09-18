/** @jsxImportSource @emotion/react */
import { FaCircleArrowUp, FaPlus } from "react-icons/fa6";
import CrewContainer from "./CrewContainer/CrewContainer";
import * as s from "./styles";
import { IoMdArrowDropdown } from "react-icons/io";
import { GoPlus } from "react-icons/go";

function CrewMain() {
  return (
    <div css={s.container}>
      <div css={s.header}>
        <div css={s.inputBox}>
          <input type="text" />
          <FaCircleArrowUp size={"30px"} />
        </div>
        <div css={s.clickBox}>
          <span>
            NEW 크루
            <FaPlus size={"12px"} />
          </span>
          <span>
            지역 선택
            <IoMdArrowDropdown />
          </span>
        </div>
      </div>
      <CrewContainer />
    </div>
  );
}

export default CrewMain;
