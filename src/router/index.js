import Vue from 'vue'
import VueRouter from 'vue-router'
import Landing from '../views/Landing.vue'
import HomeView from '../views/HomeView.vue'
import Diary from '../views/Diary.vue'
import Profile from '../views/Profile.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import store from '@/store'



Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    meta: {
      needsUser: true
    }
   
  },
  {
    path: '/bmi',
    name: 'bmi',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/BMI.vue'),
    meta: {
      needsUser: true
    }
  },
  {
    path: '/',
    name: 'landing',
    component: Landing
  },
  {
    path: '/diary',
    name: 'diary',
    component: Diary,
    meta:{
      needsUser: true
    }
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
    meta: {
      needsUser: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  console.log("Stara ruta", from.name, "->nova ruta", to.name, "korisnik", store.currentUser)

  const noUser = store.currentUser === null;
  if(noUser && to.meta.needsUser){
    next('login')
  }else{
    next();
  }
  
})

export default router
