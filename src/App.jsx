import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MainRouter from "./routes/MainRouter/MainRouter";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <MainRouter />
        {/* 로그인 상태일 때 채팅 버튼 나타낼 곳 */}
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
