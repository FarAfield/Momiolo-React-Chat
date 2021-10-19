import React from "react";
import dva from "dva";
import App from "./pages/App";
import global from "./models/global";
import "./index.less";

const app = dva();
app.model(global);
app.router(() => <App />);
app.start("#root");
