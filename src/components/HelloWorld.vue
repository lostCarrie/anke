<template>
  <div>
    <el-row :gutter="8">
      <el-col :xs="{span: 24}" :sm="{span:12}" :md="{span:12}" :lg="{span:6}" :xl="{span:6}">
        <todo-list/>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import TodoList from '../miniComponents/TodoList'
export default {
  name: 'Dashboard',
  components: {
    TodoList
  }
}
</script>
