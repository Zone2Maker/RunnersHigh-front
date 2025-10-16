/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import { useQuery } from "@tanstack/react-query";
import {
  getAirPollutionReq,
  getReverseGeoApi,
  getWeatherReq,
} from "../../../services/weather/weatherApis";
import { useLocationState } from "../../../stores/useLocationState";
import { useMemo } from "react";
import { getWeatherMessage } from "../../../utils/weatherUtils";

function Weather() {
  const { location, isLoading: isLocationLoading } = useLocationState();

  // 날씨 API 호출
  // 위치가 존재하면 실행
  const { data: weatherData, isLoading: isWeatherLoading } = useQuery({
    queryKey: ["weather"],
    // API 호출 함수
    queryFn: () => getWeatherReq(location.lat, location.lng),
    // 위치 값이 있을 때만 실행
    enabled: !isLocationLoading,
    staleTime: 60 * 60 * 1000, // 1시간
  });

  // 미세먼지 API 호출
  // 위치가 존재하면 실행
  const { data: airData, isLoading: isAirLoading } = useQuery({
    queryKey: ["air"],
    // API 호출 함수
    queryFn: () => getAirPollutionReq(location.lat, location.lng),
    // 위치 값이 있을 때만 실행
    enabled: !isLocationLoading,
    staleTime: 60 * 60 * 1000, // 1시간
  });

  // 리버스 지오코딩 API 호출
  const { data: geoData, isLoading: isGeoLoading } = useQuery({
    queryKey: ["geo"],
    queryFn: () => getReverseGeoApi(location.lat, location.lng),
    enabled: !isLocationLoading,
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

  const weatherCondition = useMemo(() => {
    return getWeatherMessage(weatherData, airData);
  }, [weatherData, airData]);

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
              <p css={s.comment}>
                {weatherCondition.msg1}
                <br />
                {weatherCondition.msg2}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Weather;
