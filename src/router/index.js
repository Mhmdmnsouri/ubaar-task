import { createRouter, createWebHistory } from "vue-router";
import AddAddress from "@/views/AddAddress.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/add-address",
      name: "address.add",
      component: AddAddress,
    },
    {
      path: "/",
      redirect: { name: "address.add" },
    },
  ],
});

export default router;
