import Vue from "vue";
import VueRouter from "vue-router";
import { Message } from "element-ui";

const originalPush = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
  return originalPush.call(this, location).catch((err) => err);
};

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "Home",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/home/Home"),
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
    beforeEnter(to, from, next) {
      if (to.path == "/sumup") {
        const token = sessionStorage.getItem("token");
        if (!token) {
          Message.error = "请先登录";
          router.replace("/login");
        } else {
          next();
        }
      } else {
        next();
      }
    },
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
    beforeEnter(to, from, next) {
      if (to.path == "/personal") {
        const token = sessionStorage.getItem("token");
        if (!token) {
          Message.error = "请先登录";
          router.replace("/login");
        } else {
          next();
        }
      } else {
        next();
      }
    },
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
    beforeEnter(to, from, next) {
      if (to.path == "/create_blog") {
        const token = sessionStorage.getItem("token");
        if (!token) {
          Message.error = "请先登录";
          router.replace("/login");
        } else {
          next();
        }
      } else {
        next();
      }
    },
  },
  {
    path: "/personal_center",
    name: "OtherPerson",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/personal/OtherPerson"),
  },
  {
    path: "/serach",
    name: "Serach",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/serach/Serach"),
  },
  {
    path: "/connection/:username",
    name: "connection",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/connection/Conn"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// 路由导航守卫
// router.beforeEnter((to,form,next)=>{
//   if(to.path =='/login'){
//     next()
//   const token = sessionStorage.getItem("token")
//   if(token){
//     next()
//   }else{
//     this.$message({
//       type:"primary",
//       message:"请先登录!"
//     }),
//     this.$router.push('/login')
//   }
//   }
// })

export default router;
