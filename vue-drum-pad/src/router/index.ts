// import { useStore } from "vuex";
import { store } from "@/store";
import AppMainVue from "@/views/AppMain.vue";
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: AppMainVue,
  },
  {
    path: "/:code",
    name: "homeWithCode",
    component: AppMainVue,
    beforeEnter: (from, to, next) => {
      console.log(from.params.code);
      // const store = useStore(key);
      store.dispatch("registerCode", from.params.code);
      next();
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
