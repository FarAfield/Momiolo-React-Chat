import { extend } from "umi-request";

const errorHandler = (error: any) => {
  return Promise.reject(error);
};
const request = extend({
  errorHandler, // 默认错误处理
  prefix: "/chat",
  timeout: 30000, // 30s
});
request.interceptors.request.use((url: string, options: any) => {
  return { url, options };
});
request.interceptors.response.use(async (response: any) => {
  if (response.status === 200) {
    return response;
  } else {
    return Promise.reject();
  }
});
export default request;
