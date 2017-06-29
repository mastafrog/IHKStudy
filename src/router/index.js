import Vue from 'vue'
import Router from 'vue-router'
import CartPage from '@/pages/CartPage'
// import HomePage from '@/pages/HomePage'
import ProductPage from '@/pages/ProductPage'
import QuizePage from '@/pages/QuizePage'
import ContentListPage from '@/pages/ContentListPage'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'home',
    component: ContentListPage
  },
  {
    path: '/cart',
    name: 'cart',
    component: CartPage
  },
  {
    path: '/product/:id',
    name: 'product',
    component: ProductPage
  },
  {
    path: '/quiz',
    name: 'quiz',
    component: QuizePage
  }
  ]
})
