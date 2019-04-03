<template>
    <section>
        <header>
            <input placeholder="请输入Todo事件" class="new-todo">
        </header>
        <section v-show="todos.length" class="main">
            <!-- <input type="checkbox"/>
            <label/> -->
            <ul>
                <todo/>
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
            todos: defalutList
        }
    }
}
</script>
<style>
@import './index.scss'
</style>
