import http from "../utils/http";

let request = "/api";

// // get请求
// export function getBlogList(params) {
//   return http.get(`${request}/blogList`, params);
// }

// // post 请求

// export function createBlog(params) {
//   return http.post(`${request}/create`, params);
// }

// 用户登录

export function login(data) {
  return http.post(`${request}/uploads`, data);
}
