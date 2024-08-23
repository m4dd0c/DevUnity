import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    {/* <React.StrictMode> */}
    {/*</React.StrictMode>*/}
    <App />
    {/* TODO: later remove this */}
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>,
);
