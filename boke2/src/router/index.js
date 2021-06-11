import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/home/Home";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/code",
    name: "Code",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/code/Code"),
  },
  {
    path: "/life",
    name: "Life",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/life/Life"),
  },
  {
    path: "/sumup",
    name: "SumUp",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/sumup/SumUp"),
  },
  {
    path: "/detail/:id",
    name: "Detail",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/detail/Detail"),
  },
  {
    path: "/personal",
    name: "Personal",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/personal/Personal"),
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/login&register/Login"),
  },
  {
    path: "/create_blog",
    name: "CreateBlog",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/createBlog/CreateBlog"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
