import Vue from 'vue'
import App from './App.vue'

//引入完整的Element模块
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '../theme/index.css'

import VueRouter from 'vue-router' //引入路由
import {routes, asyncRouterMap} from './routes/routes.js'//引入路由配置
import * as filters from './filters' //引入过滤器
import './style/index.scss'//引入全局样式
import store from './store'
Vue.use(ElementUI)
Vue.use(VueRouter)

//注册过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

//创建router实例，传相应配置
const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  if (store.getters.token) {
    if (to.path === '/login') {
      next({ path: '/' });
    } else {
      if (store.getters.roles.length === 0) {
        store.dispatch('GetInfo').then(res => {
          const roles = res.data.role;
          store.dispatch('GenerateRoutes', { roles }).then(() => {
            router.addRoutes(store.getters.addRoutes);
            next({ ...to, replace: true })
          })
        }).catch(err => {
          console.log(err);
        });
      } else {
        next()
      }
    }
  }
})
new Vue({
  render: h => h(App),
  //创建和挂载根实例，通过router配置参数注入路由，并让整个应用都有路由功能
  router,
  store
}).$mount('#app')
