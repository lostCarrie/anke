<template>
  <div id="app">
    <User></User>
    <p>this is a test!</p>
    <Test></Test>
  </div>
</template>

<script>
import User from './components/User.vue'
import Test from './components/Test.vue'

export default {
  name: 'app',
  components: {
    User,
    Test
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
