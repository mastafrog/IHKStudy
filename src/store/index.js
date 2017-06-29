import Vuex from 'vuex'
import Vue from 'vue'
import cart from './cart'
import products from './products'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: {
      name: 'coffce',
      img: 'dist/images/1.jpg'
    }
  }
})

const actions = (['nothing'])/* {
  [{
    text: 'Question 1',
    responses: [{
        text: 'Wrong, too bad.'
      },
      {
        text: 'Right!',
        correct: true
      }]
  }, {
    text: 'Question 2',
    responses: [{
        text: 'Right answer',
        correct: true
      },
      {
        text: 'Wrong answer'
      }
    ]
  }]
} */

export default new Vuex.Store({
  modules: {
    cart,
    products,
    store,
    actions
  }
})
