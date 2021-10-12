import { createRouter, createWebHistory } from "vue-router";
import store from "../store";
import Home from "../views/core/Home.vue";
import Register from "../views/auth/Register";
import Login from "../views/auth/Login";
import Missing from "../views/core/Missing";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/logout",
    name: "Logout",
    component: () => import("../views/auth/Logout.vue"),
    meta: {
      requireLogin: true,
    },
  },
  {
    path: "/collections",
    name: "Collections",
    component: () => import("../views/collection/Collections.vue"),
    meta: {
      requireLogin: true,
    },
  },
  {
    path: "/collection/:slug/edit",
    name: "EditCollection",
    component: () => import("../views/collection/EditCollection.vue"),
    meta: {
      requireLogin: true,
    },
  },
  {
    path: "/collection/:slug/add-card",
    name: "AddCard",
    component: () => import("../views/card/AddCard.vue"),
    meta: {
      requireLogin: true,
    },
  },
  {
    path: "/collection/:slug/share",
    name: "ShareCollection",
    component: () => import("../views/collection/ShareCollection.vue"),
    meta: {
      requireLogin: true,
    },
  },
  {
    path: "/collection/:slug/:shared",
    name: "CollectionDetail",
    component: () => import("../views/collection/CollectionDetail.vue"),
    meta: {
      requireLogin: true,
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "Missing",
    component: Missing,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

//Route Protection
router.beforeEach((to, from, next) => {
  if (
    to.matched.some((record) => record.meta.requireLogin) &&
    !store.state.isAuthenticated
  ) {
    next({ name: "Login", query: { to: to.path } });
  } else {
    next();
  }
});

export default router;
