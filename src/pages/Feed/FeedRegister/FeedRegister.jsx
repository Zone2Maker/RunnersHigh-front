/** @jsxImportSource @emotion/react */
import { useEffect, useRef, useState } from "react";
import * as s from "./styles";
import { useFirebaseUpload } from "../../../hooks/useFirebaseUpload";
import { addFeedReq } from "../../../services/feed/feedApis";
import { usePrincipalState } from "../../../stores/usePrincipalState";
import { useLocationState } from "../../../stores/useLocationState";
import { SlPicture } from "react-icons/sl";
import { CiLocationOn } from "react-icons/ci";
import AlertModal from "../../../components/common/AlertModal/AlertModal";
import { FaCircleArrowUp } from "react-icons/fa6";
import { BiSolidMessageSquareError } from "react-icons/bi";
import { FaTimes } from "react-icons/fa";
import { getSortedPlacesByDistance } from "../../../utils/locationUtils";

function FeedRegister() {
  const [keywordPs, setKeywordPs] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [places, setPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);

  const [imageState, setImageState] = useState({
    file: null,
    previewUrl: "",
  });
  const fileInputRef = useRef();

  const [alertModal, setAlertModal] = useState({
    isOpen: false,
    message: "",
  });

  const { principal } = usePrincipalState();
  const { location: currentLocation } = useLocationState();
  const { uploadFile } = useFirebaseUpload();

  //카카오맵 불러오기
  useEffect(() => {
    if (!window.kakao || !window.kakao.maps) {
      console.error("카카오 SDK 로드 실패");
      return;
    }
    window.kakao.maps.load(() => {
      setKeywordPs(new window.kakao.maps.services.Places());
    });
  }, []);

  const openModal = (message) => {
    setAlertModal({ isOpen: true, message });
  };

  //장소 검색 완료 시 호출되는 콜백 함수
  const placeSearchCB = (data, status) => {
    if (status === window.kakao.maps.services.Status.OK) {
      // 가까운 순 정렬해서 저장
      const currentLoc = {
        latitude: currentLocation?.lat,
        longitude: currentLocation?.lng,
      };
      const sortedData = getSortedPlacesByDistance(currentLoc, data);
      setPlaces(sortedData);
    } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
      openModal("검색 결과가 없습니다.");
      return;
    }
  };

  // 키워드 검색
  const searchBtnOnClickHandler = () => {
    const keyword = searchKeyword.trim();

    if (!keyword) {
      openModal("검색어를 입력해주세요.");
      return;
    }

    if (!keywordPs) {
      openModal("오류가 발생했습니다. 다시 시도해주세요.");
      return;
    }

    keywordPs.keywordSearch(searchKeyword, placeSearchCB);
  };

  const placeOnClickHandler = (place) => {
    setSelectedPlace(place);
    setPlaces([]);
  };

  //이미지 등록
  const imageOnChangeHandler = (e) => {
    const file = e.target.files[0];
    const MAX_SIZE = 5 * 1024 * 1024; // 1024 = 1KB

    if (!file) return;

    if (file.size > MAX_SIZE) {
      openModal("5MB이내의 사진만 업로드 가능합니다.");
      e.target.value = "";
      setImageState({ file: null, previewUrl: "" });
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setImageState({ file, previewUrl });
  };

  // 공유하기 버튼 클릭 시  - submit 핸들러
  const submitBtnOnClickHandler = async () => {
    if (!principal) {
      openModal("로그인 후 피드를 등록할 수 있습니다.");
      return;
    }
    if (isButtonDisabled) return;

    try {
      const firebaseUrl = await uploadFile(imageState.file, "feed-img");

      const data = {
        userId: principal.userId,
        feedImgUrl: firebaseUrl,
        feedLocation: selectedPlace.place_name,
        feedLatitude: parseFloat(selectedPlace.y),
        feedLongitude: parseFloat(selectedPlace.x),
      };

      const response = await addFeedReq(data);
      if (response.data.status === "success") {
        openModal("피드가 등록되었습니다.");

        // 입력 초기화
        setImageState({ file: null, previewUrl: "" });
        setSelectedPlace(null);
        setSearchKeyword("");
      } else {
        openModal(
          response.data.message ||
            "피드 등록에 실패했습니다. 다시 시도해주세요."
        );
      }
    } catch (error) {
      console.error(error);
      openModal("피드 등록 중 시스템 오류가 발생했습니다.");
    }
  };

  // 이미지와 장소가 모두 선택되었는지 여부
  const isButtonDisabled = !imageState.file || !selectedPlace;

  return (
    <div css={s.container}>
      {/* 메인 콘텐츠 영역 */}
      <div css={s.mainContainer}>
        {!selectedPlace && (
          <div css={s.inputBox}>
            <input
              css={s.searchInput}
              type="text"
              value={searchKeyword}
              placeholder="장소 검색"
              onChange={(e) => setSearchKeyword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") searchBtnOnClickHandler();
              }}
            />
            <FaCircleArrowUp
              css={s.searchIcon}
              onClick={searchBtnOnClickHandler}
            />
          </div>
        )}
        {selectedPlace && (
          <div css={s.selectedLocation}>
            <div>
              <CiLocationOn />
              <span css={s.selectedPlace}>{selectedPlace.place_name}</span>
            </div>
            <button
              onClick={() => {
                setSelectedPlace(null);
              }}
            >
              <FaTimes />
            </button>
          </div>
        )}
        {places.length > 0 && (
          <ul css={s.placeList}>
            <div css={s.sourceInfo}>검색 결과 제공: 카카오맵(KakaoMap)</div>
            {places.map((place) => (
              <li
                key={place.id}
                css={s.placeInfo}
                onClick={() => placeOnClickHandler(place)}
              >
                <div css={s.nameAndCategory}>
                  <h3>{place.place_name}</h3>
                  <div>
                    {place.category_name.split(" > ").slice(0, 2).join(" > ")}
                  </div>
                </div>
                <div css={s.addressAndDistance}>
                  <span>{place.address_name}</span>
                  <span>{place.distance.toFixed(2)}Km</span>
                </div>
              </li>
            ))}
          </ul>
        )}
        <div
          css={s.imageUploadSection}
          onClick={() => fileInputRef.current.click()}
        >
          {imageState.previewUrl ? (
            <img
              src={imageState.previewUrl}
              alt="미리보기"
              css={s.previewImage}
            />
          ) : (
            // 에러 발생 시 보여줄 UI
            <div css={s.feedNoImageBox}>
              <SlPicture />
              <p>오늘의 러닝 인증샷을 공유해보세요!</p>
            </div>
          )}
          <input
            type="file"
            ref={fileInputRef}
            css={s.feedInput}
            onChange={imageOnChangeHandler}
          />
        </div>
        <div css={s.submitButton}>
          <button disabled={isButtonDisabled} onClick={submitBtnOnClickHandler}>
            공유하기
          </button>
        </div>
      </div>
      <div css={s.dummyContainer}></div>
      {alertModal.isOpen && (
        <AlertModal
          onClose={() => setAlertModal({ isOpen: false, message: "" })}
        >
          <BiSolidMessageSquareError size={60} style={{ fill: "#ff4d4d" }} />
          <strong>{openModal.modalMessage}</strong>
        </AlertModal>
      )}
    </div>
  );
}

export default FeedRegister;
