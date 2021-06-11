import axios from "axios";
import { Message } from "element-ui";

const service = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 3000,
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 数据转换为字符串类型
    config.data = JSON.stringify(config.data);
    config.headers = {
      // 配置请求头
      "Content-Type": "application/json",
    };
    const token1 = window.sessionStorage.getItem("token");
    if (token1) {
      config.headers.token = token1;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = "请求错误";
          break;
        case 404:
          error.message = "请求失败，未找到该资源";
          break;
        case 500:
          error.message = "服务端错误";
          break;
        default:
          error.message = "连接错误";
      }
    } else {
      if (JSON.stringify(error).includes("timeout")) {
        Message.error("服务器响应超时，请刷新当前页");
      }
      error.message = "连接服务器失败";
    }
    Message.error(error.message);

    return Promise.resolve(error.response);
  }
);

export default service;
