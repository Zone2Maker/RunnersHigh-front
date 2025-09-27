/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import * as s from "./styles.js";
import {
  CustomOverlayMap,
  Map,
  MarkerClusterer,
  ZoomControl,
} from "react-kakao-maps-sdk";
import { getLast7Days } from "../../../utils/dateUtils.js";
import moment from "moment/moment.js";
import {
  getFeedDetailReq,
  getFeedMapReq,
} from "../../../services/feed/feedApis.js";
import FeedDetailModal from "../../../components/common/FeedDetailModal/FeedDetailModal.jsx";
import { addLikeReq, removeLikeReq } from "../../../services/like/likeApis.js";
import { queryClient } from "../../../configs/queryClient.js";
import { usePrincipalState } from "../../../stores/usePrincipalState.js";

function FeedMapView({ onOpenModal }) {
  const { principal } = usePrincipalState();
  const CLUSTERER_VISIBLE_MIN_LEVEL = 8;
  const [level, setLevel] = useState(13);
  const [center, setCenter] = useState({ lat: 35.57, lng: 128.15 });
  const [mapFeeds, setMapFeeds] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [feedDetail, setFeedDetail] = useState(null);
  const [newLike, setNewLike] = useState(null);
  const [originLike, setOriginLike] = useState(null);
  const [likeCount, setLikeCount] = useState(0);

  // 내 위치 기준으로 지도 센터 잡기
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const newCenter = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          };
          setCenter(newCenter);
          setLevel(11);
        },
        (err) => {
          console.warn("위치 권한 거부 or 오류:", err);
        }
      );
    }
  }, []);

  // 피드 데이터 가져오기
  useEffect(() => {
    const fetchMapFeeds = async () => {
      const { start, end } = getLast7Days(moment());
      const res = await getFeedMapReq(start, end);
      setMapFeeds(res.data.data);
    };
    fetchMapFeeds();
  }, []);

  const closeModal = async () => {
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
    setOriginLike(null);
    setNewLike(null);
    setLikeCount(0);
  };

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

  const centerOnChangeHandler = (map) => {
    const newCenter = map.getCenter();
    setCenter({
      lat: newCenter.getLat(),
      lng: newCenter.getLng(),
    });
  };

  const customClusterCalculator = (size) => {
    if (size >= 150) return 6;
    if (size >= 100) return 5;
    if (size >= 50) return 4;
    if (size >= 20) return 3;
    if (size >= 10) return 2;
    if (size >= 5) return 1;
    return 0;
  };

  return (
    <div css={s.container}>
      <Map
        center={center}
        style={{ width: "100%", height: "100%" }}
        level={level}
        onZoomChanged={(map) => setLevel(map.getLevel())}
        onCenterChanged={centerOnChangeHandler}
      >
        {mapFeeds.length > 0 && level >= CLUSTERER_VISIBLE_MIN_LEVEL ? (
          <MarkerClusterer
            averageCenter={true}
            minLevel={CLUSTERER_VISIBLE_MIN_LEVEL}
            calculator={customClusterCalculator}
            styles={s.customClusterStyles}
            gridSize={120}
          >
            {mapFeeds.map((feed) => (
              <CustomOverlayMap
                key={feed.feedId}
                position={{ lat: feed.feedLatitude, lng: feed.feedLongitude }}
              >
                <div
                  css={s.markerContainer(level)}
                  onClick={() => openModal(feed.feedId)} // feedId만 전달
                >
                  <img src={feed.feedImgUrl} css={s.markerImg} />
                </div>
              </CustomOverlayMap>
            ))}
          </MarkerClusterer>
        ) : (
          mapFeeds.map((feed) => (
            <CustomOverlayMap
              key={feed.feedId}
              position={{
                lat: feed.feedLatitude,
                lng: feed.feedLongitude,
              }}
            >
              <div
                css={s.markerContainer(level)}
                onClick={() => onOpenModal(feed.feedId)}
              >
                <img src={feed.feedImgUrl} css={s.markerImg} />
              </div>
            </CustomOverlayMap>
          ))
        )}
        <ZoomControl />
      </Map>
      <FeedDetailModal
        isOpen={isModalOpen}
        feedDetail={feedDetail}
        newLike={newLike}
        likeCount={likeCount}
        imageErrors={new Set()}
        onClose={closeModal}
        onHeartClick={heartOnClickHandler}
      />
    </div>
  );
}

export default FeedMapView;
