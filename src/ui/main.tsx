import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import "../style.css";
import {App} from "./App";

// The editor's entrypoint (app/index.html loads it): the whole page is the React app.
const root = document.getElementById("root");
if (!root) throw new Error("app/index.html has no #root to show the editor in.");
createRoot(root).render(
  <StrictMode>
    <App/>
  </StrictMode>,
);
