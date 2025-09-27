/** @jsxImportSource @emotion/react */
import * as s from "./styles.js";
import PromptModal from "../PromptModal/PromptModal.jsx";
import { FaHeart } from "react-icons/fa";
import { SlPicture } from "react-icons/sl";

function FeedDetailModal({
  isOpen,
  feedDetail,
  newLike,
  likeCount,
  imageErrors,
  onClose,
  onHeartClick,
}) {
  if (!isOpen || !feedDetail) return null;

  return (
    <PromptModal onClose={onClose}>
      <div css={s.userInfoContainer}>
        <div css={s.profileContainer}>
          <div>
            {/* 프로필 이미지 */}
            <img
              src={feedDetail.profileImgUrl}
              onError={(e) => {
                e.target.onerror = null; // 무한 루프 방지
                e.target.src = import.meta.env.VITE_PROFILE_DEFAULT_IMG;
              }}
            />
          </div>
        </div>
        <div css={s.userInfoBox}>
          <div css={s.username}>{feedDetail?.nickname}</div>
          <div css={s.userLocation}>{feedDetail?.feedLocation}</div>
        </div>
      </div>

      {/* 사진 컨테이너 */}
      <div css={s.photoContainer}>
        {imageErrors.has(feedDetail.feedId) ? (
          <div css={s.feedDetailNoImageBox}>
            <SlPicture />
            <p>이미지를 불러올 수 없습니다</p>
          </div>
        ) : (
          <img src={feedDetail.feedImgUrl} css={s.feedPhotoDetail} />
        )}
      </div>

      <div css={s.modalLikeInfo}>
        <div>
          <FaHeart css={s.modalHeartIcon(newLike)} onClick={onHeartClick} />
        </div>
        <div css={s.modalLikeCount}>
          <p>{(likeCount ?? 0).toLocaleString("en-AU")} </p> <span>likes</span>
        </div>
      </div>
    </PromptModal>
  );
}

export default FeedDetailModal;
