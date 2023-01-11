import Vue from 'vue'
import VueRouter from 'vue-router'

import ViewFormsList from '../views/ViewFormsList.vue'

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [{
            path: '/',
            redirect: '/formularios/lista'
        },
        {
            path: '/formularios/lista',
            name: 'ViewFormsList',
            component: ViewFormsList
        },
    ]
});

export default router