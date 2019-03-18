import Vue from 'vue'
import App from './App.vue'

//引入完整的Element模块
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '../theme/index.css'
//引入路由
import VueRouter from 'vue-router'
//引入路由配置
import routes from './routes/routes.js'


Vue.use(ElementUI)
Vue.use(VueRouter)

Vue.config.productionTip = false

//创建router实例，传相应配置
const router = new VueRouter({
  routes
})
new Vue({
  render: h => h(App),
  //创建和挂载根实例，通过router配置参数注入路由，并让整个应用都有路由功能
  router
}).$mount('#app')
