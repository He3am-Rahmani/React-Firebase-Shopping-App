import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./output.css";
import App from "./App";
import { Provider } from "react-redux";
import store, { Persistor } from "./store";

import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import { PersistGate } from "redux-persist/integration/react";
// import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={Persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
