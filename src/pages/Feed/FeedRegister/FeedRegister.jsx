/** @jsxImportSource @emotion/react */
import { useEffect, useRef, useState } from "react";
import * as s from "./styles";
import { FaSearchLocation } from "react-icons/fa";
import { useFirebaseUpload } from "../../../hooks/useFirebaseUpload";
import { addFeedReq } from "../../../services/feed/feedApis";
import { usePrincipalState } from "../../../stores/usePrincipalState";
import { SlPicture } from "react-icons/sl";
import { CiLocationOn } from "react-icons/ci";
import AlertModal from "../../../components/common/AlertModal/AlertModal";

function FeedRegister() {
  const [keywordPs, setKeywordPs] = useState(null); // 장소 검색 객체
  const [searchKeyword, setSearchKeyword] = useState(""); // 검색할 장소 키워드
  const [places, setPlaces] = useState([]); // 검색 결과 목록 배열
  const [selectedPlace, setSelectedPlace] = useState(null); // 최종 선택된 장소
  const [image, setImage] = useState(null); //실제 업로드할 이미지
  const [imagePreview, setImagePreview] = useState(""); // 이미지 미리보기 URL
  const fileInputRef = useRef();
  const { principal } = usePrincipalState();
  const { uploadFile } = useFirebaseUpload();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const openModal = (message) => {
    setModalMessage(message);
    setIsModalOpen(true);
  };

  //카카오맵 불러오기
  useEffect(() => {
    const KAKAO_API_KEY = import.meta.env.VITE_KAKAO_API_KEY;
    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_API_KEY}&libraries=services,clusterer&autoload=false`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      if (window.kakao && window.kakao.maps) {
        window.kakao.maps.load(() => {
          const ps = new window.kakao.maps.services.Places();
          setKeywordPs(ps);
        });
      } else {
        console.error("카카오 SDK 로드 실패");
      }
    };

    script.onerror = () => {
      console.error("카카오 SDK 스크립트 로드 중 오류 발생");
    };
  }, []);

  // 키워드 검색
  const searchBtnOnClickHandler = () => {
    if (!searchKeyword.replace(/^\s+|\s+$/g, "")) {
      setModalMessage("검색어를 입력해주세요.");
      setIsModalOpen(true);
      return false;
    }

    // 장소 검색 객체를 통해 키워드로 장소 검색 요청
    if (!keywordPs) {
      alert("오류가 발생했습니다. 다시 시도해주세요.");
      return;
    }

    keywordPs.keywordSearch(searchKeyword, placeSearchCB);
  };

  //장소 검색 완료 시 호출되는 콜백 함수
  const placeSearchCB = (data, status) => {
    setPlaces([]);

    if (status === window.kakao.maps.services.Status.OK) {
      setPlaces(data); //검색 결과를 상태로 저장
    } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
      setModalMessage("검색 결과가 없습니다.");
      return;
    }
  };

  const searchInputOnChangeHandler = (e) => {
    setSearchKeyword(e.target.value);
  };

  const searchInputOnKeyDownHandler = (e) => {
    if (e.key !== "Enter") {
      return;
    }

    searchBtnOnClickHandler();
  };

  // 검색 결과 목록에서 장소를 클릭했을 때 실행되는 함수
  const placeOnClickHandler = (place) => {
    setSelectedPlace(place); // 선택된 장소 정보 전체를 저장
    setPlaces([]);
  };

  //이미지 등록
  const imageOnChangeHandler = (e) => {
    const file = e.target.files[0]; // file 객체로 가져와야함 -> input vale=file 로
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImage(file);
      setImagePreview(previewUrl);
    }
  };

  // 공유하기 버튼 클릭 시  - submit 핸들러
  const handleFeedSubmit = async () => {
    if (!principal) {
      setModalMessage("로그인 후 피드를 등록할 수 있습니다.");
      setIsModalOpen(true);
      return;
    }

    try {
      //백엔드에 요청 보낼 데이터 객체
      const firebaseUrl = await uploadFile(image, "feed-img");

      const data = {
        userId: principal.userId,
        feedImgUrl: firebaseUrl,
        feedLocation: selectedPlace.place_name,
        feedLatitude: parseFloat(selectedPlace.y),
        feedLongitude: parseFloat(selectedPlace.x),
      };

      const response = await addFeedReq(data);
      if (response.data.status === "success") {
        setModalMessage("피드가 등록되었습니다.");
        isModalOpen(true);

        // 입력 초기화
        setImage(null);
        setImagePreview("");
        setSelectedPlace(null);
        setSearchKeyword("");
      } else {
        setModalMessage(response.data.status);
        isModalOpen(true);
      }
    } catch (error) {
      console.log(error);
      setModalMessage("피드 등록에 실패했습니다. 다시 시도해주세요.");
      isModalOpen(true);
    }
  };

  // 이미지와 장소가 모두 선택되었는지 여부
  const isButtonDisabled = !image || !selectedPlace;

  return (
    <div css={s.container}>
      {/* 메인 콘텐츠 영역 */}
      <div css={s.mainContainer}>
        {/* 장소 검색창 */}
        <div css={s.inputBox}>
          <input
            css={s.searchInput}
            type="text"
            value={searchKeyword}
            placeholder="장소 검색"
            onChange={searchInputOnChangeHandler}
            onKeyDown={searchInputOnKeyDownHandler}
          />
          <FaSearchLocation
            css={s.searchIcon}
            onClick={searchBtnOnClickHandler}
          />
        </div>
        {selectedPlace && (
          <div css={s.selectedLocation}>
            <CiLocationOn />
            <span css={s.selectedPlace}>{selectedPlace.place_name}</span>
          </div>
        )}
        {/* 검색 결과가 있을 때만 목록을 보여줌 */}

        {places.length > 0 && (
          <ul css={s.placeList}>
            {/* places 배열에 저장된 검색된 장소 map 이용 - 리스트 */}
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
                <span>{place.address_name}</span>
              </li>
            ))}
          </ul>
        )}
        <div
          css={s.imageUploadSection}
          onClick={() => fileInputRef.current.click()}
        >
          {imagePreview ? (
            <img src={imagePreview} alt="미리보기" css={s.previewImage} />
          ) : (
            // 에러 발생 시 보여줄 UI
            <div css={s.feedNoImageBox}>
              <SlPicture />
              <p>러닝 인증샷을 공유해보세요!</p>
            </div>
          )}
          <input
            type="file"
            ref={fileInputRef}
            css={s.feedInput}
            onChange={imageOnChangeHandler}
          />
        </div>

        {/* 공유하기 버튼 */}
        <button
          css={s.submitButton(isButtonDisabled)}
          disabled={true}
          onClick={handleFeedSubmit}
        >
          공유하기
        </button>
      </div>
      <div css={s.dummyContainer}></div>
      {isModalOpen && (
        <AlertModal onClose={() => setIsModalOpen(false)}>
          {modalMessage}
        </AlertModal>
      )}
    </div>
  );
}

export default FeedRegister;
