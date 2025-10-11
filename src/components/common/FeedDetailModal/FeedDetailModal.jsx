/** @jsxImportSource @emotion/react */
import * as s from "./styles.js";
import PromptModal from "../PromptModal/PromptModal.jsx";
import AlertModal from "../AlertModal/AlertModal.jsx";
import { FaHeart } from "react-icons/fa";
import { SlPicture } from "react-icons/sl";
import { usePrincipalState } from "../../../stores/usePrincipalState.js";
import { useEffect, useState } from "react";
import { getFeedDetailReq } from "../../../services/feed/feedApis.js";
import { addLikeReq, removeLikeReq } from "../../../services/like/likeApis.js";
import { CiLocationOn } from "react-icons/ci";

function FeedDetailModal({ isOpen, feedId, onClose }) {
  const { principal } = usePrincipalState();
  const [feedDetail, setFeedDetail] = useState(null);
  const [newLike, setNewLike] = useState(null);
  const [originLike, setOriginLike] = useState(null);
  const [likeCount, setLikeCount] = useState(0);
  const [isImageError, setIsImageError] = useState(false);

  const [alertModal, setAlertModal] = useState({
    isOpen: false,
    message: "",
    status: "",
  });

  useEffect(() => {
    if (!feedId) {
      setFeedDetail(null);
      return;
    }

    getFeedDetailReq(feedId)
      .then((resp) => {
        if (resp.data.status === "success") {
          const data = resp.data.data;
          setFeedDetail(data);
          setOriginLike(data.isLikedByUser);
          setNewLike(data.isLikedByUser);
          setLikeCount(data.likeCount);
        } else if (resp.data.status === "failed") {
          setAlertModal({
            isOpen: true,
            message: resp.data.message,
            status: "fail",
          });
        }
      })
      .catch((error) => {
        setAlertModal({
          isOpen: true,
          message: "서버 오류가 발생했습니다. 잠시후 다시 시도해주세요.",
          status: "fail",
        });
        return;
      });
  }, [feedId]);

  const closeModalHandler = async () => {
    if (newLike !== originLike) {
      try {
        const likeData = {
          feedId: feedDetail.feedId,
          userId: principal.userId,
        };
        if (newLike === true) {
          // 좋아요 추가 API 호출
          await addLikeReq(likeData);
        } else {
          // 좋아요 삭제 API 호출
          await removeLikeReq(likeData);
        }
      } catch (error) {
        console.error("좋아요 상태 변경 실패:", error);
      }
    }
    onClose();
  };

  const heartOnClickHandler = () => {
    if (!principal) {
      setAlertModal({
        isOpen: true,
        message: "로그인 후 이용 가능한 서비스입니다.",
        status: "fail",
      });
      return;
    }

    // 좋아요였던 상태면 -1, 아니면 +1
    setLikeCount((prev) => (newLike ? prev - 1 : prev + 1));
    setNewLike(!newLike);
  };

  if (!isOpen || !feedDetail) return null;

  return (
    <>
      <PromptModal onClose={closeModalHandler}>
        <div css={s.userInfoContainer}>
          <div css={s.profileContainer}>
            <div>
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
            <div css={s.userLocation}>
              <CiLocationOn /> {feedDetail?.feedLocation}
            </div>
          </div>
        </div>

        <div css={s.photoContainer}>
          {isImageError ? (
            <div css={s.feedDetailNoImageBox}>
              <SlPicture />
              <p>이미지를 불러올 수 없습니다</p>
            </div>
          ) : (
            <img
              src={feedDetail.feedImgUrl}
              onError={() => setIsImageError(true)}
              css={s.feedPhotoDetail}
            />
          )}
        </div>

        <div css={s.modalLikeInfo}>
          <div>
            <FaHeart
              css={s.modalHeartIcon(newLike)}
              onClick={heartOnClickHandler}
            />
          </div>
          <div css={s.modalLikeCount}>
            <p>{(likeCount ?? 0).toLocaleString("en-AU")} </p>{" "}
            <span>likes</span>
          </div>
        </div>
      </PromptModal>
      {alertModal.isOpen && (
        <AlertModal
          alertModal={alertModal}
          onClose={() =>
            setAlertModal({
              isOpen: false,
              message: "",
              status: "",
            })
          }
        />
      )}
    </>
  );
}

export default FeedDetailModal;
