<template>
  <div class="modal">
      <div class="modal__title">New Todo</div>
      <button class="close" @click="$emit('closeModal',false)">X</button>
      <input type="text" v-model='todo.title'>
      <select v-model='todo.process'>
          <option :value="index" v-for='(pro,index) of process' :key='index'>{{pro}}</option>
      </select>
      <select v-model='todo.important'>
          <option value="normal">Normal</option>
          <option value="Minor">Minor</option>
          <option value="Critical">Critical</option>
      </select>
      <div class="modal__list">
          <label>
              <input type="checkbox" v-model='todo.team' value="Person-1">Person-1
          </label>
          <label>
              <input type="checkbox" v-model='todo.team' value="Person-2">Person-2
          </label>
          <label>
              <input type="checkbox" v-model='todo.team' value="Person-3">Person-3
          </label>
          <label>
              <input type="checkbox" v-model='todo.team' value="Person-4">Person-4
          </label>
      </div>
      <button @click="add()">Save</button>
  </div>
</template>

<script>
export default {
    props: ['todo'],
    data() {
        return {
            process: ['Pending','In Progress','Completed','Cancelled']
        }
    },
    methods: {
        add(){
            if (this.todo.process == 2 || this.todo.process == 3){
                this.todo.status = 1
            }
            if (this.todo.process == 0 || this.todo.process == 1){
                this.todo.status = 0
            }
            this.$store.dispatch('delTodos',this.todo)
            this.$emit('closeModal',false)
        }
    }
}
</script>

<style>

</style>