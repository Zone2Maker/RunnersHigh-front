import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { QueryClientProvider } from "@tanstack/react-query";
import MainRouter from "./routes/MainRouter/MainRouter";
import { queryClient } from "./configs/queryClient";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <MainRouter />
      </BrowserRouter>
      {/* 로그인 상태일 때 채팅 버튼 나타낼 곳 */}
    </QueryClientProvider>
  );
}

export default App;
