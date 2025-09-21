/** @jsxImportSource @emotion/react */
import { formatDate } from "../../../utils/dateUtils";
import * as s from "./styles";
import { FiCalendar, FiMail, FiSettings } from "react-icons/fi";
import { FaClipboardList, FaRunning } from "react-icons/fa";

function ProfileView({ principal, setIsEditing }) {
  return (
    <>
      <div css={s.profileImg}>
        <img
          src={`${principal?.profileImgUrl}`}
          onError={(e) => {
            e.target.onerror = null; // 무한 루프 방지
            e.target.src = import.meta.env.VITE_PROFILE_DEFAULT_IMG;
          }}
        />
      </div>
      <div css={s.userInfo}>
        <div css={s.nameEmailGroup}>
          <div css={s.username}>
            {principal?.username}{" "}
            <span onClick={setIsEditing}>
              <FiSettings />
            </span>
          </div>
          <div css={s.email}>
            <FiMail /> {principal?.email}
          </div>
        </div>
        <div css={s.infoGroup}>
          <div css={s.info}>
            <div css={s.label}>
              <FaRunning /> 가입 크루:
            </div>
            {principal?.crewName ? (
              <span css={s.value}>{principal?.crewName}</span>
            ) : (
              "소속된 크루가 없어요."
            )}
          </div>
          <div css={s.info}>
            <div css={s.label}>
              <FaClipboardList /> 올린 피드:
            </div>
            <span css={s.value}>
              {principal?.feedCount}
              <p>개</p>
            </span>
          </div>
          <div css={s.info}>
            <div css={s.label}>
              <FiCalendar /> 가입일:
            </div>
            <span css={s.value}>{formatDate(principal?.createDt)}</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileView;
