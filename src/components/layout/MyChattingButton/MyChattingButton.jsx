/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { usePrincipalState } from "../../../stores/usePrincipalState";
import * as s from "./styles";
import { getCrewByCrewReq } from "../../../services/crew/crewApis";
import { LiaTimesSolid } from "react-icons/lia";
import { MdCircle } from "react-icons/md";
import AlertModal from "../../common/AlertModal/AlertModal";
import { BiSolidMessageSquareError } from "react-icons/bi";
import MyChattingRoom from "../MyChattingRoom/MyChattingRoom";

function MyChattingButton({ message }) {
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
    setIsChatOpen(!isChatOpen);
    getCrewByCrewReq(principal.crewId).then((response) => {
      if (response.data.status === "failed") {
        setErrorMessage(response.data.message);
        setIsModalOpen(true);
        setIsChatOpen(false);
        return;
      }
      setCrewInfo(response.data.data);
    });
  };

  return (
    <>
      {isChatOpen && (
        <MyChattingRoom
          message={message}
          crewInfo={crewInfo}
          isChatOpen={isChatOpen}
        />
      )}
      <div css={s.btn} onClick={chatBtnOnClickHandler}>
        {isChatOpen ? (
          <div css={s.openChattingBtn}>
            <LiaTimesSolid />
          </div>
        ) : (
          <div css={s.closeChattingBtn}>
            {message && <MdCircle />}
            <p>채팅</p>
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
