/** @jsxImportSource @emotion/react */
import { FaMapMarkerAlt } from "react-icons/fa";
import * as s from "./styles";
import { IoPersonOutline } from "react-icons/io5";
import { useState } from "react";
import PromptModal from "../../../../components/common/PromptModal/PromptModal";
import {
  getCrewByCrewReq,
  joinCrewReq,
} from "../../../../services/crew/crewApis";
import AlertModal from "../../../../components/common/AlertModal/AlertModal";
import {
  BiSolidMessageSquareCheck,
  BiSolidMessageSquareError,
} from "react-icons/bi";
import { SlPicture } from "react-icons/sl";
import { queryClient } from "../../../../configs/queryClient";
import { usePrincipalState } from "../../../../stores/usePrincipalState";
import { useNavigate } from "react-router-dom";

function CrewCard({ crew }) {
  const { principal } = usePrincipalState();
  const isFull = crew.currentMembers === crew.maxMembers;
  const [isPromptModalOpen, setIsPromptModalOpen] = useState(false);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [crewDetail, setCrewDetail] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [imageErrors, setImageErrors] = useState(new Set());
  const navigate = useNavigate();

  const handleOpenModal = () => {
    getCrewByCrewReq(crew.crewId).then((reponse) => {
      if (reponse.data.status === "failed") {
        setErrorMessage(reponse.data.message);
        console.log(reponse.data.message);
      }

      setCrewDetail(reponse.data.data);
      setIsPromptModalOpen(true);
    });
  };

  const imageErrorHandler = (crewId) => {
    setImageErrors((prev) => new Set(prev).add(crewId));
  };

  const joinOnClickHandler = () => {
    joinCrewReq({
      crewId: crewDetail.crewId,
      userId: principal?.userId,
    })
      .then((response) => {
        if (response.data.status === "failed") {
          setErrorMessage(response.data.message);
          isAlertModalOpen(true);
          return;
        }
        setSuccessMessage(response.data.message);
        queryClient.invalidateQueries(["getPrincipal"]);
      })
      .catch((error) => {
        setErrorMessage(error.response?.data?.message);
        isAlertModalOpen(true);
      });
  };

  return (
    <>
      <div
        css={[
          s.card,
          isFull && {
            opacity: "0.5",
            pointerEvents: "none",
            cursor: "not-allowed",
          },
        ]}
        onClick={handleOpenModal}
      >
        {imageErrors.has(crew.crewId) ? (
          <div css={s.noImgBox}>
            <SlPicture />
            <p>이미지를 불러올 수 없습니다</p>
          </div>
        ) : (
          <div css={s.imgBox}>
            <img
              src={crew.crewImgUrl}
              alt="크루 대표사진"
              onError={() => {
                imageErrorHandler(crew.crewId);
              }}
            />
          </div>
        )}
        <div css={s.contentBox}>
          <span>
            <FaMapMarkerAlt size={"9px"} />
            {crew.crewRegion}
          </span>
          <div>
            <p>{crew.crewName}</p>
            <div>
              <IoPersonOutline size={"11px"} />
              <span>{crew.currentMembers}</span>/<span>{crew.maxMembers}</span>
            </div>
          </div>
          {crew.crewDetail.length > 18 ? (
            <p>{crew.crewDetail.slice(0, 18)}...</p>
          ) : (
            <p>{crew.crewDetail}</p>
          )}
        </div>
      </div>
      {!errorMessage && isPromptModalOpen && (
        <PromptModal onClose={() => setIsPromptModalOpen(false)}>
          <div css={s.cardDetail}>
            <div>
              {imageErrors.has(crewDetail.crewId) ? (
                <div css={s.cardDetailNoImgBox}>
                  <SlPicture />
                  <p>이미지를 불러올 수 없습니다</p>
                </div>
              ) : (
                <div css={s.cardDetailImgBox}>
                  <img
                    src={crewDetail.crewImgUrl}
                    alt="크루 대표사진"
                    onError={() => {
                      imageErrorHandler(crewDetail.crewId);
                    }}
                  />
                </div>
              )}
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
              <button onClick={joinOnClickHandler}>참여하기</button>
            </div>
          </div>
        </PromptModal>
      )}
      {!principal && (
        <AlertModal onClose={() => navigate("/login")}>
          <BiSolidMessageSquareError
            size={"60px"}
            style={{ color: "#ff4d4d" }}
          />
          <strong>크루에 가입하고 싶다면 로그인을 진행해주세요.</strong>
        </AlertModal>
      )}
      {errorMessage && isAlertModalOpen && (
        <AlertModal onClose={() => setIsAlertModalOpen(false)}>
          <BiSolidMessageSquareError
            size={"60px"}
            style={{ color: "#ff4d4d" }}
          />
          <strong>{errorMessage}</strong>
        </AlertModal>
      )}
      {successMessage && (
        <AlertModal onClose={() => navigate("/")}>
          <BiSolidMessageSquareCheck
            size={"60px"}
            style={{ color: "#125bc8" }}
          />
          <strong>{successMessage}</strong>
          <p>채팅창에 접속하여 크루 활동을 시작하세요.</p>
        </AlertModal>
      )}
    </>
  );
}

export default CrewCard;
