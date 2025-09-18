/** @jsxImportSource @emotion/react */
import * as s from "./styles";

function Banner() {
  return (
    <div css={s.container}>
      <img src="https://firebasestorage.googleapis.com/v0/b/runnershigh-c00a7.firebasestorage.app/o/banner-img%2F2474663.jpg?alt=media&token=497d3ef0-4a70-4bf1-a230-8928206ed548" />

      <div css={s.comment}>
        지금 바로 크루들과
        <br />
        함께 달려보세요!
      </div>
    </div>
  );
}

export default Banner;
