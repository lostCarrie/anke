<template>
    <section class="todoapp">
        <header class="header">
            <input class="new-todo" autocomplete="off" placeholder="请输入Todo事件" @keyup.enter="addTodo">
        </header>
        <section v-show="todos.length" class="main">
            <input type="checkbox" :checked="allChecked" class="toggle-all" id="toggle-all" @change="toggleAll({ done: !allChecked })"/>
            <label for="toggle-all"/>
            <ul class="todo-list">
                <todo v-for="(todo, index) in filteredTodos"
                      :key="index"
                      :todo="todo"
                      @toggleTodo="toggleTodo"
                      @deleteTodo="deleteTodo"
                      @editTodo="editTodo"/>
            </ul>
        </section>
        <footer v-show="todos.length" class="footer">
            <span class="todo-count">
                余<strong>{{ remaining }}</strong>个项目
            </span>
            <ul class="filters">
                <li v-for="(val,key) in filters" :key="key">
                    <a :class="{selected: visibility === key}" @click.prevent="visibility = key">{{ key | capitalize }}</a>
                </li>
            </ul>
        </footer>
    </section>
</template>
<script>
import Todo from './Todo.vue'
const STORAGE_KEY = 'todos';
const filters = {
    all: todos => todos,
    active: todos => todos.filter(todo => !todo.done),
    completed: todos => todos.filter(todo => todo.done)
}
const defalutList = [
  { text: 'star this repository', done: false },
  { text: 'fork this repository', done: false },
  { text: 'follow author', done: false },
  { text: 'vue-element-admin', done: true },
  { text: 'vue', done: true },
  { text: 'element-ui', done: true },
  { text: 'axios', done: true },
  { text: 'webpack', done: true }
]
export default {
    components: {
        Todo
    },
    filters:{
        pluralize: (n, w) => n === 1 ? w: w +'s',
        capitalize: s => s.charAt(0).toUpperCase() + s.slice(1)
    },
    data() {
        return {
            todos: defalutList,
            filters,
            visibility: 'all'
        }
    },
    computed:{
        filteredTodos() {
            return filters[this.visibility](this.todos);
        },
        allChecked() {
            return this.todos.every(todo => todo.done)
        },
        remaining() {
            return this.todos.filter(todo => !todo.done).length
        }
    },
    methods: {
        setLocalStorage() {
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(this.todos));
        },
        toggleTodo(val) {
            val.done = !val.done;
            this.setLocalStorage();
        },
        deleteTodo(todo) {
            this.todos.splice(this.todos.indexOf(todo), 1);
            this.setLocalStorage();
        },
        editTodo({todo, value}){
            todo.text = value;
            this.setLocalStorage();
        },
        addTodo(e) {
            const text = e.target.value;
            if (text.trim()) {
                this.todos.push({
                    text,
                    done: false
                })
                this.setLocalStorage();
            }
        },
        toggleAll({ done }) {
            this.todos.forEach(todo => {
                todo.done = done
                this.setLocalStorage()
            })
        }
    }
}
</script>

<style lang="scss">
    @import './index.scss';
</style>
