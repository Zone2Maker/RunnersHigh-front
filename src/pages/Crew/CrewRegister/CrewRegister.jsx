/** @jsxImportSource @emotion/react */
import { IoMdArrowDropdown } from "react-icons/io";
import * as s from "./styles";
import { CiCirclePlus } from "react-icons/ci";
import { useRef, useState } from "react";
import { usePrincipalState } from "../../../stores/usePrincipalState";
import AlertModal from "../../../components/common/AlertModal/AlertModal";
import { BiSolidMessageSquareError } from "react-icons/bi";

function CrewRegister() {
  const { principal } = usePrincipalState();
  const [crewValue, setCrewValue] = useState({
    userId: principal?.userId,
    crewName: "",
    crewDetail: "",
    crewImgUrl: "",
    crewRegion: "",
    maxMembers: "",
  });
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
  const [imagePreview, setImagePreview] = useState(principal?.profileImgUrl);
  const fileInputRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropDownOpen, setIsDropDownOpen] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const regionOnClickHandler = (region) => {
    setCrewValue({ ...crewValue, crewRegion: region });
    setIsDropDownOpen(!isDropDownOpen);
  };

  const dropdownOnClickHandler = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };

  const imageChangeOnClickHandler = () => {
    fileInputRef.current.click();
  };

  const fileOnChangeHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      const maxSize = 5 * 1024 * 1024;
      const fileSize = file.size;

      if (fileSize > maxSize) {
        setErrorMessage("5MB이내의 사진만 업로드 가능합니다.");
        setIsModalOpen(true);
        e.target.value = "";
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setCrewValue({ ...crewValue, crewImgUrl: file });
    }
  };

  return (
    <div css={s.container}>
      <div css={s.imgBox}>
        <p>대표사진</p>
        <div onClick={imageChangeOnClickHandler}>
          {imagePreview ? (
            <img src={imagePreview} alt="크루 대표사진 미리보기" />
          ) : (
            <CiCirclePlus />
          )}
          <input
            type="file"
            style={{ display: "none" }}
            ref={fileInputRef}
            onChange={fileOnChangeHandler}
            accept="image/*"
          />
        </div>
      </div>
      <div css={s.box}>
        <p>크루명</p>
        <input
          type="text"
          onChange={(e) =>
            setCrewValue({ ...crewValue, crewName: e.target.value })
          }
        />
      </div>
      <div css={s.box}>
        <p>크루 소개</p>
        <textarea
          onChange={(e) =>
            setCrewValue({ ...crewValue, crewDetail: e.target.value })
          }
          placeholder="소개 문구를 입력하세요. (150자 내)"
        ></textarea>
      </div>
      <div css={s.box}>
        <p>활동 지역</p>
        <div onClick={dropdownOnClickHandler}>
          {crewValue.crewRegion ? (
            <p>{crewValue.crewRegion}</p>
          ) : (
            <>
              <span>지역 선택</span>
              <IoMdArrowDropdown />
            </>
          )}
          <ul
            css={[
              s.dropdownBox,
              isDropDownOpen && {
                opacity: "1",
                visibility: "visible",
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
      </div>
      <div css={s.box}>
        <p>최대 인원수(100명 이하)</p>
        <input
          type="text"
          onChange={(e) =>
            setCrewValue({ ...crewValue, maxMembers: e.target.value })
          }
        />
      </div>
      <div css={s.box}>
        <button>등록하기</button>
      </div>
      {errorMessage && isModalOpen && (
        <AlertModal onClose={() => setIsModalOpen(false)}>
          <BiSolidMessageSquareError
            size={"60px"}
            style={{ color: "#ff4d4d" }}
          />
          <strong>{errorMessage}</strong>
        </AlertModal>
      )}
    </div>
  );
}

export default CrewRegister;
