import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home.vue";
import Layout from "../views/Layout";
// import Goods from "../components/content/Goods";
// import Catagory from "../components/content/Catagory";
Vue.use(VueRouter);
// const originalPush = VueRouter.prototype.push
 
// VueRouter.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err)
// }

export const routes = [
  {
    path: "/",
    component: Layout,
    name: 'Home',
    redirect: '/goodsManage',
    meta: {
      title: "Home"
    },
    children: [
      {
        path: "/goodsManage",
        name: "GoodsManage",
        component:() => import("../components/content/Good"),
        meta: {
          title: "GoodsManage"
        }
      },
      {
        path: "/catagoryManage",
        name: "catagoryManage",
        component: () => import("../components/content/Category"),
        meta: {
          title: "CatagoryManage"
        }
      },
      {
        path: "/goods",
        name: "goods",
        component:() => import("../components/content/AddGood"),
      },
    ]
  }
];

const router = new VueRouter({
  routes,
});

export default router;
