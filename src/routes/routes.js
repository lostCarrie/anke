//引入路由组件
import Layout from '../layout/Layout.vue'
import TotalTable from '../components/TotalTable.vue'
import DetailTable from '../components/DetailTable.vue'
import User from '../components/User.vue'
import BusinessTable from '../components/BusinessTable.vue'
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
                path: 'DetailTable',
                name: 'DetailTable',
                component: DetailTable
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
            }
        ]
    }
]

export default routes