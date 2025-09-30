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
import AlertModal from "../AlertModal/AlertModal";
import { BiSolidMessageSquareError } from "react-icons/bi";

function FeedContainer({ feeds, isLoading }) {
  const { principal } = usePrincipalState();
  const [imageErrors, setImageErrors] = useState(new Set());

  const [modal, setModal] = useState({
    isOpen: false,
    message: "",
    type: "",
    data: {},
  });

  const openModal = (feedId) => {
    getFeedDetailReq(feedId)
      .then((resp) => {
        if (resp.data.status === "success") {
          const data = resp.data.data;
          setModal({
            isOpen: true,
            type: "detail",
            message: "",
            data: {
              feedDetail: data,
              originLike: data.isLikedByUser,
              newLike: data.isLikedByUser,
              likeCount: data.likeCount,
            },
          });
        } else if (resp.data.status === "failed") {
          setModal({
            isOpen: true,
            type: "alert",
            message: resp.data.message,
            data: {},
          });
        }
      })
      .catch((error) => {
        setModal({
          isOpen: true,
          type: "alert",
          message: "서버 오류가 발생했습니다. 잠시후 다시 시도해주세요.",
          data: {},
        });
        return;
      });
  };

  const imageErrorHandler = (feedId) => {
    setImageErrors((prev) => new Set(prev).add(feedId));
  };

  // 보여지는 상태만 변경하고
  // DB에 반영은 모달 닫을 때 수행
  const heartOnClickHandler = () => {
    if (!principal) {
      setModal({
        isOpen: true,
        type: "alert",
        message: "로그인 후 이용 가능한 서비스입니다.",
        data: {},
      });
    }
    setModal((prevModal) => ({
      ...prevModal,
      data: {
        ...prevModal.data,
        newLike: !prevModal.data.newLike,
        likeCount: prevModal.data.newLike
          ? prevModal.data.likeCount - 1
          : prevModal.data.likeCount + 1,
      },
    }));
  };

  const closeModal = async () => {
    const { feedDetail, newLike, originLike } = modal.data;

    if (newLike !== originLike) {
      try {
        const requestData = {
          feedId: feedDetail.feedId,
          userId: principal.userId,
        };
        if (newLike) {
          await addLikeReq(requestData);
        } else {
          await removeLikeReq(requestData);
        }
      } catch (error) {
        console.error("좋아요 상태 변경 실패:", error);
      } finally {
        queryClient.invalidateQueries({ queryKey: ["feeds"], exact: false });
      }
    }

    // 모달을 초기 상태로 리셋
    setModal({
      isOpen: false,
      type: "",
      message: "",
      data: { feedDetail: null, originLike: null, newLike: null, likeCount: 0 },
    });
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

      {modal.isOpen && (
        <>
          {modal.type === "detail" && (
            <FeedDetailModal
              isOpen={modal.isOpen}
              feedDetail={modal.data.feedDetail}
              newLike={modal.data.newLike}
              likeCount={modal.data.likeCount}
              imageErrors={imageErrors}
              onClose={closeModal}
              onHeartClick={heartOnClickHandler}
            />
          )}

          {modal.type === "alert" && (
            <AlertModal onClose={closeModal}>
              <BiSolidMessageSquareError
                size={"60px"}
                style={{ color: "#f57c00" }}
              />
              <strong>{modal.message}</strong>
            </AlertModal>
          )}
        </>
      )}
    </div>
  );
}

export default FeedContainer;
