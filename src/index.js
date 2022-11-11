import React from "react";
import ReactDOM from "react-dom/client";
import PageRouter from "./components/PageRouter/PageRouter";
import { Provider } from "react-redux";
import store from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PageRouter />
    </Provider>
  </React.StrictMode>
);
