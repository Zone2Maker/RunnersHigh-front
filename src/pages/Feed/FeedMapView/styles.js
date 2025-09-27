import { css } from "@emotion/react";

export const container = css`
  width: 100%;
  height: 520px;
  background-color: #f8f9fa;
`;

export const clusterCommonStyles = css`
  width: 50px;
  height: 50px;
  overflow: hidden;
  border-radius: 50%;
  border: 2px solid #edededff;
  box-shadow: 0px 0px 2px 2px rgba(209, 209, 209, 0.3);

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const mapContainer = css`
  width: 600px;
  height: 600px;
`;

export const title = css`
  font-size: 40px;
`;

// 마커 클러스터 커스텀 디자인
// 달라지는 스타일만 따로 정의해두기
export const eachClusterStyles = [
  {
    width: "32px",
    height: "32px",
    lineHeight: "32px",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(71,110,174,0.45) 0%, rgba(71,110,174,0.25) 60%, rgba(71,110,174,0.15) 100%)",
    color: "#FEFEFE",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "14px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
  },
  {
    width: "36px",
    height: "36px",
    lineHeight: "36px",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(71,110,174,0.55) 0%, rgba(71,110,174,0.35) 60%, rgba(71,110,174,0.2) 100%)",
    color: "#FEFEFE",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "15px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
  },
  {
    width: "40px",
    height: "40px",
    lineHeight: "40px",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(71,110,174,0.65) 0%, rgba(71,110,174,0.45) 60%, rgba(71,110,174,0.25) 100%)",
    color: "#FEFEFE",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "16px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
  },
  {
    width: "44px",
    height: "44px",
    lineHeight: "44px",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(71,110,174,0.75) 0%, rgba(71,110,174,0.55) 60%, rgba(71,110,174,0.3) 100%)",
    color: "#FEFEFE",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "18px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
  },
  {
    width: "48px",
    height: "48px",
    lineHeight: "48px",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(71,110,174,0.9) 0%, rgba(71,110,174,0.65) 60%, rgba(71,110,174,0.35) 100%)",
    color: "#FEFEFE",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "20px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
  },
  {
    width: "54px",
    height: "54px",
    lineHeight: "54px",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(71,110,174,1) 0%, rgba(71,110,174,0.75) 60%, rgba(71,110,174,0.4) 100%)",
    color: "#FEFEFE",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "22px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
  },
];

// map 돌려서 합치기
export const customClusterStyles = eachClusterStyles.map((style) => ({
  ...clusterCommonStyles,
  ...style,
}));

export const markerContainer = (level) => css`
  width: ${level === 1
    ? "62px"
    : level === 2
    ? "60px"
    : level === 3
    ? "58px"
    : level === 4
    ? "56px"
    : level === 5
    ? "54px"
    : level === 6
    ? "52px"
    : level === 7
    ? "50px"
    : level === 8
    ? "48px"
    : level === 9
    ? "46px"
    : level === 10
    ? "44px"
    : "42px"};
  aspect-ratio: 1;
  border-radius: 50%;
  border: 3px solid #efefef;
  background-color: #c7ddffff;
  overflow: hidden;
  cursor: pointer;
  box-sizing: border-box;
  transition: all 0.2s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: scale(1.2);
  }
`;

export const markerImg = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
