/** @jsxImportSource @emotion/react */
import { FaCircleArrowUp, FaPlus } from "react-icons/fa6";

import { useFirebaseUpload } from "../../../hooks/useFirebaseUpload";
import CrewContainer from "./CrewContainer/CrewContainer";
import * as s from "./styles";
import { IoMdArrowDropdown } from "react-icons/io";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePrincipalState } from "../../../stores/usePrincipalState";
import AlertModal from "../../../components/common/AlertModal/AlertModal";
import { BiSolidMessageSquareError } from "react-icons/bi";
import { FaMapMarkerAlt } from "react-icons/fa";

function CrewMain() {
  const { principal } = usePrincipalState();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [searchProp, setSearchProp] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrerMessage] = useState("");

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

  const newCrewOnClickHandler = () => {
    if (principal?.crewId) {
      setErrerMessage("이미 함께하는 크루가 있어요!");
      setIsModalOpen(true);
      return;
    }
    navigate("/crew/new");
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
        <div
          css={[s.clickBox, regionProp && { justifyContent: "space-between" }]}
        >
          {regionProp ? (
            <div
              css={s.regionView}
              onClick={() => (window.location.href = "/crew")}
            >
              <p>{regionProp} &times;</p>
            </div>
          ) : (
            <></>
          )}
          <div>
            <span onClick={newCrewOnClickHandler}>
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
      </div>
      <CrewContainer searchProp={searchProp} regionProp={regionProp} />
      {errorMessage && isModalOpen && (
        <AlertModal onClose={() => setIsModalOpen(false)}>
          <BiSolidMessageSquareError
            size={"60px"}
            style={{ color: "#ff4d4d" }}
          />
          <strong>{errorMessage}</strong>
          <p>기존 크루 탈퇴 후 다시 시도해주세요.</p>
        </AlertModal>
      )}
    </div>
  );
}

export default CrewMain;
