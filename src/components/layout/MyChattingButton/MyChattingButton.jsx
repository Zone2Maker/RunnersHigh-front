/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { usePrincipalState } from "../../../stores/usePrincipalState";
import * as s from "./styles";
import { getCrewByCrewReq } from "../../../services/crew/crewApis";
import { MdCircle } from "react-icons/md";
import AlertModal from "../../common/AlertModal/AlertModal";
import { BiSolidMessageSquareError } from "react-icons/bi";
import MyChattingRoom from "../MyChattingRoom/MyChattingRoom";
import { HiOutlineChatBubbleOvalLeftEllipsis } from "react-icons/hi2";
import { IoClose } from "react-icons/io5";

function MyChattingButton({ pendingMessageList, setPendingMessageList }) {
  const { principal } = usePrincipalState();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [crewInfo, setCrewInfo] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  //   const [unreadMessageCnt, setUnreadMessageCnt] = useState(0);

  // getUnreadMessageCountReq(principal?.crewId).then((response) => {
  //   console.log(response.data.data);
  //   setUnreadMessageCnt(response.data.data);
  // });

  const chatBtnOnClickHandler = () => {
    getCrewByCrewReq(principal.crewId).then((response) => {
      if (response.data.status === "failed") {
        setErrorMessage(response.data.message);
        setIsModalOpen(true);
        setIsChatOpen(false);
        return;
      }
      setCrewInfo(response.data.data);
    });

    setIsChatOpen(!isChatOpen);
  };

  return (
    <>
      {isChatOpen && (
        <MyChattingRoom
          pendingMessageList={pendingMessageList}
          setPendingMessageList={setPendingMessageList}
          crewInfo={crewInfo}
          isChatOpen={isChatOpen}
          setIsChatOpen={setIsChatOpen}
        />
      )}
      <div css={s.btn(isChatOpen)} onClick={chatBtnOnClickHandler}>
        {isChatOpen ? (
          <div css={s.closeBtn}>
            <IoClose />
          </div>
        ) : (
          <div css={s.openBtn}>
            {pendingMessageList.length > 0 && <MdCircle css={s.dot} />}
            <HiOutlineChatBubbleOvalLeftEllipsis css={s.bubble} />
          </div>
        )}
      </div>
      {errorMessage && isModalOpen && (
        <AlertModal onClose={() => setIsModalOpen(false)}>
          <BiSolidMessageSquareError
            size={"60px"}
            style={{ color: "#ff4d4d" }}
          />
          <strong>{errorMessage}</strong>
        </AlertModal>
      )}
    </>
  );
}

export default MyChattingButton;
