//配置生产环境，开发环境，端口号等
import Vue from 'vue'
import VueRouter from 'vue-router'
import VDistpicker from 'v-distpicker'
Vue.component('v-distpicker',VDistpicker)

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Default',
        redirect: '/register',
    },
    {
        path: '/register',
        name: 'Register',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ('../views/Register.vue'),
    },{
        path: '/login',
        name: 'Login',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ('../views/login.vue'),
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router