import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { QueryClientProvider } from "@tanstack/react-query";
import MainRouter from "./routes/MainRouter/MainRouter";
import { queryClient } from "./configs/queryClient";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { usePrincipalState } from "./stores/usePrincipalState";
import MyChattingButton from "./components/layout/MyChattingButton/MyChattingButton";

function App() {
  const { principal } = usePrincipalState();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <MainRouter />
      </BrowserRouter>
      {principal?.crewId && <MyChattingButton />}
    </QueryClientProvider>
  );
}

export default App;
