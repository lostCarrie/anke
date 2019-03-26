//引入路由组件
import Layout from '../layout/Layout.vue'
import TotalTable from '../components/TotalTable.vue'
import SalaryTable from '../components/SalaryTable.vue'
import User from '../components/User.vue'
import BusinessTable from '../components/BusinessTable.vue'
import ReceiptTable from '../components/ReceiptTable.vue'
//定义路由
const routes = [
    {
        path: '/',
        component: Layout
    },
    {
        path: '/',
        component: Layout,
        children: [
            {
                path: 'TotalTable',
                name: 'TotalTable',
                component: TotalTable
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