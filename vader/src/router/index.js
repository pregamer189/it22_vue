import { createRouter, createWebHistory } from 'vue-router'
import ForecastView from '../views/ForecastView.vue'
import LocationsView from '@/views/LocationsView.vue'
import ForecastResult from '@/components/ForecastResult.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ForecastView,
    },
    {
      path: '/locations',
      name: 'locations',
      component: LocationsView,
    },
    {
      path: '/forecast/:location',
      name: 'forecast',
      component: ForecastView,
      props: true,
    },

    {
      path: '/locations/:location',
      name: 'ForecastResult',
      component: ForecastResult,
      props: true,
    },
  ],
})

export default router
