<template>
    <section>
        <header>
            <input placeholder="请输入Todo事件" class="new-todo">
        </header>
        <section v-show="todos.length" class="main">
            <!-- <input type="checkbox"/>
            <label/> -->
            <ul class="todo-list">
                <todo v-for="(todo, index) in filteredTodos"
                      :key="index"
                      :todo="todo"
                      @togoTodo="toggleTodo"
                      @deleteTodo="deleteTodo"/>
            </ul>
        </section>
        <footer v-show="todos.length" class="footer">
            <span>

            </span>
        </footer>
    </section>
</template>
<script>
import Todo from './Todo.vue'
const STORAGE_KEY = 'todos';
const filters = {
    all: todos => todos,
    active: todos => todos.filter(todo => !todo.done),
    completed: todos => todos.filter(todos => todo.done)
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
        }
    }
}
</script>

<style lang="scss">
    @import './index.scss';
</style>
