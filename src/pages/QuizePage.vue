<template>
<div class="container">
  <h1>{{ quiz.title }}</h1>
  <!-- index is used to check with current question index -->
  <div v-for="(question, index) in quiz.questions">
    <!-- Hide all questions, show only the one with index === to current question index -->
    <div v-show="index === questionIndex">
      <h2>{{ question.text }}</h2>
      <ol>
        <li v-for="response in question.responses">
          <label>
              <!-- The radio button has three new directives -->
              <!-- v-bind:value sets "value" to "true" if the response is correct -->
              <!-- v-bind:name sets "name" to question index to group answers by question -->
              <!-- v-model creates binding with userResponses -->
              <input type="radio"
                     v-bind:value="response.correct"
                     v-bind:name="index"
                     v-model="userResponses[index]"> {{response.text}}
            </label>
        </li>
      </ol>
      <!-- The two navigation buttons -->
      <!-- Note: prev is hidden on first question -->
      <button v-if="questionIndex > 0" v-on:click="prev">
          prev
        </button>
      <button v-on:click="next">
          next
        </button>
    </div>
  </div>
  <div v-show="questionIndex === quiz.questions.length">
    <h2>
      Quiz finished
    </h2>
    <p>
      Total score: {{ score() }} / {{ quiz.questions.length }}
    </p>
  </div>
</div>

<!--  <div class="question-item">
    <router-link to="/" class="back-link">BACK</router-link>
    <div class="question-title">{{ question.title }}</div>
    <div class="question-details">
      <div class="inventory">In Stock: {{ question.inventory }}</div>
      <button class="add-button" :disabled="!question.inventory"
        @click="anwser(quize)">{{ question.inventory > 0 ? "Add to cart" : "Out Of Stock" }} blabla</button>
    </div>
  </div> -->
</template>

<script>
import {
  mapActions,
  mapGetters
} from 'vuex'

var quiz = {
  title: 'Ihk Quiz',
  questions: [{
    text: 'Question 1',
    responses: [{
      text: 'Wrong, too bad.'
    },
    {
      text: 'Right!',
      correct: true
    }
    ]
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
}
console.log(quiz)

export default {
  data () {
    return {
      quiz: quiz,
      questionIndex: 0,
      userResponses: Array(quiz.questions.length).fill(false)
    }
  },
  mounted () {
    this.getAllProducts()
  },
  computed: {
    ...mapGetters([
      'allQuestions'
    ]),
    product () {
      let id = parseInt(this.$route.params.id)
      return this.allQuestions.find((p) => p.id === id) || {}
    }

  },
  methods: {
    ...mapActions([
      'getAllQuestions',
      'anwser'
    ]),
    next: function () {
      this.questionIndex++
    },
    // Go to previous question
    prev: function () {
      this.questionIndex--
    },
    score: function () {
      return this.userResponses.filter(function (val) { return val }).length
    }
  }
}
</script>

<style>

</style>
