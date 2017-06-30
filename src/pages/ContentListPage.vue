
<template>
<section class="todoapp">
  <div class="container">
    <div class="field">
      <p class="control">
      <textarea class="new-todo textarea"  autofocus autocomplete="off" placeholder="What needs to be done?" v-model="newTodo"  @keydown="inputHandler">__hello__</textarea>
      </p>
  </div>

  <transition-group name="fade" mode="out-in" tag="p">
  <section class="main" v-show="todos.length" v-cloak>
    <input class="toggle-all" type="checkbox" v-model="allDone">
    <ul class="todo-list">
      <li v-for="todo in filteredTodos" class="todo" :key="todo.id" :class="{ completed: todo.completed, editing: todo == editedTodo }">
        <div class="view">
          <input class="toggle" type="checkbox" v-model="todo.completed">
          <label  v-html="compiledMarkdown" @dblclick="editTodo(todo)">{{ todo.title }}</label>
          <button class="destroy" @click="removeTodo(todo)"></button>
        </div>
        <textarea class="edit" type="text" v-model="todo.title" v-todo-focus="todo == editedTodo" @blur="doneEdit(todo)" @keyup.enter="doneEdit(todo)" @keyup.esc="cancelEdit(todo)"></textarea>
      </li>
    </ul>
  </section>
  <div v-show="todos.length" v-cloak>
    <span class="todo-count">
          <strong>{{ remaining }}</strong> {{ remaining | pluralize }} left
        </span>
    <ul class="filters">
      <li><a href="#/all" :class="{ selected: visibility == 'all' }">All</a></li>
      <li><a href="#/active" :class="{ selected: visibility == 'active' }">Active</a></li>
      <li><a href="#/completed" :class="{ selected: visibility == 'completed' }">Completed</a></li>
    </ul>
    <button class="clear-completed" @click="removeCompleted" v-show="todos.length > remaining">Clear completed</button>
  </div>
  </transition-group>
  </div>
</section>
</template>

<script>
// import { mapActions, mapGetters } from 'vuex'
var marked = require('marked')
var STORAGE_KEY = 'todos-vuejs-2.0'
var todoStorage = {
  fetch: function () {
    var todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    todos.forEach(function (todo, index) {
      todo.id = index
    })
    todoStorage.uid = todos.length
    return todos
  },
  save: function (todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }
}

// visibility filters
var filters = {
  all: function (todos) {
    return todos
  },
  active: function (todos) {
    return todos.filter(function (todo) {
      return !todo.completed
    })
  },
  completed: function (todos) {
    return todos.filter(function (todo) {
      return todo.completed
    })
  }
}
export default {
  data () {
    return {
      todos: todoStorage.fetch(),
      newTodo: '',
      editedTodo: null,
      visibility: 'all'
    }
  },
  watch: {
    todos: {
      handler: function (todos) {
        todoStorage.save(todos)
      },
      deep: true
    }
  },
  computed: {
    filteredTodos: function () {
      return filters[this.visibility](this.todos)
    },
    remaining: function () {
      return filters.active(this.todos).length
    },
    compiledMarkdown: function () {
      var value = this.newTodo && this.newTodo.trim()
      if (!value) {
        return
      }
      return marked(value, { sanitize: true })
    },
    allDone: {
      get: function () {
        return this.remaining === 0
      },
      set: function (value) {
        this.todos.forEach(function (todo) {
          todo.completed = value
        })
      }
    }
  },
  methods: {
    addTodo: function () {
      var value = this.newTodo && this.newTodo.trim()
      if (!value) {
        return
      }
      this.todos.push({
        id: todoStorage.uid++,
        title: value,
        completed: false
      })
      this.newTodo = ''
    },

    removeTodo: function (todo) {
      this.todos.splice(this.todos.indexOf(todo), 1)
    },

    editTodo: function (todo) {
      this.beforeEditCache = todo.title
      this.editedTodo = todo
    },

    doneEdit: function (todo) {
      if (!this.editedTodo) {
        return
      }
      this.editedTodo = null
      todo.title = todo.title.trim()
      if (!todo.title) {
        this.removeTodo(todo)
      }
    },

    cancelEdit: function (todo) {
      this.editedTodo = null
      todo.title = this.beforeEditCache
    },

    removeCompleted: function () {
      this.todos = filters.active(this.todos)
    },

    inputHandler (e) {
      if (e.keyCode === 13 && !e.shiftKey) {
        e.preventDefault()
        this.addTodo()
      }
    }
  },

  filters: {
    pluralize: function (n) {
      return n === 1 ? 'item' : 'items'
    }
  },

  directives: {
    'todo-focus': function (el, binding) {
      if (binding.value) {
        el.focus()
      }
    }
  }
}
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transform: scale(1);
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  transform: scale(1.3);
  opacity: 0
}

.todo-list li.editing .view {
  display: none;
}

.todo-list li label {
    word-break: break-all;
    padding: 15px 60px 15px 15px;
    margin-left: 45px;
    display: block;
    line-height: 1.2;
    transition: color 0.4s;
  }

.todo-list li .toggle {
    text-align: center;
    width: 40px;
    /* auto, since non-WebKit browsers doesn't support input styling */
    height: auto;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto 0;
    border: none;
    /* Mobile Safari */
    -webkit-appearance: none;
    appearance: none;
}

.todo-list li .toggle:after {
    content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-10 -18 100 135"><circle cx="50" cy="50" r="50" fill="none" stroke="#ededed" stroke-width="3"/></svg>');
}

.todo-list li .toggle:checked:after {
    content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-10 -18 100 135"><circle cx="50" cy="50" r="50" fill="none" stroke="#bddad5" stroke-width="3"/><path fill="#5dc2af" d="M72 25L42 71 27 56l-4 4 20 20 34-52z"/></svg>');
}

.hidden {
    display: none;
}

label[for='toggle-all'] {
    display: none;
}

.todo-list li {
    position: relative;
    font-size: 24px;
    border-bottom: 1px solid #ededed;
}

.todo-list li .toggle {
    text-align: center;
    width: 40px;
    /* auto, since non-WebKit browsers doesn't support input styling */
    height: auto;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto 0;
    border: none;
    /* Mobile Safari */
    -webkit-appearance: none;
    appearance: none;
}


.todo-list li.completed label {
    color: #d9d9d9;
    text-decoration: line-through;
}
.todo-list li .destroy {
    display: none;
    position: absolute;
    top: 0;
    right: 10px;
    bottom: 0;
    width: 40px;
    height: 40px;
    margin: auto 0;
    font-size: 30px;
    color: #cc9a9a;
    margin-bottom: 11px;
    transition: color 0.2s ease-out;
}
.todo-list li .destroy:hover {
    color: #af5b5e;
}
.todo-list li .destroy:after {
    content: '×';
}
.todo-list li:hover .destroy {
    display: block;
}
.todo-list li .edit {
    display: none;
}
.todo-list li.editing:last-child {
    margin-bottom: -1px;
}


</style>
