/** @jsxImportSource @emotion/react */
import { IoMapOutline } from "react-icons/io5";
import * as s from "./styles";
import { useNavigate } from "react-router-dom";
import { GoPlus } from "react-icons/go";
import { MdOutlinePhoto } from "react-icons/md";

function FeedBtnContainer({ setView }) {
  const navigate = useNavigate();

  // const OnClickHandler -> 사진 페이지 / 지도 페이지 왔다갔다

  return (
    <div css={s.btnNav}>
      <div css={s.changeBtnContainer}>
        <div>
          {/* 사진 버튼 */}
          <button onClick={() => setView(0)} css={s.showPhoto}>
            {<MdOutlinePhoto />}
          </button>
          {/* 지도 버튼 */}
          <button onClick={() => setView(1)} css={s.showMap}>
            {<IoMapOutline />}
          </button>
        </div>
        <div>
          {/* add = 새 페이지 이동  */}
          <button onClick={() => navigate("/feed/new")} css={s.addBtn}>
            {<GoPlus />}
          </button>
        </div>
      </div>
    </div>
  );
}

export default FeedBtnContainer;
