/** @jsxImportSource @emotion/react */
import {
  FaCheck,
  FaCircleArrowLeft,
  FaCircleArrowUp,
  FaPlus,
} from "react-icons/fa6";
import CrewContainer from "./CrewContainer/CrewContainer";
import * as s from "./styles";
import { IoMdArrowDropdown } from "react-icons/io";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { usePrincipalState } from "../../../stores/usePrincipalState";
import AlertModal from "../../../components/common/AlertModal/AlertModal";
import {
  BiSolidMessageSquareCheck,
  BiSolidMessageSquareError,
} from "react-icons/bi";
import { FaTimes } from "react-icons/fa";

function CrewMain() {
  const { principal } = usePrincipalState();
  const navigate = useNavigate();
  const [modal, setModal] = useState({
    isOpen: false,
    message: "",
    status: "",
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const currentSearch = searchParams.get("search") || "";
  const currentRegion = searchParams.get("region") || "";
  const [searchValue, setSearchValue] = useState(currentSearch);

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

  const openModal = (message, status) => {
    setModal({ isOpen: true, message, status });
  };

  const closeModal = () => {
    setModal({ isOpen: false, message: "", status: "" });
  };

  const searchBtnOnClickHandler = () => {
    if (currentRegion !== "") {
      navigate(`/crew?search=${searchValue}&region=${currentRegion}`);
    } else {
      navigate(`/crew?search=${searchValue}`);
    }
    window.scrollTo(0, 0);
  };

  const searchInputOnKeyDownHandler = (e) => {
    if (e.key === "Enter") {
      searchBtnOnClickHandler();
    }
  };

  const dropdownOnClickHandler = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };

  const regionOnClickHandler = (region) => {
    navigate(`/crew?search=${searchValue}&region=${region}`);
    setIsDropDownOpen(!isDropDownOpen);
  };

  const newCrewOnClickHandler = () => {
    if (principal?.crewId) {
      openModal("이미 함께하는 크루가 있어요!", "fail");
      return;
    }
    navigate("/crew/new");
  };
  return (
    <div css={s.container}>
      <div css={s.header}>
        <div css={s.searchContainer}>
          <div css={s.backBtn} onClick={() => navigate(-1)}>
            <FaCircleArrowLeft />
          </div>
          <input
            type="text"
            value={searchValue}
            css={s.searchInput}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={searchInputOnKeyDownHandler}
            placeholder="이름, 지역으로 크루 검색"
          />
          <div css={s.searchBtn} onClick={searchBtnOnClickHandler}>
            <FaCircleArrowUp />
          </div>
        </div>
        <div css={s.filterContainer(!!currentRegion)}>
          {currentRegion && (
            <div
              css={s.selectedRegion}
              onClick={() => {
                if (currentSearch !== "") {
                  navigate(`/crew?search=${currentSearch}`);
                } else {
                  navigate("/crew");
                }
              }}
            >
              <span>{currentRegion}</span>
              <FaTimes />
            </div>
          )}
          <div css={s.filter}>
            <div css={[s.filterBtn, s.newCrew]} onClick={newCrewOnClickHandler}>
              <span>크루 만들기</span>
              <FaPlus />
            </div>
            <div css={s.seperator}></div>
            <div css={s.dropdownContainer}>
              <div
                css={[s.filterBtn, s.selectRegion]}
                onClick={dropdownOnClickHandler}
              >
                <span>지역</span>
                <IoMdArrowDropdown />
              </div>
              {/* 드롭다운 */}
              <ul css={s.regionList(isDropDownOpen)}>
                {regionValue.map((region, index) => {
                  return (
                    <li
                      key={index}
                      css={s.regionItem(region === currentRegion)}
                      onClick={() => regionOnClickHandler(region)}
                    >
                      <span>{region}</span>
                      {region === currentRegion && <FaCheck />}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <CrewContainer search={currentSearch} region={currentRegion} />
      {modal.isOpen && (
        <AlertModal onClose={closeModal}>
          {modal.status === "success" ? (
            <BiSolidMessageSquareCheck
              size={"60px"}
              style={{ color: "#00296b" }}
            />
          ) : (
            <BiSolidMessageSquareError
              size={"60px"}
              style={{ color: "#f57c00" }}
            />
          )}
          <span>{modal.message}</span>
          {modal.status === "fail" && (
            <p>기존 크루 탈퇴 후 다시 시도해주세요.</p>
          )}
        </AlertModal>
      )}
    </div>
  );
}

export default CrewMain;
