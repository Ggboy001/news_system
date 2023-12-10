import { createRouter, createWebHashHistory } from 'vue-router'
import Login from "../views/Login.vue";
import MainBox from '../views/MainBox.vue'
import routesConfig from "./config";
//下面这段应该是在setup中使用的吧
// import { useStore } from 'vuex';
// const store = useStore()
import store from '@/store/index'//这种方式是有效的

const routes = [
  {
    path: '/',
    redirect: '/mainbox'
  },
  {
    path: '/login',
    name: 'login',//有时候path很长的时候用name会方便些
    component: Login
  },
  {
    path: '/mainbox',
    name: 'mainbox',
    component: MainBox
  }

]
const checkPermission = (item) => {

  if (item.requireAuth) {
    return store.state.userInfo.role === 1
  }
  return true
}


const router = createRouter({
  history: createWebHashHistory(),
  routes
})

routesConfig.forEach(item => {
  checkPermission(item) && router.addRoute('mainbox', item)
})
router.beforeEach((to, form, next) => {

  //这个函数用来做用户鉴权的
  //判断是否是进入登录页面
  if (to.name === 'login') {
    //放行
    next()
  } else {
    //因该判断是不是已经授权了
    if (localStorage.getItem('token')) {
      next()
    }
    else {
      next({
        path: '/login'
      })
    }
  }

})

export default router
