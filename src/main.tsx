import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "./css/index.css";
import ReduxProvider from "./components/ReduxProvider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ReduxProvider>
      <App />
    </ReduxProvider>
  </React.StrictMode>
);
