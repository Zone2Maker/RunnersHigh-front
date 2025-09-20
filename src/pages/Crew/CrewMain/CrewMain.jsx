/** @jsxImportSource @emotion/react */
import { FaCircleArrowUp, FaPlus } from "react-icons/fa6";
import CrewContainer from "./CrewContainer/CrewContainer";
import * as s from "./styles";
import { IoMdArrowDropdown } from "react-icons/io";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CrewMain() {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [searchProp, setSearchProp] = useState("");

  const [regionProp, setRegionProp] = useState("");
  const regionValue = [
    "서울",
    "부산",
    "대구",
    "인천",
    "광주",
    "대전",
    "울산",
    "경기",
    "강원",
    "충북",
    "충남",
    "전북",
    "전남",
    "경북",
    "경남",
    "세종",
    "제주",
  ];
  const [isDropDownOpen, setIsDropDownOpen] = useState("");

  const searchOnClickHandler = () => {
    setSearchProp(searchValue);
    window.scrollTo(0, 0);
  };

  const dropdownOnClickHandler = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };

  const regionOnClickHandler = (region) => {
    setRegionProp(region);
    setIsDropDownOpen(!isDropDownOpen);
  };
  return (
    <div css={s.container}>
      <div css={s.header}>
        <div
          css={s.inputBox}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        >
          <input type="text" />
          <FaCircleArrowUp size={"30px"} onClick={searchOnClickHandler} />
        </div>
        <div css={s.clickBox}>
          <span onClick={() => navigate("/crew/new")}>
            NEW 크루
            <FaPlus size={"12px"} />
          </span>
          <span onClick={dropdownOnClickHandler}>
            지역 선택
            <IoMdArrowDropdown />
          </span>
        </div>
      </div>
      <ul
        css={[
          s.dropdownBox,
          isDropDownOpen && {
            opacity: "1",
            visibility: "visible",
            transform: "translateY(0)",
          },
        ]}
      >
        {regionValue.map((region, index) => {
          return (
            <li key={index} onClick={() => regionOnClickHandler(region)}>
              {region}
            </li>
          );
        })}
      </ul>
      <CrewContainer searchProp={searchProp} regionProp={regionProp} />
    </div>
  );
}

export default CrewMain;
