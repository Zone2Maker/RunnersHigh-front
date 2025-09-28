const deg2rad = (deg) => {
  return deg * (Math.PI / 180);
};

const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // 지구의 반경 (km)
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // 거리 (km)
  return distance;
};

export const getSortedPlacesByDistance = (currentLoc, placeList) => {
  const userLat = currentLoc.latitude;
  const userLng = currentLoc.longitude;
  console.log(placeList);

  // 검색 결과 리스트가 없거나 사용자 위치가 없다면 정렬하지 않고 반환
  if (!placeList || placeList.length === 0 || !userLat || !userLng) {
    return placeList;
  }

  const sortedData = placeList
    .map((place) => {
      const distance = getDistanceFromLatLonInKm(
        userLat,
        userLng,
        parseFloat(place.y),
        parseFloat(place.x)
      );
      return {
        ...place,
        distance: distance,
      }; // 사용자 위치 기반으로 계산한 거리를 객체에 추가
    })
    .sort((a, b) => a.distance - b.distance); // 거리 순 정렬

  return sortedData;
};
