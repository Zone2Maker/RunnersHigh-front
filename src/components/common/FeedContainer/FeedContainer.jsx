/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import { FaHeart } from "react-icons/fa";
import { useState } from "react";
import { SlPicture } from "react-icons/sl";
import { queryClient } from "../../../configs/queryClient";
import FeedDetailModal from "../FeedDetailModal/FeedDetailModal";

function FeedContainer({ feeds, isLoading }) {
  const [imageErrors, setImageErrors] = useState(new Set());

  const [selectedFeedId, setSelectedFeedId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const imageErrorHandler = (feedId) => {
    setImageErrors((prev) => new Set(prev).add(feedId));
  };

  const openModal = (feedId) => {
    setSelectedFeedId(feedId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFeedId(null);
    queryClient.invalidateQueries({ queryKey: ["feeds"], exact: false });
  };

  return (
    <div css={s.container}>
      {!isLoading && (
        <>
          {feeds.length > 0 ? (
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
            ))
          ) : (
            <div css={s.empty}>
              <h2>아직 등록된 피드가 없습니다.</h2>
              <p>러너들에게 일상을 공유해보세요!</p>
            </div>
          )}
        </>
      )}
      {isModalOpen && (
        <FeedDetailModal
          isOpen={isModalOpen}
          feedId={selectedFeedId}
          onClose={closeModal}
        />
      )}
    </div>
  );
}

export default FeedContainer;
