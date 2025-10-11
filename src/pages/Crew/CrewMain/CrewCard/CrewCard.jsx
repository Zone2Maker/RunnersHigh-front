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
import { SlPicture } from "react-icons/sl";
import { queryClient } from "../../../../configs/queryClient";
import { usePrincipalState } from "../../../../stores/usePrincipalState";
import { useNavigate } from "react-router-dom";
import CrewDetailModal from "./CrewDetailModal/CrewDetailModal";

function CrewCard({ crew }) {
  const { principal } = usePrincipalState();
  const isFull = crew.currentMembers === crew.maxMembers;
  const [isCrewDetailModalOpen, setIsCrewDetailModalOpen] = useState(false);
  const [crewDetail, setCrewDetail] = useState({});
  const [imageErrors, setImageErrors] = useState(new Set());
  const navigate = useNavigate();

  const [alertModal, setAlertModal] = useState({
    isOpen: false,
    message: "",
    subMessage: "",
    status: "",
  });

  const cardOnClickHandler = () => {
    getCrewByCrewReq(crew.crewId).then((reponse) => {
      if (reponse.data.status === "failed") {
        openModal(reponse.data.message, "", "fail");
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
      openModal("크루에 가입하고 싶다면 로그인을 진행해주세요.", "", "fail");
    }

    if (principal.crewId !== null) {
      openModal(
        "이미 함께하는 크루가 있어요!",
        "한 러너는 오직 하나의 크루에만 소속될 수 있습니다.",
        "fail"
      );
      return;
    }

    joinCrewReq({
      crewId: crewDetail.crewId,
      userId: principal?.userId,
    })
      .then((response) => {
        if (response.data.status === "failed") {
          openModal(response.data.message, "다시 시도해주세요.", "fail");
          return;
        }

        openModal(response.data.message, "", "success");
        queryClient.invalidateQueries(["getPrincipal"]);
      })
      .catch((error) => {
        openModal(error.response?.data?.message, "다시 시도해주세요.", "fail");
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
      <div css={s.card(isFull)} onClick={cardOnClickHandler}>
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
      {!alertModal.isOpen && isCrewDetailModalOpen && (
        <CrewDetailModal
          crew={crewDetail}
          isOpen={isCrewDetailModalOpen}
          onClose={() => setIsCrewDetailModalOpen(false)}
          onJoinClick={joinOnClickHandler}
        />
      )}
      {alertModal.isOpen && (
        <AlertModal
          alertModal={alertModal}
          onClose={() => {
            if (!principal) {
              navigate("/login");
            } else if (alertModal.status === "success") {
              navigate("/");
            } else {
              closeModal();
            }
          }}
        />
      )}
    </>
  );
}

export default CrewCard;
