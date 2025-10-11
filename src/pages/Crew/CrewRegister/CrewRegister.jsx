/** @jsxImportSource @emotion/react */
import { IoMdArrowDropdown } from "react-icons/io";
import * as s from "./styles";
import { CiCirclePlus } from "react-icons/ci";
import { useRef, useState } from "react";
import { usePrincipalState } from "../../../stores/usePrincipalState";
import AlertModal from "../../../components/common/AlertModal/AlertModal";
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
  const [isLoading, setIsLoading] = useState(false);
  const [alertModal, setAlertModal] = useState({
    isOpen: false,
    message: "",
    subMessage: "",
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
        openModal("5MB이내의 사진만 업로드 가능합니다.", "", "fail");
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
      !imagePreview.trim() ||
      !crewValue.crewRegion ||
      !crewValue.maxMembers.trim()
    ) {
      openModal("모든 항목을 입력해주세요.", "", "fail");
      return;
    }

    if (isLoading) {
      return;
    }

    setIsLoading(true);

    try {
      let newCrewData = { ...crewValue };

      if (profileImageFile) {
        const firebaseUrl = await uploadFile(profileImageFile, "profile-img");
        newCrewData.crewImgUrl = firebaseUrl;
      }

      const addCrewResp = await addCrewReq(newCrewData);

      if (addCrewResp.data.status === "failed") {
        openModal(addCrewResp.data.message, "", "fail");

        if (
          addCrewResp.data.message ===
          "로그인 정보가 유효하지 않거나 권한이 없습니다."
        ) {
          logout();
        }
        return;
      }

      openModal(
        addCrewResp.data.message,
        "채팅창에 접속하여 크루 활동을 시작하세요.",
        "success"
      );
      queryClient.invalidateQueries({ queryKey: ["crewList"], exact: false });
      queryClient.invalidateQueries(["getPrincipal"]);
    } catch (error) {
      openModal(
        error.response?.data?.message || "요청 중 에러가 발생했습니다.",
        "다시 시도해주세요.",
        "fail"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = (message, subMessage, status) => {
    setAlertModal({ isOpen: true, message, subMessage, status });
  };

  const closeModal = () => {
    setAlertModal({ isOpen: false, message: "", subMessage: "", status: "" });
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
        <button css={s.registerBtn}>
          {isLoading ? "등록중..." : "등록하기"}
        </button>
      </div>
      {alertModal.isOpen && (
        <AlertModal
          alertModal={alertModal}
          onClose={() => {
            if (alertModal.status === "success") {
              navigate("/crew");
            } else if (alertModal.status === "loginRequired") {
              navigate("/login");
            } else {
              closeModal();
            }
          }}
        />
      )}
    </div>
  );
}

export default CrewRegister;
