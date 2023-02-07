import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/landing",
  },
  {
    path: "/landing",
    redirect: "/landing/",
    component: () =>
      import(/* webpackChunkName: "landing" */ "../views/LandingView.vue"),
    children: [
      {
        path: ":cars*",
        name: "Cars",
        component: () =>
          import(/* webpackChunkName: "cluster" */ "@/views/LandingView.vue"),
      },
    ],
  },
];

export default routes;
