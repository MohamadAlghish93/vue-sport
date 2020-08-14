import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/components/Login";
import Register from "@/components/Register";
import ListMatch from "@/components/match/ListMatch";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
    alias: "/"
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  },
  {
    path: "/match-list",
    name: "Match",
    component: ListMatch
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeResolve((to, from, next) => {
	// If this isn't an initial page load.
	if (to.name) {
		// Start the route progress bar.
		NProgress.start()
	}
	next()
})

router.afterEach((to, from) => {
// Complete the animation of the route progress bar.
	NProgress.done()
})

export default router;