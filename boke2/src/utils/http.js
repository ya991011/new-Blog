import service from "./request";

export const CreateBlog = function (data) {
  return service({
    url: "/create_blog",
    method: "post",
    data,
  });
};

export const post = function (data) {
  return service({
    url: "/login",
    method: "post",
    // headers: { "Content-Type": "application/json" },
    data,
  });
};

export const getUserInfo = function (data) {
  return service({
    url: "/person",
    method: "get",
    data,
  });
};

export const editUserInfo = function (data) {
  return service({
    url: "/edituserInfo",
    method: "post",
    data,
  });
};

export const getUserImage = function () {
  return service({
    url: "/getuserImage",
    method: "get",
  });
};

export const getBlogList = function (params) {
  return service({
    url: "/boke",
    method: "get",
    params,
  });
};

export const getBlogDetail = function (params) {
  return service({
    url:'/blogDetail',
    method:'get',
    params
  })
}
