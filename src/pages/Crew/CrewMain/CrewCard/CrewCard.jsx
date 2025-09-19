/** @jsxImportSource @emotion/react */
import { FaMapMarkerAlt } from "react-icons/fa";
import * as s from "./styles";
import { IoPersonOutline } from "react-icons/io5";
import { useState } from "react";
import PromptModal from "../../../../components/common/PromptModal/PromptModal";
import { getCrewByCrewReq } from "../../../../services/crew/crewApis";
import AlertModal from "../../../../components/common/AlertModal/AlertModal";
import { BiSolidMessageSquareError } from "react-icons/bi";

function CrewCard({ crew, isLoading }) {
  const isFull = crew.currentMembers === crew.maxMembers;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [crewDetail, setCrewDetail] = useState({});
  const [errorMassage, setErrorMessage] = useState("");

  const handleOpenModal = () => {
    getCrewByCrewReq(crew.crewId).then((reponse) => {
      if (reponse.data.status === "failed") {
        setErrorMessage(reponse.data.message);
        console.log(reponse.data.message);
      }

      setCrewDetail(reponse.data.data);
      setIsModalOpen(true);
    });
  };

  return (
    <>
      {isLoading ? (
        <div css={s.card}>스켈레톤</div>
      ) : (
        <>
          <div
            css={[
              s.card,
              isFull && {
                opacity: "0.5",
                pointerEvents: "none", // 클릭 막기
                cursor: "not-allowed",
              },
            ]}
            onClick={handleOpenModal}
          >
            <div css={s.imgBox}>
              <img src={crew.crewImgUrl} alt="crewImg" />
            </div>
            <div css={s.contentBox}>
              <span>
                <FaMapMarkerAlt size={"9px"} />
                {crew.crewRegion}
              </span>
              <div>
                <p>{crew.crewName}</p>
                <div>
                  <IoPersonOutline size={"11px"} />
                  <span>{crew.currentMembers}</span>/
                  <span>{crew.maxMembers}</span>
                </div>
              </div>
              {crew.crewDetail.length > 38 ? (
                <p>{crew.crewDetail.slice(0, 38)}...</p>
              ) : (
                <p>{crew.crewDetail}</p>
              )}
            </div>
          </div>
          {errorMassage ? (
            <AlertModal onClose={() => (window.location.href = "/crew")}>
              <BiSolidMessageSquareError
                size={"60px"}
                style={{ color: "#ff4d4d" }}
              />
              <strong>{errorMassage}</strong>
              <p>다시 시도해주세요.</p>
            </AlertModal>
          ) : (
            isModalOpen && (
              <PromptModal onClose={() => setIsModalOpen(false)}>
                <div css={s.cardDetail}>
                  <div>
                    <div css={s.cardDetailImgBox}>
                      <img src={crewDetail.crewImgUrl} alt="crewImg" />
                    </div>
                    <div css={s.cardDetailContentBox}>
                      <span>
                        <FaMapMarkerAlt size={"11px"} />
                        {crewDetail.crewRegion}
                      </span>
                      <div>
                        <p>{crewDetail.crewName}</p>
                        <div>
                          <IoPersonOutline size={"16px"} />
                          <span>{crewDetail.currentMembers}</span>/
                          <span>{crewDetail.maxMembers}</span>
                        </div>
                      </div>
                      <p>{crewDetail.crewDetail}</p>
                    </div>
                  </div>
                  <div css={s.cardDetailBtnBox}>
                    <button>참여하기</button>
                  </div>
                </div>
              </PromptModal>
            )
          )}
        </>
      )}
    </>
  );
}

export default CrewCard;
