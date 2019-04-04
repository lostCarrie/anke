<template>
    <li :class="{ completed: todo.done, editing: editing}">
        <div class="view">
            <input type="checkbox"
                   :checked="todo.done"
                   class="toggle"
                   @change="toggleTodo(todo)">
            <label @dblclick="editing = true" v-text="todo.text"/>
            <button class="destroy" @click="deleteTodo(todo)"/>
        </div>
        <input v-show="editing"
               :value="todo.text">
    </li>
</template>
<script>
export default {
    name: 'Todo',
    props: {
        todo: Object,
        default: function(){
            return {}
        }
    },
    data() {
        return {
            editing: false
        }
    },
    methods: {
        toggleTodo(todo) {
            this.$emit('toggleTodo', todo);
        },
        deleteTodo(todo) {
            this.$emit('deleteTodo', todo);
        }
    }
}
</script>
