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
import { getFeedMapReq } from "../../../services/feed/feedApis.js";
import FeedDetailModal from "../../../components/common/FeedDetailModal/FeedDetailModal.jsx";
import { queryClient } from "../../../configs/queryClient.js";
import { useLocationState } from "../../../stores/useLocationState.js";

function FeedMapView() {
  const { location: currentLocation } = useLocationState();
  const CLUSTERER_VISIBLE_MIN_LEVEL = 8;
  const [level, setLevel] = useState(11);
  const [center, setCenter] = useState({ lat: 35.57, lng: 128.15 });
  const [isFetching, setIsFetching] = useState(true);
  const [mapFeeds, setMapFeeds] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFeedId, setSelectedFeedId] = useState(null);

  // 내 위치 기준으로 지도 센터 잡기
  useEffect(() => {
    const newCenter = {
      lat: currentLocation?.lat,
      lng: currentLocation?.lng,
    };

    setCenter(newCenter);
  }, [currentLocation]);

  useEffect(() => {
    const fetchMapFeeds = async () => {
      const { start, end } = getLast7Days(moment());
      const res = await getFeedMapReq(start, end);
      console.log(res);
      setMapFeeds(res.data.data);
    };

    fetchMapFeeds();
    setIsFetching(false);
  }, []);

  const openModal = (feedId) => {
    setSelectedFeedId(feedId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFeedId(null);
    queryClient.invalidateQueries({ queryKey: ["feeds"], exact: false });
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
        {isFetching === false ? (
          <>
            {level >= CLUSTERER_VISIBLE_MIN_LEVEL ? (
              <MarkerClusterer
                averageCenter={true}
                minLevel={CLUSTERER_VISIBLE_MIN_LEVEL}
                calculator={customClusterCalculator}
                styles={s.customClusterStyles}
                gridSize={120}
              >
                {mapFeeds?.map((feed) => (
                  <CustomOverlayMap
                    key={feed.feedId}
                    position={{
                      lat: feed.feedLatitude,
                      lng: feed.feedLongitude,
                    }}
                  >
                    <div
                      css={s.markerContainer(level)}
                      onClick={() => openModal(feed.feedId)}
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
                    onClick={() => openModal(feed.feedId)}
                  >
                    <img src={feed.feedImgUrl} css={s.markerImg} />
                  </div>
                </CustomOverlayMap>
              ))
            )}
          </>
        ) : (
          <></>
        )}
        <ZoomControl />
      </Map>
      <FeedDetailModal
        isOpen={isModalOpen}
        feedId={selectedFeedId}
        onClose={closeModal}
      />
    </div>
  );
}

export default FeedMapView;
