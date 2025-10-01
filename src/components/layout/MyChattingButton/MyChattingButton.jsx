/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { usePrincipalState } from "../../../stores/usePrincipalState";
import * as s from "./styles";
import { getCrewByCrewReq } from "../../../services/crew/crewApis";
import AlertModal from "../../common/AlertModal/AlertModal";
import { BiSolidMessageSquareError } from "react-icons/bi";
import MyChattingRoom from "../MyChattingRoom/MyChattingRoom";
import { HiOutlineChatBubbleOvalLeftEllipsis } from "react-icons/hi2";
import { IoClose } from "react-icons/io5";

function MyChattingButton() {
  const { principal } = usePrincipalState();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [crewInfo, setCrewInfo] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
      {errorMessage && isModalOpen && (
        <AlertModal onClose={() => setIsModalOpen(false)}>
          <BiSolidMessageSquareError
            size={"60px"}
            style={{ color: "#f57c00" }}
          />
          <strong>{errorMessage}</strong>
        </AlertModal>
      )}
    </>
  );
}

export default MyChattingButton;
