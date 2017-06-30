import Vue from 'vue'
import Router from 'vue-router'
import MarkdownEditorPage from '@/pages/MarkdownEditorPage'
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
  /*  children: [
      { path: '', component: UserHome },
  */ },
  {
    path: '/editor:id',
    name: 'editor',
    component: MarkdownEditorPage
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
