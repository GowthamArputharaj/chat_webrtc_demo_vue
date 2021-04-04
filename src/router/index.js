// import VueRouter from 'vue-router'

// import { createRouter, createWebHistory } from 'vue-router'
import VueRouter from 'vue-router'
import TestChat from '../components/TestChat.vue'
import TestAudio from '../components/TestAudio.vue'

const routes = [
    {
        path: '/chat',
        name: 'chat',
        component: TestChat,
    },
    {
        path: '/call',
        name: 'call',
        component: TestAudio,
    }
]

// const router = createRouter({
//     mode: 'history',
//     history: createWebHistory(),
//     routes
// })

const router = new VueRouter({
    routes
});

export default router

