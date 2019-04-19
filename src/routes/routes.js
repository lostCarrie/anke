//引入路由组件
import Layout from '../layout/Layout.vue'
import SalaryTable from '../components/SalaryTable.vue'
// import User from '../components/User.vue'
import HelloWorld from '../components/HelloWorld.vue'
import BusinessTable from '../components/BusinessTable.vue'
import ReceiptTable from '../components/ReceiptTable.vue'
import Login from '../components/login'
const User = resolve => require(['../components/User.vue'])
//定义路由
export const routes = [
    {
        path: '/login',
        component: Login
    },
    {
        path: '/',
        component: Layout,
        redirect: '/HelloWorld',
        name: '首页',
        children: [
            {
                path: 'HelloWorld',
                name: 'HelloWorld',
                component: HelloWorld
            },
            {
                path: 'SalaryTable',
                name: 'SalaryTable',
                component: SalaryTable
            },
            // {
            //     path: 'User',
            //     name: 'User',
            //     component: User
            // },
            {
                path: 'BusinessTable',
                name: 'BusinessTable',
                component: BusinessTable
            },
            {
                path: 'ReceiptTable',
                name: 'ReceiptTable',
                component: ReceiptTable
            }
        ]
    }
]
export const asyncRouterMap = [
    {
        path: '/User',
        component: Layout,
        name: '权限测试',
        meta: { role: ['admin', 'super_editor']},
        children: [
            {
                path: 'index',
                component: User,
                name: '权限测试页',
                meta: { role: ['admin', 'super_editor']}
            }
        ]
    },
    {path: '*',redirect: '/404', hidden: true}
]

