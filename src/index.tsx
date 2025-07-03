import { StrictMode } from "react";
import Main from "./main";
import { createRoot } from "react-dom/client";
import "./index.less";

const root = createRoot(document.getElementById("root")!);
root.render(
  <StrictMode>
    <Main></Main>
  </StrictMode>
);
