import { useState } from "react";
import * as s from "./styles";
import { IoPeopleOutline } from "react-icons/io5";
import { FiCalendar } from "react-icons/fi";
import { FaMapMarkerAlt } from "react-icons/fa";
import { SlPicture } from "react-icons/sl";

/** @jsxImportSource @emotion/react */
function CrewDetailModal({ crew, isOpen, onClose, onJoinClick }) {
  const [isImageError, setIsImageError] = useState(false);
  if (!isOpen || !crew) {
    return null;
  }

  const contentOnClickHandler = (e) => {
    e.stopPropagation();
  };

  return (
    <div css={s.backdrop} onClick={onClose}>
      <div css={s.container} onClick={contentOnClickHandler}>
        <div css={s.imageBox}>
          {isImageError ? (
            <div css={s.noImgBox}>
              <SlPicture />
              <div>이미지를 불러올 수 없습니다.</div>
            </div>
          ) : (
            <img
              src={crew.crewImgUrl}
              alt="크루 대표사진"
              onError={() => setIsImageError(true)}
            />
          )}
        </div>
        <div css={s.contentBox}>
          <div css={s.crewLeaderBox}>
            <div css={s.profileImgBox}>
              <img src={crew.profileImgUrl} />
            </div>
            <div css={s.crewLeader}>
              <span>크루장</span>
              <span>{crew.nickname}</span>
            </div>
          </div>
          <h2 css={s.crewName}>{crew.crewName}</h2>
          <p css={s.crewDetail}>{crew.crewDetail}</p>
          <div css={s.crewInfoGrid}>
            <div css={s.metaItem}>
              <IoPeopleOutline />
              <strong>
                {crew.currentMembers} / {crew.maxMembers}
              </strong>
              <span>멤버</span>
            </div>
            <div css={s.metaItem}>
              <FaMapMarkerAlt />
              <strong>{crew.crewRegion}</strong>
              <span>활동 지역</span>
            </div>
            <div css={s.metaItem}>
              <FiCalendar />
              <strong>{crew.createDt.split("T")[0]}</strong>
              <span>생성일</span>
            </div>
          </div>
          <div css={s.joinBtn} onClick={onJoinClick}>
            <span>참여하기</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CrewDetailModal;
