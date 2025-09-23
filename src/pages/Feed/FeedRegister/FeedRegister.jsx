/** @jsxImportSource @emotion/react */
import { useEffect, useRef, useState } from "react";
import * as s from "./styles";
import { FaSearchLocation } from "react-icons/fa";
import { useFirebaseUpload } from "../../../hooks/useFirebaseUpload";
import { addFeedReq } from "../../../services/feed/feedApis";
import { usePrincipalState } from "../../../stores/usePrincipalState";
import { instance } from "../../../services/instance/instance";
import { SlPicture } from "react-icons/sl";
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
  const [imageError, setImageError] = useState(new Set());
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
    console.log(import.meta.env.VITE_KAKAO_API_KEY);

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
  const searchWithKeyword = () => {
    console.log(searchKeyword);
    if (!searchKeyword.replace(/^\s+|\s+$/g, "")) {
      setIsModalOpen(true);
      openModal("검색어를 입력해주세요.");
      return false;
    }

    // 장소 검색 객체를 통해 키워드로 장소 검색 요청
    if (!keywordPs) {
      openModal("장소 검색 객체가 준비되지 않았습니다.");
      return;
    }

    keywordPs.keywordSearch(searchKeyword, placeSearchCB);
  };

  //장소 검색 완료 시 호출되는 콜백 함수
  const placeSearchCB = (data, status) => {
    if (status === window.kakao.maps.services.Status.OK) {
      setPlaces(data); //검색 결과를 상태로 저장
      //이걸 map 돌려서 list로
    } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
      openModal("검색 중 오류가 발생했습니다.");
      setPlaces([]);
      return;
    }
  };

  //키워드검색 onChange
  const searchOnChangeHandler = (e) => {
    // const keyword = e.target.value;
    setSearchKeyword(e.target.value);
  };

  // 검색 결과 목록에서 장소를 클릭했을 때 실행되는 함수
  const handlePlaceClick = (place) => {
    console.log("selectedPlace:", selectedPlace);
    setSelectedPlace(place); // 선택된 장소 정보 전체를 저장
    setSearchKeyword(place.place_name); // input 창에는 장소 이름만 표시
    setPlaces([]);
  };

  //이미지 등록
  const imageOnChangeHandler = (e) => {
    const file = e.target.files[0]; // file 객체로 가져와야함 -> input vale=file 로
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImageError(false);
      setImage(file);
      setImagePreview(previewUrl);
    }
  };

  // const inputOnClickHandler = () => {
  //   if (!imageError) {
  //   fileInputRef.current.click();
  // }
  // };

  // 공유하기 버튼 클릭 시  - submit 핸들러
  const handleFeedSubmit = async () => {
    const token = localStorage.getItem("accessToken");
    if (!principal) {
      openModal("사용자 정보를 불러오지 못했습니다. 다시 로그인해주세요.");
      return;
    }

    if (!selectedPlace) {
      openModal("먼저 장소를 선택해주세요."); // null일 때 경고
      return;
    }

    if (!image) {
      openModal("이미지를 선택해주세요.");
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
        console.log(
          response.data.message || "피드가 성공적으로 등록되었습니다."
        );
        openModal("피드가 성공적으로 등록되었습니다.");

        // 입력 초기화
        setImage(null);
        setImagePreview("");
        setSelectedPlace(null);
        setSearchKeyword("");
      } else {
        console.error("백엔드 처리 실패:", response.data.status);
      }
    } catch (error) {
      openModal(error.response?.data?.message || "피드 등록에 실패했습니다.");
    }
  };

  // 이미지와 장소가 모두 선택되었는지 여부
  const isButtonDisabled = !image || !selectedPlace;

  return (
    <div css={s.pagecontainer}>
      {/* 메인 콘텐츠 영역 */}
      <main css={s.maincontainer}>
        {/* 장소 검색창 */}
        <div css={s.locationSection}>
          <input
            css={s.searchInput}
            type="text"
            value={searchKeyword}
            placeholder="장소를 입력하세요."
            onChange={searchOnChangeHandler}
          />
          <FaSearchLocation css={s.searchIcon} onClick={searchWithKeyword} />

          {/* 검색 결과가 있을 때만 목록을 보여줌 */}
          {places.length > 0 && (
            <ul css={s.resultList}>
              {/* places 배열에 저장된 검색된 장소 map 이용 - 리스트 */}
              {places.map((place) => (
                <li
                  key={place.id}
                  css={s.resultItem}
                  onClick={() => handlePlaceClick(place)}
                >
                  <div css={s.placeInfo}>
                    <h4>{place.place_name}</h4>
                    <h5>{place.category_name.replace("여행 > ", "")}</h5>
                  </div>
                  <span>{place.address_name}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div
          css={s.imageUploadSection}
          onClick={() => fileInputRef.current.click()}
        >
          {imagePreview && !imageError ? (
            <img src={imagePreview} alt="미리보기" css={s.previewImage} />
          ) : imageError ? (
            // 에러 발생 시 보여줄 UI
            <div css={s.feedNoImageBox}>
              <SlPicture />
              <p>추가할 이미지를 선택해주세요.</p>
            </div>
          ) : (
            // 기본 '+' 아이콘
            <div css={s.plusIcon}>+</div>
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
          css={s.submitButton}
          disabled={isButtonDisabled}
          onClick={handleFeedSubmit}
        >
          공유하기
        </button>
      </main>
      {isModalOpen && (
      <AlertModal onClose={() => setIsModalOpen(false)}>
        {modalMessage}
      </AlertModal>
    )}
    </div>
  );
}

export default FeedRegister;
