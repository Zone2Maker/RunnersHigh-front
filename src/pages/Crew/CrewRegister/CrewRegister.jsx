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
import { queryClient } from "../../../configs/queryClient";

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
  const fileInputRef = useRef(null);
  const [isDropDownOpen, setIsDropDownOpen] = useState("");
  const [modal, setModal] = useState({
    isOpen: false,
    message: "",
    status: "",
  });

  const regionOnClickHandler = (region) => {
    setCrewValue({ ...crewValue, crewRegion: region });
    setIsDropDownOpen(!isDropDownOpen);
  };

  const dropdownOnClickHandler = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };

  const imageSelectOnClickHandler = () => {
    fileInputRef.current.click();
  };

  const fileOnChangeHandler = (e) => {
    const file = e.target.files[0];

    if (file) {
      const maxSize = 5 * 1024 * 1024;
      const fileSize = file.size;

      if (fileSize > maxSize) {
        openModal("5MB이내의 사진만 업로드 가능합니다.", "fail");
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
    if (
      !crewValue.crewName.trim() ||
      !crewValue.crewDetail.trim() ||
      !crewValue.crewImgUrl ||
      !crewValue.crewRegion ||
      !crewValue.maxMembers.trim()
    ) {
      openModal("모든 항목을 입력해주세요.", "fail");
      return;
    }

    if (profileImageFile) {
      const firebaseUrl = await uploadFile(profileImageFile, "profile-img");
      setCrewValue({ ...crewValue, crewImgUrl: firebaseUrl });

      if (error) {
        openModal(
          "이미지 업로드에 실패했습니다. 잠시 후에 다시 시도해주세요.",
          "fail"
        );
        return;
      }
    }

    addCrewReq(crewValue)
      .then((response) => {
        if (response.data.status === "failed") {
          openModal(response.data.message, "fail");

          if (
            response.data.message ===
            "로그인 정보가 유효하지 않거나 권한이 없습니다."
          ) {
            logout();
          }
          return;
        }
        openModal(response.data.message, "success");
        queryClient.invalidateQueries(["getPrincipal"]);
      })
      .catch((error) => {
        openModal(error.response?.data?.message, "fail");
      });
  };

  const openModal = (message, status) => {
    setModal({ isOpen: true, message, status });
  };

  const closeModal = () => {
    setModal({ isOpen: false, message: "", status: "" });
  };

  return (
    <div css={s.container}>
      <div css={s.box}>
        <p css={s.subject}>대표 사진</p>
        <div css={s.imgInput} onClick={imageSelectOnClickHandler}>
          {imagePreview ? (
            <img src={imagePreview} alt="크루 대표 사진 미리보기" />
          ) : (
            <>
              <CiCirclePlus />
              <p>크루를 대표할 이미지를 선택해주세요.</p>
            </>
          )}
          <input
            type="file"
            css={s.imageInput}
            ref={fileInputRef}
            onChange={fileOnChangeHandler}
            accept="image/*"
          />
        </div>
      </div>
      <div css={s.box}>
        <p css={s.subject}>크루명</p>
        <input
          type="text"
          css={s.textInput}
          onChange={(e) =>
            setCrewValue({ ...crewValue, crewName: e.target.value })
          }
          maxLength="20"
          placeholder="크루를 대표하는 이름을 입력해주세요. (20자 이내)"
        />
      </div>
      <div css={s.box}>
        <p css={s.subject}>크루 소개</p>
        <textarea
          css={s.textarea}
          onKeyDown={enterOnKeyDownHandler}
          onChange={(e) =>
            setCrewValue({ ...crewValue, crewDetail: e.target.value })
          }
          placeholder="크루를 소개할 문구를 입력해주세요. (100자 이내)"
          maxLength="100"
          spellCheck="false"
          rows={5}
        ></textarea>
      </div>
      <div css={s.regionAndMaxGroup}>
        <div css={s.box}>
          <p css={s.subject}>활동 지역</p>
          <div css={s.dropdownContainer}>
            {/* 드롭다운 버튼과 ul을 형제 요소로 */}
            <div
              css={s.dropdownButton(isDropDownOpen)}
              onClick={dropdownOnClickHandler}
            >
              {crewValue.crewRegion ? (
                <span css={s.region}>{crewValue.crewRegion}</span>
              ) : (
                <span>지역</span>
              )}
              <IoMdArrowDropdown />
            </div>
            <ul css={s.dropdownMenu(isDropDownOpen)}>
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
          <p css={s.subject}>최대 인원수</p>
          <input
            type="text"
            css={s.textInput}
            value={crewValue.maxMembers}
            onChange={maxMemberOnChangeHandler}
            placeholder="최대 100명"
          />
        </div>
      </div>
      <div css={s.btnContainer} onClick={registerOnClickHandler}>
        <button css={s.registerBtn} onClick={registerOnClickHandler}>
          등록하기
        </button>
      </div>
      {modal.isOpen && (
        <AlertModal
          onClose={() => {
            if (modal.status === "success") {
              navigate("/crew");
            } else if (modal.status === "loginRequired") {
              navigate("/login");
            } else {
              closeModal();
            }
          }}
        >
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
          <strong>{modal.message}</strong>
          {modal.status === "success" && (
            <p>채팅창에 접속하여 크루 활동을 시작하세요.</p>
          )}
        </AlertModal>
      )}
    </div>
  );
}

export default CrewRegister;
