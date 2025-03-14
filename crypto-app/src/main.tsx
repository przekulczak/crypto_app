import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ErrorPage } from "./components/ErrorPage/index.tsx";
import "./index.css";
import App from "./App.tsx";
import { ErrorBoundary } from "react-error-boundary";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary fallbackRender={ErrorPage}>
      <App />
    </ErrorBoundary>
  </StrictMode>
);
