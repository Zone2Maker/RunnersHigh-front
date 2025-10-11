/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import { useQuery } from "@tanstack/react-query";
import {
  getAirPollutionReq,
  getReverseGeoApi,
  getWeatherReq,
} from "../../../services/weather/weatherApis";
import { useLocationState } from "../../../stores/useLocationState";

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

  const weatherCondition = (weatherData, airData) => {
    const now = weatherData.dt + weatherData.timezone;
    const sunrise = weatherData.sys.sunrise + weatherData.timezone;
    const sunset = weatherData.sys.sunset + weatherData.timezone;

    const diffToSunRise = sunrise - now;
    const diffToSunset = now - sunset;
    if (diffToSunRise > 0 && diffToSunRise <= 3600) {
      return (
        <>
          곧 해가 떠요 🌅
          <br />
          러너스하이와 함께 시작하는 하루!
        </>
      );
    } else if (diffToSunset > 0 && diffToSunset <= 3600) {
      return (
        <>
          노을을 바라보며 러닝 어때요?
          <br />
          오늘 하루도 수고했어요 🌇
        </>
      );
    }

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

    const weatherId = weatherData?.weather[0].id;
    if (weatherId >= 200 && weatherId <= 232) {
      return (
        <>
          천둥과 번개가 치고 있어요 ⚡
          <br />
          실내 운동을 추천해요!
        </>
      );
    } else if (weatherId >= 300 && weatherId <= 321) {
      return (
        <>
          이슬비가 내리고 있어요 🌧️
          <br />
          스트레칭으로 몸만 풀어볼까요?
        </>
      );
    } else if (weatherId >= 500 && weatherId <= 531) {
      // 비
      return (
        <>
          비가 내려요 ☔
          <br />
          오늘은 근력 운동 어때요?
        </>
      );
    } else if (weatherId >= 600 && weatherId <= 622) {
      // 눈
      return (
        <>
          눈이 내리고 있어요 ☃️
          <br />
          오늘은 실내 운동으로 안전하게!
        </>
      );
    } else if (weatherId === 901) {
      // Tropical storm
      return (
        <>
          열대성 폭풍이 접근 중이에요 🌊
          <br />
          외출은 위험합니다. 실내에서 머무르세요!
        </>
      );
    } else if (weatherId === 902) {
      // Hurricane / Typhoon
      return (
        <>
          태풍이 접근하고 있어요 🌀
          <br />
          외출은 위험합니다. 실내에서 머무르세요!
        </>
      );
    } else if (weatherId === 906) {
      return (
        <>
          우박이 떨어지고 있어요 ⚠️
          <br />
          외출은 위험합니다. 실내에서 머무르세요!
        </>
      );
    }

    if (weatherData?.main.feels_like >= 32) {
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

    if (weatherData?.wind.speed > 14) {
      return (
        <>
          바람이 강해요! 🌪️
          <br />
          날아갈 수도 있으니 주의하세요!
        </>
      );
    }

    const clouds = weatherData.clouds.all;
    let cloudMsg = {};
    if (clouds >= 90) {
      cloudMsg.msg1 = "하늘이 잔뜩 흐려요 ☁️";
      cloudMsg.msg2 = "소나기가 올지도 몰라요!";
    } else if (clouds >= 60) {
      cloudMsg.msg1 = "구름이 많은 날이에요 🌥️";
      cloudMsg.msg2 = "햇살이 약해서 장시간 러닝하기 좋아요!";
    } else if (clouds >= 30) {
      cloudMsg.msg1 = "적당히 구름이 낀 날이에요 ⛅";
      cloudMsg.msg2 = "러닝하기 딱이에요!";
    } else {
      cloudMsg.msg1 = "구름 한 점 없는 맑아요 ☀️";
      cloudMsg.msg2 = "파란 하늘 아래 달려요!";
    }

    const feelsLike = weatherData.main.feels_like;
    let tempMsg = {};
    if (feelsLike >= 30) {
      tempMsg.msg1 = "날이 많이 더워요 🔥";
      tempMsg.msg2 = "이른 아침 러닝을 추천해요!";
    } else if (feelsLike >= 25) {
      tempMsg.msg1 = "다소 더운 날씨에요 🌞";
      tempMsg.msg2 = "오늘은 가벼운 조깅 어때요?";
    } else if (feelsLike >= 18) {
      tempMsg.msg1 = "선선해요 🍃";
      tempMsg.msg2 = "러닝하기 완벽한 날씨네요!";
    } else if (feelsLike >= 10) {
      tempMsg.msg1 = "조금 쌀쌀하네요 🧥";
      tempMsg.msg2 = "가벼운 외투를 챙기세요!";
    } else {
      tempMsg.msg1 = "오늘은 꽤 추워요 ❄️";
      tempMsg.msg2 = "몸을 풀고 러닝을 시작하세요!";
    }

    const airQuality = airData.list[0].main.aqi;
    let airMsg = {};
    switch (airQuality) {
      case 1:
        airMsg.msg1 = "공기가 아주 깨끗해요 🌿";
        airMsg.msg2 = "야외 러닝하기 좋은 날씨네요!";
        break;
      case 2:
        airMsg.msg1 = "오늘 공기가 좋네요 🙂";
        airMsg.msg2 = "걱정없이 달려봐요!";
        break;
      case 3:
        airMsg.msg1 = "러닝하기 괜찮은 공기질이에요 🌤️";
        airMsg.msg2 = "가볍게 뛰어보는게 어때요?";
        break;
      case 4:
        airMsg.msg1 = "미세먼지가 많아요 ⚠️";
        airMsg.msg2 = "오늘은 반드시 실내에서!";
        break;
      case 5:
        airMsg.msg1 = "공기가 매우 안 좋아요 😫";
        airMsg.msg2 = "오늘은 외출 금지!";
        break;
    }

    const humidity = weatherData.main.humidity;
    const humidityMsg = {};
    if (feelsLike >= 25) {
      if (humidity > 45) {
        humidityMsg.msg1 = "덥고 습한 날이에요 💦";
        humidityMsg.msg2 = "러닝 후 시원한 샤워는 필수!";
      } else if (humidity >= 35) {
        humidityMsg.msg1 = "더운 날씨지만 공기는 쾌적해요 ☀️";
        humidityMsg.msg2 = "수분 섭취 잊지 마세요!";
      }
    } else if (feelsLike >= 21) {
      if (humidity > 55) {
        humidityMsg.msg1 = "조금 덥고 습해요 🌫️";
        humidityMsg.msg2 = "러닝 후 시원한 샤워는 필수!";
      } else if (humidity >= 45) {
        humidityMsg.msg1 = "따뜻하고 쾌적한 날이에요 🌤️";
        humidityMsg.msg2 = "러닝하기 딱 좋은 날씨!";
      }
    } else if (feelsLike >= 17) {
      if (humidity <= 65 && humidity >= 55) {
        humidityMsg.msg1 = "선선하고 쾌적해요 🍃";
        humidityMsg.msg2 = "러닝하기 완벽한 날씨네요!";
      } else if (humidity < 55) {
        humidityMsg.msg1 = "공기가 조금 건조해요 💨";
        humidityMsg.msg2 = "보습과 수분 보충에 신경쓰세요.";
      }
    } else {
      if (humidity <= 75 && humidity >= 65) {
        humidityMsg.msg1 = "조금 쌀쌀하지만 공기는 상쾌해요 ❄️";
        humidityMsg.msg2 = "호흡이 맑게 느껴지는 러닝 날씨예요!";
      } else if (humidity < 65) {
        humidityMsg.msg1 = "차갑고 건조한 공기예요 🌬️";
        humidityMsg.msg2 = "러닝 전 워밍업과 보습은 필수!";
      }
    }

    const windSpeed = weatherData.wind.speed;
    const windMsg = {};
    if (windSpeed >= 10) {
      windMsg.msg1 = "강한 바람이 불고 있어요 🌬️";
      windMsg.msg2 = "";
    } else if (windSpeed >= 6) {
      windMsg.msg1 = "바람이 제법 부네요 💨";
      windMsg.msg2 = "맞바람일 땐 호흡을 조절하며 천천히!";
    } else if (windSpeed >= 3) {
      windMsg.msg1 = "산들바람이 불어와요 🍃";
      windMsg.msg2 = "시원한 바람과 함께 달려볼까요?";
    } else if (windSpeed >= 1) {
      windMsg.msg1 = "공기가 잔잔해요 ☁️";
      windMsg.msg2 = "러닝에 집중하기 좋은 날이에요.";
    } else {
      windMsg.msg1 = "거의 바람이 없어요 🧭";
      windMsg.msg2 = "리듬과 호흡에 신경쓰세요!";
    }

    const messages = [
      cloudMsg,
      tempMsg,
      airMsg,
      humidityMsg.msg1 && humidityMsg,
      windMsg,
    ];
    const resultMsg = messages[Math.floor(Math.random() * messages.length)];
    return (
      <>
        {resultMsg.msg1}
        <br />
        {resultMsg.msg2}
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
