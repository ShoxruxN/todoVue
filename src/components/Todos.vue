<template>
    <div class="todos">
        <div class="todos__title">
            <slot name='todos__title'></slot>
        </div>
        <table>
            <tr v-for='todo of todos' :key='todo.id'>
                <td>
                    <div class="todos__name" title='Test'>
                        {{todo.title}}
                        </div>
                </td>
                <td>
                    <div class="todos__process" :class="process[todo.process].split(' ').join('').toLowerCase()">
                        {{process[todo.process]}}
                    </div>
                </td>
                <td>
                    <div class="todos__imp" :class='todo.important.toLowerCase()'>
                        {{todo.important}}
                    </div>
                </td>
                <td>
                    <div class="todos__team">
                        <img :src="require('@/assets/'+ava.toLowerCase()+'.png')" alt="" v-for='(ava,index) of todo.team' :key='index'>
                    </div>
                </td>
                <td :ref="'toggle-'+todo.id">
                    <button 
                    @click='toggleBox(todo.id)' class="todos__more">
                        <span></span>
                    </button>
                    <div class="todos__box">
                        <button @click='changeStatus(todo)'>
                            {{(todo.status == 0)?'To completed':'To on hold'}}
                        </button>
                        <button @click='edit(todo)'>Edit</button>
                        <button @click='del(todo)'>Delete</button>
                    </div>
                </td>
            </tr>
        </table>
        <slot name='todos__footer'></slot>
        <Edit :class="{'active':editToggle}" :todo='oneTodo' @closeModal = 'editToggle = $event'/> 
    </div>
</template>

<script>
import Edit from './Edit.vue'
export default {
    components: {
        Edit,
    },
    props: ['todos'],
    data() {
        return {
            editToggle:false,
            oneTodo: {},
            toggle:false,
            process: ['Pending','In Progress','Completed','Cancelled']
        }
    },
    computed: {

    },
    methods: {
        edit(todo){
            this.oneTodo = todo
            this.editToggle = true
        },
        del(todo){
            todo.status = 2
            this.$store.dispatch('delTodos',todo)
        },
        toggleBox(id){
            let refName = 'toggle-'+id // toggle-3
            let item = this.$refs[refName]
            item[0].classList.toggle('active')
        },
        changeStatus(todo){
            console.log(todo)
            if (todo.status == 0) {
                todo.status = 1
                todo.process = 2
            } else {
                todo.status = 0
                todo.process = 0
            }
            this.$store.dispatch('delTodos',todo)
        }
    }
}
</script>

<style lang='less'>
    .todos {
        margin-bottom: 40px;
        &__title {
            font-family: 'Poppins', sans-serif;
            font-weight: 400;
            margin-bottom: 7px;
            font-size: 18px;
        }
        &__box {
                position: absolute;
                background-color: #f1f1f1;
                padding: 0px 10px;
                overflow: hidden;
                right: -100%;
                border-radius: 5px;
                top: 20px;
                display: flex;
                flex-direction: column;
                align-items: baseline;
                height: 0;
                transition: 0.5s;
                &.active {
                    
                }
            button {
                background: unset;
                border:0;
                display: inline-block;
                margin-bottom: 5px;
                &:last-child {
                    margin-bottom: 0;
                }
                &:hover {
                    color: #884CB2;
                }
            }
        }
        table {
            width: 100%;
            td {
                padding: 21px 0px;
                border-bottom: 0.5px solid #E0E0E0;
                position: relative;
                &:first-child{
                    width: 50%;
                }
                &:nth-child(3),
                &:nth-child(2){
                    width: 15%;
                }
                &:nth-child(4){
                    width: 10%;
                }
                &.active {
                    .todos{
                        &__more {
                            transform: rotate(90deg);
                        }
                        &__box {
                            padding: 10px;
                            height: auto;
                        }
                    }
                }
            }
        }
        &__team {
            display: flex;
            align-items: center;
            position: relative;
            img {
                position: relative;
                &:nth-child(2){
                    left: -7px;
                }
                &:nth-child(3){
                    left: -14px;
                }
                &:nth-child(4){
                    left: -21px;
                }
                &:nth-child(5){
                    left: -28px;
                }
                &:nth-child(6){
                    left: -35px;
                }
            }
            &--count {
                width: 22px;
                height: 22px;
                background-color: #6FCF97;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #fff;
                font-size: 9px;
                position: relative;
                left: -26px;
            }
        }
        &__more {
            display: inline-block;
            border:0;
            width: 22px;
            height: 22px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #F2F2F2;
            border-radius: 50%;
            margin-left: auto;
            transition: 0.5s;
            &.active {
                transform: rotate(90deg);
            }
            span {
                display: inline-block;
                width: 2.5px;
                height: 2.5px;
                background-color: #DCD9D9;
                position: relative;
                border-radius: 50%;
                &:after,
                &:before {
                    content: '';
                    display: inline-block;
                    width: 2.5px;
                    height: 2.5px;
                    background-color: #DCD9D9;
                    position: absolute;
                    border-radius: 50%;
                    left: -5px;
                }
                &:after {
                    left:unset;
                    right: -5px;
                }
            }
        }
        &__imp {
            font-size: 12px;
            display: flex;
            align-items: center;
            &.critical:before {
                border-color: #EB5757;
            }
            &.minor:before {
                border-color:#219653;
            }
            &:before {
                content: '';
                width: 8px;
                height: 8px;
                border:2px solid #F2C94C;
                display: inline-block;
                margin-right: 4px;
                border-radius: 50%;
            }
        }
        &__process {
            width: 77px;
            border-radius: 8.5px;
            font-size: 11px;
            line-height: 18px;
            text-align: center;
            letter-spacing: -0.0676923px;
            height: 17px;
            &.pending {
                background: rgba(242, 153, 74, 0.2);
                color: #F2994A;
            }
            &.inprogress {
                background: rgba(86, 204, 242, 0.2);
                color: #56CCF2;
            }
            &.cancelled {
                color: #EB5757;
                background: rgba(235, 87, 87, 0.2); 
            }
            &.completed {
                color: #27AE60;
                background: rgba(39, 174, 96, 0.2);
            }
        }
        &__name {
            font-size: 14px;
            position: relative;
            padding-left: 15px;
            
            &:before {
                content: '';
                width: 10px;
                height: 10px;
                background: linear-gradient(133.9deg, rgba(243, 71, 122, 0.2) 0.24%, rgba(136, 76, 178, 0.2) 95.04%);
                display: inline-block;
                position: absolute;
                left: 0;
                top: 0;
                bottom: 0;
                margin: auto;
                border-radius: 50%;
            }
            &:after {
                content: '';
                width: 6px;
                height: 6px;
                background: linear-gradient(133.9deg, rgba(243, 71, 122, 0.7) 0.24%, rgba(136, 76, 178, 0.7) 95.04%);
                border-radius: 50%;
                position: absolute;
                left: 2px;
                top: 0;
                bottom: 0;
                margin: auto;
                display: inline-block;
            }
        }
    }
</style>