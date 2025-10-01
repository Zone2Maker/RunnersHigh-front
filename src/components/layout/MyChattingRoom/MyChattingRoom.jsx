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
    status: null,
  });

  const leaveBtnOnClickHandler = () => {
    setAlertModal({ isOpen: false, message: null, status: null });
    // 탈퇴 API
    leaveCrewReq({ crewId: crewInfo.crewId, userId: principal.userId })
      .then((resp) => {
        if (resp.data.status === "success") {
          setAlertModal(true, "크루를 탈퇴했습니다.", "success");

          // 사용자 정보 무효화
          queryClient.invalidateQueries("principal");
        } else {
          // 탈퇴 실패 모달 띄우기
          setAlertModal(true, resp.data.message, "fail");
        }
      })
      .catch((error) => {
        setAlertModal(
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
        isLeaveModalOpen={isLeaveModalOpen}
        setIsLeaveModalOpen={() => isLeaveModalOpen(true)}
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
        <AlertModal
          onClose={() => {
            setAlertModal({});
          }}
        >
          {alertModal.status === "success" ? (
            <BiSolidMessageSquareCheck size={60} style={{ color: "#125bc8" }} />
          ) : (
            <BiSolidMessageSquareError size={60} style={{ color: "#ff4d4d" }} />
          )}
          <strong>{alertModal.message}</strong>
        </AlertModal>
      )}
    </div>
  );
}

export default MyChattingRoom;
