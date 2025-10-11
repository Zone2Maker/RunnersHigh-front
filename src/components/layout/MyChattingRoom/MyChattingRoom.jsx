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
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
  const [alertModal, setAlertModal] = useState({
    isOpen: false,
    message: "",
    subMessage: "",
    status: "",
  });

  const leaveBtnOnClickHandler = () => {
    closeModal();
    // 탈퇴 API
    leaveCrewReq({ crewId: crewInfo.crewId, userId: principal.userId })
      .then((resp) => {
        if (resp.data.status === "success") {
          openModal("크루를 탈퇴했습니다.", "", "success");

          // 사용자 정보 무효화
          queryClient.invalidateQueries("principal");
        } else {
          // 탈퇴 실패 모달 띄우기
          openModal(resp.data.message, "다시 시도해주세요.", "fail");
        }
      })
      .catch((error) => {
        openModal("서버에 오류가 발생했습니다.", "다시 시도해주세요.", "fail");
      });
    setIsChatOpen();
  };

  const openModal = (message, subMessage, status) => {
    setAlertModal({ isOpen: true, message, subMessage, status });
  };

  const closeModal = () => {
    setAlertModal({ isOpen: false, message: "", subMessage: "", status: "" });
  };

  return (
    <div css={s.chatContainer(isChatOpen)}>
      <ChatHeader
        crewInfo={crewInfo}
        isLeaveModalOpen={isLeaveModalOpen}
        setIsLeaveModalOpen={() => setIsLeaveModalOpen(true)}
      />
      <ChatMain
        isLeaveModalOpen={isLeaveModalOpen}
        setIsChatOpen={() => {
          setIsChatOpen(false);
        }}
        setAlertModal={setAlertModal}
      />

      <ChatFooter crewId={crewInfo.crew} isLeaveModalOpen={isLeaveModalOpen} />

      {/* 탈퇴 버튼 */}
      {isLeaveModalOpen && (
        <div css={s.leaveConfirm}>
          <p>크루를 탈퇴하시겠습니까?</p>
          <div css={s.btnContainer}>
            <button
              css={[s.confirmBtn, s.cancelBtn]}
              onClick={() => setIsLeaveModalOpen(false)}
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
      {alertModal.isOpen && (
        <AlertModal alertModal={alertModal} onClose={closeModal} />
      )}
    </div>
  );
}

export default MyChattingRoom;
