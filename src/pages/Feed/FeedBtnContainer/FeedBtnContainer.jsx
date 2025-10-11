/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import { useNavigate } from "react-router-dom";
import { TiPlus } from "react-icons/ti";
import { MdOutlineMap, MdOutlinePhoto } from "react-icons/md";

function FeedBtnContainer({ view, setView }) {
  const navigate = useNavigate();

  return (
    <div css={s.btnNav}>
      <div css={s.changeBtnContainer}>
        <div css={s.left}>
          <button
            onClick={() => setView(0)}
            css={[s.tapBtn, view === 0 && s.isActive]}
          >
            <MdOutlinePhoto />
          </button>
          <button
            onClick={() => setView(1)}
            css={[s.tapBtn, view === 1 && s.isActive]}
          >
            <MdOutlineMap />
          </button>
        </div>
        <div>
          <button onClick={() => navigate("/feed/new")} css={s.addBtn}>
            <TiPlus />
          </button>
        </div>
      </div>
    </div>
  );
}

export default FeedBtnContainer;
