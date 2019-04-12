//引入路由组件
import Layout from '../layout/Layout.vue'
import TotalTable from '../components/TotalTable.vue'
import SalaryTable from '../components/SalaryTable.vue'
import User from '../components/User.vue'
import HelloWorld from '../components/HelloWorld.vue'
import BusinessTable from '../components/BusinessTable.vue'
import ReceiptTable from '../components/ReceiptTable.vue'
import Login from '../components/login'
//定义路由
const routes = [
    {
        path: '/',
        component: Login
    },
    {
        path: '/',
        component: Layout,
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
            {
                path: 'User',
                name: 'User',
                component: User
            },
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

export default routes