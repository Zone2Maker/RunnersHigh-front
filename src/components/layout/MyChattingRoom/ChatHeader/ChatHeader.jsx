/** @jsxImportSource @emotion/react */
import { IoExitOutline, IoPeopleOutline } from "react-icons/io5";
import * as s from "./styles";
import { usePrincipalState } from "../../../../stores/usePrincipalState";

function ChatHeader({ crewInfo, isLeaveModalOpen, setIsLeaveModalOpen ,isDeleteModalOpen, setIsDeleteModalOpen }) {
  const { principal } = usePrincipalState();

  return (
    <div css={s.chatHeader(isLeaveModalOpen, isDeleteModalOpen)}>
      <div css={s.crewProfile}>
        <img src={crewInfo.crewImgUrl} alt="크루 대표사진" />
        <div css={s.crewInfo}>
          <span>{crewInfo.crewName}</span>
          <span>
            <IoPeopleOutline size={12} /> {crewInfo.currentMembers}
          </span>
        </div>
      </div>
      {principal.userId === crewInfo.userId ? (
        <IoExitOutline onClick={setIsDeleteModalOpen} />
      ) : (
        <IoExitOutline onClick={setIsLeaveModalOpen} />
      )}
    </div>
  );
}

export default ChatHeader;
