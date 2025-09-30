/** @jsxImportSource @emotion/react */
import { useMutation } from "@tanstack/react-query";
import { useCheckDuplicate } from "../../../hooks/useCheckDuplicate";
import { useFirebaseUpload } from "../../../hooks/useFirebaseUpload";
import * as s from "./styles";
import { useRef, useState } from "react";
import { queryClient } from "../../../configs/queryClient";
import { updateUserReq } from "../../../services/user/userApis";
import AlertModal from "../../../components/common/AlertModal/AlertModal";
import { BiSolidMessageSquareError } from "react-icons/bi";

function ProfileEditForm({ principal, onCancel }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChanged, setIsChanged] = useState(false); // 닉네임, 프로필 변경 사항이 상태 관리

  const [nickname, setNickname] = useState(principal?.username);
  const [profileImageFile, setProfileImageFile] = useState(null); // 새로 선택한 파일 객체
  const [imagePreview, setImagePreview] = useState(principal?.profileImgUrl); // 미리보기 URL
  const [nicknameError, setNicknameError] = useState("");
  const fileInputRef = useRef(null);

  const {
    isLoading: isChecking,
    isAvailable: isNicknameAvailable,
    message: apiMessage,
    checkExist,
    reset,
  } = useCheckDuplicate();

  const {
    progress: imgUploadingProgress,
    error: imgUploadingError,
    isUploading: isProfileImgUploading,
    uploadFile,
  } = useFirebaseUpload();

  const updateUserMutation = useMutation({
    mutationKey: "updateUser",
    mutationFn: updateUserReq,
    onSuccess: (resp) => {
      if (resp.data.status === "success") {
        queryClient.invalidateQueries(["getPrincipal"]); // principal 무효화
        location.reload(); // 새로고침
      } else if (resp.data.status === "failed") {
        alert(resp.data.message);
        return;
      }
    },
    onError: (error) => {
      alert("문제가 발생했습니다. 다시 시도해주세요.");
      return;
    },
    onSettled: () => {},
  });

  const imageChangeOnClickHandler = () => {
    fileInputRef.current.click();
  };

  const fileOnChangeHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      // 올린 파일의 크기가 5MB가 넘으면 return
      const maxSize = 5 * 1024 * 1024; // 1024 = 1KB
      const fileSize = file.size;

      if (fileSize > maxSize) {
        setIsModalOpen(true);
        e.target.value = "";
        return;
      }

      // FileReader를 사용해 이미지 미리보기 생성
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);

      setProfileImageFile(file);
      setIsChanged(true);
    }
  };

  const nicknameOnChangeHandler = (e) => {
    const newNickname = e.target.value;
    setNickname(newNickname);

    // 에러 초기화
    setNicknameError("");

    if (newNickname !== principal.username) {
      setIsChanged(true); // 원래 닉네임이랑 다르면 변경 사항 발생
    } else {
      // 다시 돌아오는 경우
      if (!profileImageFile) {
        // 프로필 이미지도 변경사항이 없다면
        setIsChanged(false); // 변경사항이 없는 것
      }
    }

    if (newNickname.length === 0) {
      reset();
      return;
    }

    if (newNickname && newNickname.length < 2) {
      setNicknameError("닉네임은 2자 이상이어야 합니다.");
    }

    if (newNickname.replace(/[Il1i|ㅣ]/g, "").trim() === "") {
      setNicknameError("사용할 수 없는 닉네임입니다.");
    }
  };

  // onBlur 이벤트가 발생했을 때 실행될 함수
  const nicknameOnBlurHandler = (e) => {
    const value = e.target.value;

    // 닉네임이 변경, 비어있지 않을 때 중복 검사
    if (value && value !== principal.username) {
      checkExist("nickname", value);
    } else {
      // 원래 닉네임으로 되돌아왔을 때, 입력창을 비웠을 때
      reset();
    }
  };

  // 저장 버튼 클릭
  const saveBtnOnClickHandler = async () => {
    if (nickname.length === 0 || nickname.trim() === "") {
      setNicknameError("사용하실 닉네임을 입력해주세요.");
      return;
    }

    let finalProfileImgUrl = principal.profileImgUrl;

    // 새로 선택한 이미지가 있다면 파이어베이스에 업로드
    if (profileImageFile) {
      try {
        const firebaseUrl = await uploadFile(profileImageFile, "profile-img");
        finalProfileImgUrl = firebaseUrl; // 업로드 성공 시 파이어베이스 URL로 교체
      } catch (error) {
        alert("이미지 업로드에 실패했습니다.", error);
        return;
      }
    }

    // 요청 객체 생성
    const updatedProfile = {
      userId: principal.userId,
      nickname: nickname, // 상태값으로 관리하던 최신 닉네임
      profileImgUrl: finalProfileImgUrl,
    };

    updateUserMutation.mutate(updatedProfile);
  };

  return (
    <>
      <div css={s.profileImgBox}>
        <div css={s.profileImg}>
          <img
            src={imagePreview}
            onError={(e) => {
              e.target.onerror = null; // 무한 루프 방지
              e.target.src = import.meta.env.VITE_PROFILE_DEFAULT_IMG;
            }}
          />
        </div>
        <button css={s.changeImageButton} onClick={imageChangeOnClickHandler}>
          이미지 변경
        </button>
        <input
          type="file"
          style={{ display: "none" }}
          ref={fileInputRef}
          onChange={fileOnChangeHandler}
          accept="image/*"
        />
      </div>
      <div css={s.nicknameBox}>
        <div css={s.inputGroup}>
          <label htmlFor="nickname-input" css={s.label}>
            닉네임
          </label>
          <input
            id="nickname-input"
            type="text"
            value={nickname}
            placeholder="닉네임을 입력해주세요."
            onChange={nicknameOnChangeHandler}
            onBlur={nicknameOnBlurHandler}
            maxLength={10}
            css={s.input}
          />
          {isChecking ? (
            <p></p>
          ) : nicknameError ? (
            <p css={s.errorMessage(false)}>{nicknameError}</p> // 1순위: 글자 수 에러
          ) : (
            apiMessage && (
              <p css={s.errorMessage(isNicknameAvailable)}>
                {apiMessage} {/* 2순위: API 결과 메시지 */}
              </p>
            )
          )}
        </div>

        <div css={s.buttonContainer}>
          <button css={s.cancelButton} onClick={onCancel}>
            취소
          </button>
          <button
            css={s.saveButton}
            onClick={saveBtnOnClickHandler}
            // !!: 이중 부정연산자, 어떤 값이든 boolean 값으로 바꾸는 것
            // nicknameError => true취급. ! -> false, !! -> true
            disabled={
              isChecking || // 중복 검사 중이거나
              (nickname !== principal?.username && !isNicknameAvailable) || // 닉네임이 바뀌었을 때만 중복 여부 검사
              !!nicknameError || // 닉네임 길이에 에러가 있거나
              !isChanged // 닉네임, 이미지 둘 다 변경사항이 없으면
            }
          >
            {isProfileImgUploading ? "저장중.." : "저장"}
          </button>
        </div>
      </div>
      {isModalOpen && (
        <AlertModal onClose={() => setIsModalOpen(false)}>
          <BiSolidMessageSquareError
            size={"60px"}
            style={{ fill: "#ff4d4d" }}
          />
          <strong>5MB이내의 사진만 업로드 가능합니다.</strong>
        </AlertModal>
      )}
    </>
  );
}

export default ProfileEditForm;
