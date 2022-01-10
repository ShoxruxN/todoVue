import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos:[],
    search: ''
  },
  mutations: {
    newTodo(state,payload){
      state.todos.push(payload)
    },
    searchTodo(state,payload){
      state.search = payload
    },
    allTodo(state,payload){
      state.todos = payload
    },
    removeTodo(state,payload){
      state.todos.find(todo => {
        if (todo.id == payload.id)
          todo = payload
      })
    },
  },
  getters: {
    todosOnHold(state){
      if (state.search !== ''){
        return state.todos.filter(todo => {
          return todo.status == 0 && todo.title.toLowerCase().indexOf(state.search.toLowerCase()) !== -1
        })
      } else {
        return state.todos.filter(todo => {
          return todo.status == 0
        })
      }
    },
    todosCompleted(state){
      if (state.search !== ''){
        return state.todos.filter(todo => {
          return todo.status == 1 && todo.title.toLowerCase().indexOf(state.search.toLowerCase()) !== -1
        })
      } else {
        return state.todos.filter(todo => {
          return todo.status == 1
        })
      }
    },
    todosDeleted(state){
        return state.todos.filter(todo => {
          return todo.status == 2
        })
    },
    countTodos(state){
      let todos = state.todos.filter(todo => {
        return todo.status !== 2
      })
      return todos.length
    }
  },
  actions: {
    delTodos(context,payload){
      axios.put('http://localhost:3000/todos/'+payload.id,payload).then(response => {
          context.commit('removeTodo',response.data)
      })
    },
    addNewTodo(context,payload){
      axios.post('http://localhost:3000/todos',payload).then(response => {
        context.commit('newTodo',response.data)
      })
    },
    getAllTodos(context){
      axios.get('http://localhost:3000/todos').then(response => {
        context.commit('allTodo',response.data)
      })
    }
  },
  modules: {

  }
})
