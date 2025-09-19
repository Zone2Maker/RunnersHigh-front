/** @jsxImportSource @emotion/react */
import { FaMapMarkerAlt } from "react-icons/fa";
import * as s from "./styles";
import { IoPersonOutline } from "react-icons/io5";

function CrewCard({ crew, isLoading }) {
  const isFull = crew.currentMembers === crew.maxMembers;

  return (
    <>
      {isLoading ? (
        <div css={s.card}>스켈레톤</div>
      ) : (
        <div
          css={[
            s.card,
            isFull && {
              opacity: "0.5",
              pointerEvents: "none", // 클릭 막기
              cursor: "not-allowed",
            },
          ]}
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
            <p>{crew.crewDetail}</p>
          </div>
        </div>
      )}
    </>
  );
}

export default CrewCard;
