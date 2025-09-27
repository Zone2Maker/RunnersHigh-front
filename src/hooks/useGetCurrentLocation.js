import { useQuery } from "@tanstack/react-query";

const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (resp) => resolve(resp), // 성공하면 position 객체 반환
        (error) => reject(error)
      );
    } else {
      reject(new Error("브라우저에서 현재 위치를 지원하지 않습니다."));
    }
  });
};

export const useGetCurrentLocation = () => {
  /** data 이케 생김
   * GeolocationPosition{coords: GeolocationCoordinates, timestamp: 1758103852804}coords: GeolocationCoordinatesaccuracy: 2730.1967537019946altitude: nullaltitudeAccuracy: nullheading: nulllatitude: 35.1544453longitude: 129.060646speed: null[[Prototype]]: GeolocationCoordinatestimestamp: 1758103852804[[Prototype]]: GeolocationPosition */

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["currentLocation"],
    queryFn: getCurrentLocation,
    staleTime: 30 * 60 * 1000, // 30분
    refetchOnWindowFocus: true, // 다른 창 갔다오면 재실행
  });

  return { data, isLoading, isError, error };
};
