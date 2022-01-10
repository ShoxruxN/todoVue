<template>
  <div class="header">
      <div class="header__search">
          <img src="@/assets/search.png" alt="">
          <input type="text" @input='searching($event)' placeholder="Search for any training you want ">
      </div>
      <div class="header__right">
        <div class="header__notif" @click="delsToggle = !delsToggle">
                <span class="header__notif--count" v-show='delTodos.length>0'></span>
              <img src="@/assets/notif.png" alt="" >
        </div>
        <div class="header__dels" :class="{'active':delsToggle && delTodos.length>0}">
            <div class="header__dels--item" v-for="(todo,index) of delTodos" :key='index'>
                {{todo.title}}
                <button @click='toHold(todo)'>X</button>
            </div>
        </div>
        <div class="header__avatar"><img src="@/assets/profile.png" alt=""></div>
      </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            delsToggle:false
        }
    },
    methods: {
        toHold(todo){
            todo.status = 0
            this.$store.dispatch('delTodos',todo)
        },
        searching(event){
            this.$store.commit('searchTodo',event.target.value)
        }
    },
    computed: {
        delTodos(){
            return this.$store.getters.todosDeleted
        }
    }
}
</script>

<style lang="less">
    .header {
        display: flex;
        align-items: center;
        margin-bottom: 47px;
        &__dels {
            position: absolute;
            top: 60px;
            right: 0;
            padding: 0px 10px;
            border-radius: 10px;
            box-shadow:0px 0px 13px 0px rgba(0,0,0,0.12);
            width: 300px;
            transition: 0.5s;
            height: 0;
            overflow: hidden;
            &.active {
                height: auto;
                padding: 10px;
            }
            &--item {
                border-bottom: 1px solid #000;
                padding: 10px 0px;
                display: flex;
                justify-content: space-between;
                button {
                    background: unset;
                    border:0;
                }
                &:last-child{
                    border-bottom: 0;
                }
            }
        }
        &__search {
            display: flex;
            align-items: center;
            input {
                border:0;
                color: #90A0B7;
                min-width: 300px;
                &:focus {
                    outline: 0;
                }
            }
            img {
                margin-right: 15px;
            }
        }
        &__right {
            display: flex;
            align-items: center;
            margin-left: auto;
            position: relative;
        }
        &__avatar {
            margin-left: 33px;
        }
        &__notif{
            position: relative;
            &--count {
                position: absolute;
                display: inline-block;
                background-color: #F7685B;
                border:1px solid #fff;
                width: 8px;
                height: 8px;
                right: -3px;
                top: -1px;
                border-radius: 50%;
            }
        }
    }
</style>