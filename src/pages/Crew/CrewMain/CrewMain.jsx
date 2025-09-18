/** @jsxImportSource @emotion/react */
import { FaCircleArrowUp, FaPlus } from "react-icons/fa6";
import CrewContainer from "./CrewContainer/CrewContainer";
import * as s from "./styles";
import { IoMdArrowDropdown } from "react-icons/io";
import { GoPlus } from "react-icons/go";
import { useState } from "react";

function CrewMain() {
  const [searchValue, setSearchValue] = useState("");
  const [searchProp, setSearchProp] = useState("");
  return (
    <div css={s.container}>
      <div css={s.header}>
        <div
          css={s.inputBox}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        >
          <input type="text" />
          <FaCircleArrowUp
            size={"30px"}
            onClick={() => (setSearchProp(searchValue))}
          />
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
      <CrewContainer searchProp={searchProp}/>
    </div>
  );
}

export default CrewMain;
