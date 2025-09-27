/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import { FaHeart } from "react-icons/fa";
import PromptModal from "../PromptModal/PromptModal";
import { useState } from "react";
import { getFeedDetailReq } from "../../../services/feed/feedApis";
import { SlPicture } from "react-icons/sl";
import { addLikeReq, removeLikeReq } from "../../../services/like/likeApis";
import { usePrincipalState } from "../../../stores/usePrincipalState";
import { queryClient } from "../../../configs/queryClient";
import FeedDetailModal from "../FeedDetailModal/FeedDetailModal";

function FeedContainer({ feeds, isLoading }) {
  const { principal } = usePrincipalState();
  const [feedDetail, setFeedDetail] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [originLike, setOriginLike] = useState(null);
  const [newLike, setNewLike] = useState(null);
  const [likeCount, setLikeCount] = useState(0);
  const [imageErrors, setImageErrors] = useState(new Set());

  const openModal = (feedId) => {
    setFeedDetail(null); // 상태 초기화
    setOriginLike(null);
    setNewLike(null);
    setLikeCount(0);

    getFeedDetailReq(feedId)
      .then((resp) => {
        if (resp.data.status === "success") {
          const data = resp.data.data;
          setFeedDetail(data);
          setOriginLike(data.isLikedByUser);
          setNewLike(data.isLikedByUser);
          setLikeCount(data.likeCount);
          setIsModalOpen(true);
        } else if (resp.data.status === "failed") {
          console.log(resp.data.message);
        }
      })
      .catch((error) => {
        alert("서버 오류가 발생했습니다. 잠시후 다시 시도해주세요.");
        return;
      });
  };

  const closeModal = async () => {
    // 좋아요 상태가 변경되었을 때 호출
    if (newLike !== originLike) {
      try {
        if (newLike === true) {
          // 좋아요 추가 API 호출
          await addLikeReq({
            feedId: feedDetail.feedId,
            userId: principal.userId,
          });
        } else {
          // 좋아요 삭제 API 호출
          await removeLikeReq({
            feedId: feedDetail.feedId,
            userId: principal.userId,
          });
        }
      } catch (error) {
        console.error("좋아요 상태 변경 실패:", error);
      } finally {
        queryClient.invalidateQueries({ queryKey: ["feeds"], exact: false });
      }
    }

    setFeedDetail(null);
    setIsModalOpen(false);
  };

  const imageErrorHandler = (feedId) => {
    setImageErrors((prev) => new Set(prev).add(feedId));
  };

  // 보여지는 상태만 변경하고
  // DB에 반영은 모달 닫을 때 수행
  const heartOnClickHandler = () => {
    if (newLike === true) {
      // 좋아요였던 상태
      // 좋아요 취소하면 -1
      setLikeCount((prev) => prev - 1);
    } else {
      // 좋아요가 아니었던 상태
      // 좋아요 누르면 +1
      setLikeCount((prev) => prev + 1);
    }
    setNewLike(!newLike);
  };

  return (
    <div css={s.container}>
      {!isLoading &&
        feeds?.map((feed) => (
          <div
            css={s.feedItem}
            key={feed.feedId}
            onClick={() => openModal(feed.feedId)}
          >
            {imageErrors.has(feed.feedId) ? (
              <div css={s.feedNoImageBox}>
                <SlPicture />
                <p>이미지를 불러올 수 없습니다</p>
              </div>
            ) : (
              <>
                <img
                  src={feed.feedImgUrl}
                  css={s.feedImage}
                  onError={() => {
                    imageErrorHandler(feed.feedId);
                  }}
                />
                <div css={s.likeInfo}>
                  <FaHeart css={s.heartIcon(feed?.isLikedByUser)} />
                  <p css={s.likeCount}>{feed.likeCount}</p>
                </div>
              </>
            )}
          </div>
        ))}
      {isModalOpen && feedDetail && (
        <FeedDetailModal
          isOpen={isModalOpen}
          feedDetail={feedDetail}
          newLike={newLike}
          likeCount={likeCount}
          imageErrors={imageErrors}
          onClose={closeModal}
          onHeartClick={heartOnClickHandler}
        />
      )}
    </div>
  );
}

export default FeedContainer;
