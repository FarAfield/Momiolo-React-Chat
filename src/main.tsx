import dva from "dva";
import { createBrowserHistory } from "history";
import globalModel from "@/models/global";
import { Router, Route } from "react-router-dom";
import App from "./pages/App";

const history = createBrowserHistory();

// 1. 初始化 Dva 应用
const app = dva({
  history,
  onError(error: any) {
    console.error("Dva Global Error:", error);
  },
});

// 2. 注册模型
app.model(globalModel);

// 3. 注册路由
app.router(() => (
  <Router history={history}>
    <Route path="/" component={App} />
  </Router>
));

// 4. 启动应用
export default app.start();
