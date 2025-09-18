/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import { useGetCurrentLocation } from "../../../hooks/useGetCurrentLocation";
import { useQuery } from "@tanstack/react-query";
import {
  getAirPollutionReq,
  getReverseGeoApi,
  getWeatherReq,
} from "../../../services/weather/weatherApis";

function Weather() {
  const { data: locationData, isLoading: isLocationLoading } =
    useGetCurrentLocation();

  const lat = locationData?.coords.latitude;
  const lng = locationData?.coords.longitude;

  // 날씨 API 호출
  // 위치가 존재하면 실행
  const { data: weatherData, isLoading: isWeatherLoading } = useQuery({
    queryKey: ["weather"],
    // API 호출 함수
    queryFn: () => getWeatherReq(lat, lng),
    // 위치 값이 있을 때만 실행
    enabled: !!lat && !!lng,
    staleTime: 60 * 60 * 1000, // 1시간
  });

  // 미세먼지 API 호출
  // 위치가 존재하면 실행
  const { data: airData, isLoading: isAirLoading } = useQuery({
    queryKey: ["air"],
    // API 호출 함수
    queryFn: () => getAirPollutionReq(lat, lng),
    // 위치 값이 있을 때만 실행
    enabled: !!lat && !!lng,
    staleTime: 60 * 60 * 1000, // 1시간
  });

  // 리버스 지오코딩 API 호출
  const { data: geoData, isLoading: isGeoLoading } = useQuery({
    queryKey: ["geo"],
    queryFn: () => getReverseGeoApi(lat, lng),
    enabled: !!lat && !!lng,
    staleTime: 24 * 60 * 60 * 1000,
  });

  const isLoading =
    isLocationLoading || isWeatherLoading || isAirLoading || isGeoLoading;

  const today = () => {
    const today = new Date();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    return month + " / " + day;
  };

  const weatherCondition = (weatherData, airData) => {
    if (airData?.list[0].components.pm2_5 >= 75) {
      return (
        <>
          초미세먼지가 최악이에요 😫
          <br />
          오늘은 외출 금지!
        </>
      );
    }

    if (airData?.list[0].components.pm10 > 80) {
      return (
        <>
          미세먼지가 최악이에요 😫
          <br />
          오늘은 반드시 실내에서!
        </>
      );
    }

    if (weatherData?.weather[0].id >= 500 && weatherData?.weather[0].id < 600) {
      return (
        <>
          비가 내려요 ☔
          <br />
          오늘은 근력 운동은 어때요?
        </>
      );
    }

    if (weatherData?.main.feels_like >= 30) {
      return (
        <>
          폭염 수준이에요! 🥵
          <br />
          수분을 충분히 보충하세요!
        </>
      );
    }

    if (weatherData?.main.feels_like <= 0) {
      return (
        <>
          많이 추워요 🥶
          <br />
          몸을 풀고 러닝을 시작하세요!
        </>
      );
    }

    if (weatherData?.wind.speed > 10) {
      return (
        <>
          바람이 강해요! 🌬️
          <br />
          날아갈 수도 있으니 주의하세요!
        </>
      );
    }

    return (
      <>
        러닝하기 완벽한 날씨네요!
        <br />
        나가서 달려! 🏃
      </>
    );
  };

  const getPM10Level = (pm10) => {
    if (pm10 <= 30) return "😀 좋음";
    if (pm10 <= 80) return "😊 보통";
    if (pm10 <= 150) return "😣 나쁨";
    return "😱 매우 나쁨";
  };

  const getPM2_5Level = (pm2_5) => {
    if (pm2_5 <= 15) return "😀 좋음";
    if (pm2_5 <= 35) return "😊 보통";
    if (pm2_5 <= 75) return "😣 나쁨";
    return "😱 매우 나쁨";
  };

  return (
    <div css={s.container}>
      {isLoading ? (
        <></>
      ) : (
        <>
          <div css={s.dateContainer}>
            <span>TODAY</span>
            <span>{today()}</span>
            <span>{geoData?.[0].local_names.ko}</span>
          </div>
          <div css={s.weatherContainer}>
            <div css={s.weatherIcon}>
              <img
                src={`https://openweathermap.org/img/wn/${weatherData?.weather[0].icon}@2x.png`}
              />
            </div>
            <div css={s.weatherDetails}>
              <div css={s.weatherTop}>
                <div>
                  <span>{weatherData?.main.temp.toFixed(1)}°C</span>
                  <span>{weatherData?.weather[0].description}</span>
                </div>
                <div>
                  <span>습도: {weatherData?.main.humidity}%</span>
                  <span>풍속: {weatherData?.wind.speed}m/s</span>
                  <span>
                    미세먼지: {getPM10Level(airData?.list[0].components.pm10)}
                  </span>
                  <span>
                    초미세먼지:
                    {getPM2_5Level(airData?.list[0].components.pm2_5)}
                  </span>
                </div>
              </div>
              <p css={s.comment}>{weatherCondition(weatherData, airData)}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Weather;
