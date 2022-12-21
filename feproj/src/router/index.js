import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SubmitPolicy from '../views/SubmitPolicy.vue'
import ElementsView from '../views/ElementsView.vue'
import ComparePolicies from '../views/ComparePolicies.vue'
import ViewPolicies from '../views/policies/ViewPolicies.vue'
import SinglePolicy from '../views/policies/SinglePolicy.vue'
import AboutView from '../views/AboutView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about/',
    name: 'about',
    component: AboutView 
  },
  {
    path: '/submit',
    name: 'submit',
    component: SubmitPolicy,
  },
  {
    path: '/elements',
    name: 'elements',
    component: ElementsView, 
  },
  {
    path: '/view-policies',
    name: 'view-policy',
    component: ViewPolicies,
  },

  {
    path: '/view-policies/:slug',
    name: 'single-policy',
    component: SinglePolicy
  },

  {
    path:'/view-elementflags',
    name: 'view-elementflags',
    component: SinglePolicy

  },
  {
    path: '/compare',
    name: 'compare',
    component: ComparePolicies,
  }
]

const router = createRouter({
  // eslint-disable-next-line no-undef
  history: createWebHistory(process.env.NODE_ENV === 'production' ? '/frontend-privacybarn/' : '/'),
  routes
})

export default router
