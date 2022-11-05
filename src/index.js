import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createRoot } from "react-dom/client";
// import { Provider } from "react-redux";
// import { store } from "./Redux/store";
import App from "./App";
import "./index.css";

import routes from "./Routes";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  // <React.StrictMode>
  /* <Provider store={store}> */
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        {routes.map((el, i) => {
          const El = Object.values(el)[0];
          return <Route key={i} path={Object.keys(el)[0]} element={<El />} />;
        })}
      </Route>
    </Routes>
  </BrowserRouter>
  /* </Provider> */
  // </React.StrictMode>
);
