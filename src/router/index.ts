
import { createRouter, createWebHashHistory } from 'vue-router';
import Routes from '@/consts/Routes';
import HomeView from '@/views/HomeView.vue';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: Routes.HOME,
      component: HomeView
    },
    {
      path: Routes.CALENDAR,
      component: () => import('../views/CalendarView.vue'),
    },
    {
      path: Routes.LOGIN,
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: Routes.REGISTER,
      component: () => import('../views/RegisterView.vue'),
    },
  ],
});

export default router;