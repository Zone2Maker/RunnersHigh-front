/** @jsxImportSource @emotion/react */
import { FaMapMarkerAlt } from "react-icons/fa";
import * as s from "./styles";
import { IoPeopleOutline } from "react-icons/io5";
import { useState } from "react";
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
import CrewDetailModal from "./CrewDetailModal/CrewDetailModal";

function CrewCard({ crew }) {
  const { principal } = usePrincipalState();
  const isFull = crew.currentMembers === crew.maxMembers;
  const [isCrewDetailModalOpen, setIsCrewDetailModalOpen] = useState(false);
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
      }

      setCrewDetail(reponse.data.data);
      setIsCrewDetailModalOpen(true);
    });
  };

  const imageErrorHandler = (crewId) => {
    setImageErrors((prev) => new Set(prev).add(crewId));
  };

  const joinOnClickHandler = () => {
    if (!principal) {
      setErrorMessage("크루에 가입하고 싶다면 로그인을 진행해주세요.");
      setIsAlertModalOpen(true);
    }

    if (principal.crewId !== null) {
      setErrorMessage("이미 함께하는 크루가 있어요!");
      setIsAlertModalOpen(true);
      return;
    }

    joinCrewReq({
      crewId: crewDetail.crewId,
      userId: principal?.userId,
    })
      .then((response) => {
        if (response.data.status === "failed") {
          setErrorMessage(response.data.message);
          setIsAlertModalOpen(true);
          return;
        }
        setSuccessMessage(response.data.message);
        queryClient.invalidateQueries(["getPrincipal"]);
      })
      .catch((error) => {
        setErrorMessage(error.response?.data?.message);
        setIsAlertModalOpen(true);
      });
  };

  return (
    <>
      <div css={s.card(isFull)} onClick={handleOpenModal}>
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
          <div css={s.regionAndMemberBox}>
            <div css={s.region}>
              <span>
                <FaMapMarkerAlt />
              </span>
              <span>{crew.crewRegion}</span>
            </div>
            <div css={s.seperator}></div>
            <div css={s.member}>
              <IoPeopleOutline />
              <span>{crew.currentMembers}</span>/<span>{crew.maxMembers}</span>
            </div>
          </div>
          <div css={s.crewName}>{crew.crewName}</div>
          <div css={s.crewDetail}>{crew.crewDetail}</div>
        </div>
      </div>
      {!errorMessage && isCrewDetailModalOpen && (
        <CrewDetailModal
          crew={crewDetail}
          isOpen={isCrewDetailModalOpen}
          onClose={() => setIsCrewDetailModalOpen(false)}
          onJoinClick={joinOnClickHandler}
        />
      )}
      {errorMessage && !principal && (
        <AlertModal onClose={() => navigate("/login")}>
          <BiSolidMessageSquareError
            size={"60px"}
            style={{ color: "#f57c00" }}
          />
          <strong>{errorMessage}</strong>
        </AlertModal>
      )}
      {errorMessage && isAlertModalOpen && (
        <AlertModal onClose={() => setIsAlertModalOpen(false)}>
          <BiSolidMessageSquareError
            size={"60px"}
            style={{ color: "#f57c00" }}
          />
          <strong>{errorMessage}</strong>
        </AlertModal>
      )}
      {successMessage && (
        <AlertModal onClose={() => navigate("/")}>
          <BiSolidMessageSquareCheck
            size={"60px"}
            style={{ color: "#00296b" }}
          />
          <strong>{successMessage}</strong>
          <p>채팅창에 접속하여 크루 활동을 시작하세요.</p>
        </AlertModal>
      )}
    </>
  );
}

export default CrewCard;
