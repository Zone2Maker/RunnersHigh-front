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

function FeedMapView({ onOpenModal }) {
  const CLUSTERER_VISIBLE_MIN_LEVEL = 8;
  const [level, setLevel] = useState(13);
  const [center, setCenter] = useState({ lat: 35.57, lng: 128.15 });
  const [mapFeeds, setMapFeeds] = useState([]);

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
      console.log("map feeds : ", res);
      setMapFeeds(res.data.data);
    };
    fetchMapFeeds();
  }, []);

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
                  onClick={() => onOpenModal(feed.feedId)} // feedId만 전달
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
    </div>
  );
}

export default FeedMapView;
