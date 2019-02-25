//引入路由组件
import Layout from '../layout/Layout.vue'
import TotalTable from '../components/TotalTable.vue'
//定义路由
const routes = [
    {
        path: '/',
        component: Layout
    },
    {
        path: '/admin',
        component: Layout,
        children: [
            {
                path: 'TotalTable',
                name: 'TotalTable',
                component: TotalTable
            }
        ]
    }
]

export default routes