import Home from '../views/home/Home.vue'
import Center from '../views/center/Center.vue'
import NewsAdd from '../views/news-manage/NewsAdd'
import NewsList from '../views/news-manage/NewsList'
import ProductAdd from '../views/product-manage/ProductAdd'
import ProductList from '../views/product-manage/ProductList'
import UserAdd from '../views/user-manage/UserAdd'
import UserList from '../views/user-manage/UserList'
import NotFound from '../components/NotFound'

// const role = JSON.parse(localStorage.getItem('vuex')).userInfo.role

// function roleControl() {
//     (to, from) => {
//         if (role !== 1) {
//             return false
//         }
//     }
// }
const routes = [

    {
        path: '/index',
        component: Home
    },
    {
        path: '/center',
        component: Center
    },
    {
        path: '/user-manage/adduser',
        component: UserAdd,

        requireAuth: true

    },
    {
        path: '/user-manage/userlist',
        component: UserList,

        requireAuth: true


    },
    {
        path: '/product-manage/addproduct',
        component: ProductAdd
    },
    {
        path: '/product-manage/productlist',
        component: ProductList
    },
    {
        path: '/news-manage/addnews',
        component: NewsAdd
    },
    {
        path: '/news-manage/newslist',
        component: NewsList
    },
    //可以通过正则来匹配不满足规则的路径记住就行
    {
        path: '/:pathMatch(.*)*',
        component: NotFound
    }
]
export default routes;