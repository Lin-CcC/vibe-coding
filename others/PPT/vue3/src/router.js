import { createRouter, createWebHashHistory } from "vue-router";
import { slides } from "./slides";
import SlidePage from "./views/SlidePage.vue";

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: "/", redirect: `/slide/${slides[0]?.id ?? "1"}` },
    { path: "/slide/:id", component: SlidePage },
    { path: "/:pathMatch(.*)*", redirect: `/slide/${slides[0]?.id ?? "1"}` },
  ],
});

