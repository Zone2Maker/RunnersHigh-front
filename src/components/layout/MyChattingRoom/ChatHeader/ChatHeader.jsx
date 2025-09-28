/** @jsxImportSource @emotion/react */
import { IoExitOutline, IoPeopleOutline } from "react-icons/io5";
import * as s from "./styles";

function ChatHeader({ crewInfo, isLeaveConfirmOpen, setIsLeaveConfirmOpen }) {
  return (
    <div css={s.chatHeader(isLeaveConfirmOpen)}>
      <div css={s.crewProfile}>
        <img src={crewInfo.crewImgUrl} alt="크루 대표사진" />
        <div css={s.crewInfo}>
          <span>{crewInfo.crewName}</span>
          <span>
            <IoPeopleOutline size={12} /> {crewInfo.currentMembers}
          </span>
        </div>
      </div>
      <IoExitOutline onClick={setIsLeaveConfirmOpen} />
    </div>
  );
}

export default ChatHeader;
