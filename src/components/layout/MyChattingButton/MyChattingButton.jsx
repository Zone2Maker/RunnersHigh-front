/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { usePrincipalState } from "../../../stores/usePrincipalState";
import * as s from "./styles";
import { getCrewByCrewReq } from "../../../services/crew/crewApis";
import AlertModal from "../../common/AlertModal/AlertModal";
import MyChattingRoom from "../MyChattingRoom/MyChattingRoom";
import { HiOutlineChatBubbleOvalLeftEllipsis } from "react-icons/hi2";
import { IoClose } from "react-icons/io5";

function MyChattingButton() {
  const { principal } = usePrincipalState();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [crewInfo, setCrewInfo] = useState("");

  const [alertModal, setAlertModal] = useState({
    isOpen: false,
    message: "",
    subMessage: "",
    status: "",
  });

  const chatBtnOnClickHandler = () => {
    getCrewByCrewReq(principal.crewId)
      .then((response) => {
        if (response.data.status === "failed") {
          openModal(response.data.message, "다시 시도해주세요.", "fail");
          return;
        }
        setCrewInfo(response.data.data);
        setIsChatOpen(!isChatOpen);
      })
      .catch((error) => {
        openModal("서버에 오류가 발생했습니다.", "다시 시도해주세요.", "fail");
      });
  };

  const openModal = (message, subMessage, status) => {
    setAlertModal({ isOpen: true, message, subMessage, status });
  };

  const closeModal = () => {
    setAlertModal({ isOpen: false, message: "", subMessage: "", status: "" });
  };

  return (
    <>
      {isChatOpen && (
        <MyChattingRoom
          // pendingMessageList={pendingMessageList}
          // setPendingMessageList={setPendingMessageList}
          crewInfo={crewInfo}
          isChatOpen={isChatOpen}
          setIsChatOpen={() => setIsChatOpen(false)}
        />
      )}
      <div css={s.btn(isChatOpen)} onClick={chatBtnOnClickHandler}>
        {isChatOpen ? (
          <div css={s.closeBtn}>
            <IoClose />
          </div>
        ) : (
          <div css={s.openBtn}>
            {/* {pendingMessageList.length > 0 && <MdCircle css={s.dot} />} */}
            <HiOutlineChatBubbleOvalLeftEllipsis css={s.bubble} />
          </div>
        )}
      </div>
      {alertModal.isOpen && (
        <AlertModal alertModal={alertModal} onClose={closeModal} />
      )}
    </>
  );
}

export default MyChattingButton;
