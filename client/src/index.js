import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import CurrentUserProvider from "./CurrentUserContext";

ReactDOM.render(
  <React.StrictMode>
    <CurrentUserProvider>
      <App />
    </CurrentUserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
