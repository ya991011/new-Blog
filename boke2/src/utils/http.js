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
    url: "/blogDetail",
    method: "get",
    params,
  });
};

export const getMyBlog = function (params) {
  return service({
    url: "/myblog",
    method: "post",
    params,
  });
};

export const getCodeBlog = function (params) {
  return service({
    url: "/myCode",
    method: "get",
    params,
  });
};

export const getLifeList = function (params) {
  return service({
    url: "/myLife",
    method: "get",
    params,
  });
};

export const getAllBlog = function (params) {
  return service({
    url: "/myAllBlog",
    method: "get",
    params,
  });
};

export const LssueComm = function (data) {
  return service({
    url: "/comment",
    method: "post",
    data,
  });
};

export const getCommList = function (data) {
  return service({
    url: "/commlist",
    method: "post",
    data,
  });
};

export const getPerson = function (params) {
  return service({
    url: "/person_center",
    method: "get",
    params,
  });
};
export const like = function (params) {
  return service({
    url: "/like",
    method: "get",
    params,
  });
};

export const getSerach = function (data) {
  return service({
    url: "/serach",
    method: "post",
    data,
  });
};

export const getAttentionList = function (params) {
  return service({
    url: "/getAttention",
    method: "get",
    params,
  });
};

// export const AnswerList = function (params) {
//   return service({
//     url: "/answerList",
//     method: "get",
//     params,
//   });
// };

//获取粉丝表
export const getRelation = function (params) {
  return service({
    url: "/getFans",
    method: "get",
    params,
  });
};

//关注
export const setAttention = function (data) {
  return service({
    url: "/attention",
    method: "post",
    data,
  });
};

//取消关注
export const deleteAttention = function (data) {
  return service({
    url: "/deleteAttention",
    method: "post",
    data,
  });
};
