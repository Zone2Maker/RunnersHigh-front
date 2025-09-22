import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { QueryClientProvider } from "@tanstack/react-query";
import MainRouter from "./routes/MainRouter/MainRouter";
import { queryClient } from "./configs/queryClient";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { connectStomp, disconnectStomp } from "./configs/stompClient";
import { useEffect, useState } from "react";
import { usePrincipalState } from "./stores/usePrincipalState";

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const { principal } = usePrincipalState();

  useEffect(() => {
    connectStomp(principal?.crewId, (payload) => {
      console.log(payload);
      setMessages((prev) => [...prev, payload]);
    });

    return () => {
      disconnectStomp();
    };
  }, [principal]);

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
