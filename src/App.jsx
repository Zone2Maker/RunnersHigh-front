import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { QueryClientProvider } from "@tanstack/react-query";
import MainRouter from "./routes/MainRouter/MainRouter";
import { queryClient } from "./configs/queryClient";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useEffect, useState } from "react";
import { usePrincipalState } from "./stores/usePrincipalState";
import { connectStomp, disconnectStomp } from "./configs/stompClient";
import MyChattingButton from "./components/layout/MyChattingButton/MyChattingButton";

function App() {
  const [message, setMessage] = useState([]);
  const { principal } = usePrincipalState();

  useEffect(() => {
    if (!principal?.crewId) {
      return;
    }

    connectStomp(principal?.crewId, (payload) => {
      console.log(payload);
      setMessage(payload);
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
      {principal?.crewId && <MyChattingButton message={message}/>}
    </QueryClientProvider>
  );
}

export default App;
