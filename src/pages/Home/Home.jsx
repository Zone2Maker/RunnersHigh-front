/** @jsxImportSource @emotion/react */
import Banner from "./Banner/Banner";
import * as s from "./styles";
import Weather from "./Weather/Weather";
import WeeklyTopCrew from "./WeeklyTopCrew/WeeklyTopCrew";
import WeeklyTopFeed from "./WeeklyTopFeed/WeeklyTopFeed";

function Home() {
  return (
    <div css={s.container}>
      <Weather />
      <WeeklyTopFeed />
      <WeeklyTopCrew />
      <Banner />
    </div>
  );
}

export default Home;
