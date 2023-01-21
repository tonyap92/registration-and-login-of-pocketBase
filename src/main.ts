import { createApp } from 'vue'
import PocketBase from 'pocketbase';



import Routes from './consts/Routes';
import router from './router'
import App from './App.vue'


import './assets/main.css'
import 'material-design-icons-iconfont'

const pb = new PocketBase(import.meta.env.VITE_DATABASE_URL);
// pb.authStore.clear()

console.log('> pb.authStore.isValid:', pb.authStore.isValid);

router.beforeEach((to, from, next) => {
    const authRoutes = [Routes.HOME, Routes.LOGIN, Routes.REGISTER, Routes.CALENDAR];
    const indexOfAuthRoute = authRoutes.indexOf(to.path);
    if (indexOfAuthRoute < 0 && !pb.authStore.isValid) {
      next({ path: Routes.LOGIN });
    } else next();
  });


const app = createApp(App)
app.use(router);
app.provide('pb', pb);
app.mount('#app');