/** @jsxImportSource @emotion/react */
import { IoMdArrowDropdown } from "react-icons/io";
import * as s from "./styles";
import { CiCirclePlus } from "react-icons/ci";
import { useRef, useState } from "react";
import { usePrincipalState } from "../../../stores/usePrincipalState";
import AlertModal from "../../../components/common/AlertModal/AlertModal";
import {
  BiSolidMessageSquareCheck,
  BiSolidMessageSquareError,
} from "react-icons/bi";
import { useFirebaseUpload } from "../../../hooks/useFirebaseUpload";
import { addCrewReq } from "../../../services/crew/crewApis";
import { useNavigate } from "react-router-dom";
import { SlPicture } from "react-icons/sl";

function CrewRegister() {
  const { principal, logout } = usePrincipalState();
  const navigate = useNavigate();
  const [crewValue, setCrewValue] = useState({
    userId: principal?.userId ?? null,
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
  const { progress, downloadUrl, error, isUploading, uploadFile } =
    useFirebaseUpload();
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [isImageError, setIsImageError] = useState(false);
  const fileInputRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropDownOpen, setIsDropDownOpen] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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
      setProfileImageFile(file);
    }
  };

  const enterOnKeyDownHandler = (e) => {
    if (e.key === "enter") {
      e.preventDefault();
      return;
    }
  };

  const maxMemberOnChangeHandler = (e) => {
    const value = e.target.value;
    if (value === "" || (/^[1-9]\d*$/.test(value) && Number(value) <= 100)) {
      setCrewValue({ ...crewValue, maxMembers: value });
    }
  };

  const registerOnClickHandler = async () => {
    if (profileImageFile) {
      const firebaseUrl = await uploadFile(profileImageFile, "profile-img");
      setCrewValue({ ...crewValue, crewImgUrl: firebaseUrl });

      if (error) {
        setErrorMessage("이미지 업로드에 실패했습니다.");
        setIsModalOpen(true);
        return;
      }
    }

    addCrewReq(crewValue).then((response) => {
      if (response.data.status === "failed") {
        setErrorMessage(response.data.message);
        setIsModalOpen(true);
        if (
          response.data.message ===
          "로그인 정보가 유효하지 않거나 권한이 없습니다."
        ) {
          logout();
        }
        return;
      }
      setSuccessMessage(response.data.message);
      setIsModalOpen(true); //모달 닫으면 홈화면으로 이동
    });
  };

  return (
    <div css={s.container}>
      <div css={s.imgBox}>
        <p>대표사진</p>
        <div onClick={imageChangeOnClickHandler}>
          {imagePreview && !isImageError ? (
            <img
              src={imagePreview}
              alt="크루 대표사진 미리보기"
              onError={() => setIsImageError(true)}
            />
          ) : isImageError ? (
            <div css={s.noImgBox}>
              <SlPicture />
              <p>이미지를 불러올 수 없습니다</p>
            </div>
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
          maxLength="25"
          placeholder="크루를 대표하는 이름을 입력하세요. (25자 이내)"
        />
      </div>
      <div css={s.box}>
        <p>크루 소개</p>
        <textarea
          onKeyDown={enterOnKeyDownHandler}
          onChange={(e) =>
            setCrewValue({ ...crewValue, crewDetail: e.target.value })
          }
          placeholder="소개 문구를 입력하세요. (100자  이내)"
          maxLength="100"
          spellCheck="false"
          rows={5}
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
        <p>최대 인원수</p>
        <input
          type="text"
          value={crewValue.maxMembers}
          onChange={maxMemberOnChangeHandler}
          placeholder="인원을 입력하세요. (최대 100명)"
        />
      </div>
      <div css={s.box}>
        <button onClick={registerOnClickHandler}>등록하기</button>
      </div>
      {!principal && (
        <AlertModal onClose={() => navigate("/login")}>
          <BiSolidMessageSquareError
            size={"60px"}
            style={{ color: "#ff4d4d" }}
          />
          <strong>로그인 후 이용 가능합니다.</strong>
        </AlertModal>
      )}
      {errorMessage && isModalOpen && (
        <AlertModal onClose={() => setIsModalOpen(false)}>
          <BiSolidMessageSquareError
            size={"60px"}
            style={{ color: "#ff4d4d" }}
          />
          <strong>{errorMessage}</strong>
        </AlertModal>
      )}
      {successMessage && (
        <AlertModal onClose={() => navigate("/")}>
          <BiSolidMessageSquareCheck
            size={"60px"}
            style={{ color: "#125bc8" }}
          />
          <strong>{successMessage}</strong>
          <p>채팅창에 접속하여 크루 활동을 시작하세요.</p>
        </AlertModal>
      )}
    </div>
  );
}

export default CrewRegister;
