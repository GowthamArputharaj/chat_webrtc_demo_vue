// import VueRouter from 'vue-router'

// import { createRouter, createWebHistory } from 'vue-router'
import VueRouter from 'vue-router'
import TestChat from '../components/TestChat.vue'
import TestAudio from '../components/TestAudio.vue'
import TestVideo from '../components/TestVideo.vue'

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
    },
    {
        path: '/video',
        name: 'video',
        component: TestVideo,
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

