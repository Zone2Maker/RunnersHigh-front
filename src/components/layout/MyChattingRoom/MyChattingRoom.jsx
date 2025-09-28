/** @jsxImportSource @emotion/react */
import { useState } from "react";
import * as s from "./styles";
import { usePrincipalState } from "../../../stores/usePrincipalState";
import { leaveCrewReq } from "../../../services/crew/crewApis";
import { queryClient } from "../../../configs/queryClient";
import AlertModal from "../../common/AlertModal/AlertModal";
import ChatHeader from "./ChatHeader/ChatHeader";
import ChatMain from "./ChatMain/ChatMain";
import ChatFooter from "./ChatFooter/ChatFooter";

function MyChattingRoom({
  pendingMessageList,
  setPendingMessageList,
  crewInfo,
  isChatOpen,
  setIsChatOpen,
}) {
  const { principal } = usePrincipalState();
  const [isLeaveConfirmOpen, setIsLeaveConfirmOpen] = useState(false);
  const [openModal, setOpenModal] = useState({
    isOpen: false,
    message: "",
    status: null,
  });

  const leaveBtnOnClickHandler = () => {
    setOpenModal({ isOpen: false, message: null, status: null });
    // 탈퇴 API
    leaveCrewReq({ crewId: crewInfo.crewId, userId: principal.userId })
      .then((resp) => {
        if (resp.data.status === "success") {
          setOpenModal(true, "크루를 탈퇴했습니다.", "success");

          // 사용자 정보 무효화
          queryClient.invalidateQueries("principal");
        } else {
          // 탈퇴 실패 모달 띄우기
          setOpenModal(true, resp.data.message, "fail");
        }
      })
      .catch((error) => {
        console.error("서버 오류 발생");
        setOpenModal(
          true,
          "서버에 오류가 발생했습니다. 다시 시도해주세요.",
          "fail"
        );
      });
    isChatOpen(false);
  };

  return (
    <div css={s.chatContainer(isChatOpen)}>
      <ChatHeader
        crewInfo={crewInfo}
        isLeaveConfirmOpen={isLeaveConfirmOpen}
        setIsLeaveConfirmOpen={() => setIsLeaveConfirmOpen(true)}
      />
      <ChatMain
        isLeaveConfirmOpen={isLeaveConfirmOpen}
        setIsChatOpen={() => {
          setIsChatOpen(false);
        }}
      />

      <ChatFooter
        crewId={crewInfo.crew}
        isLeaveConfirmOpen={isLeaveConfirmOpen}
      />

      {/* 탈퇴 버튼 */}
      {isLeaveConfirmOpen && (
        <div css={s.leaveConfirm}>
          <p>크루를 탈퇴하시겠습니까?</p>
          <div css={s.btnContainer}>
            <button
              css={[s.confirmBtn, s.cancelBtn]}
              onClick={() => setIsLeaveConfirmOpen(false)}
            >
              취소
            </button>
            <button
              css={[s.confirmBtn, s.leaveBtn]}
              onClick={leaveBtnOnClickHandler}
            >
              탈퇴
            </button>
          </div>
        </div>
      )}

      {openModal.isOpen && (
        <AlertModal
          onClose={() => {
            setOpenModal({});
          }}
        >
          {openModal.status === "success" ? (
            <BiSolidMessageSquareCheck size={60} style={{ color: "#125bc8" }} />
          ) : (
            <BiSolidMessageSquareError size={60} style={{ color: "#ff4d4d" }} />
          )}
          <strong>{openModal.message}</strong>
        </AlertModal>
      )}
    </div>
  );
}

export default MyChattingRoom;
