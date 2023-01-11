import Vue from 'vue'
import VueRouter from 'vue-router'

import ViewFormsList from '../views/ViewFormsList.vue'
import ViewFormsCreateEdit from '../views/ViewFormsCreateEdit.vue'
import ViewFormsSectionsCreateEdit from '../views/ViewFormsSectionsCreateEdit.vue'
import ViewFormsSectionsQuestionCreateEdit from '../views/ViewFormsSectionsQuestionCreateEdit.vue'
import ViewRedirect from '../views/ViewRedirect.vue'

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
        {
            path: '/formularios/criar',
            name: 'ViewFormsCreateEdit',
            component: ViewFormsCreateEdit
        },
        {
            path: '/formularios/:slugForm/editar',
            name: 'ViewFormsCreateEdit',
            component: ViewFormsCreateEdit
        },
        {
            path: '/formularios/:slugForm/secoes/criar',
            name: 'ViewFormsSectionsCreateEdit',
            component: ViewFormsSectionsCreateEdit
        },
        {
            path: '/formularios/:slugForm/secoes/:slugSection/editar',
            name: 'ViewFormsSectionsCreateEdit',
            component: ViewFormsSectionsCreateEdit
        },
        {
            path: '/formularios/:slugForm/secoes/:slugSection/questoes/criar',
            name: 'ViewFormsSectionsCreateEdit',
            component: ViewFormsSectionsQuestionCreateEdit
        },
        {
            path: '/formularios/:slugForm/secoes/:slugSection/questoes/:slugQuestion/editar',
            name: 'ViewFormsSectionsCreateEdit',
            component: ViewFormsSectionsQuestionCreateEdit
        },
        {
            path: '/redirect',
            name: 'ViewRedirect',
            component: ViewRedirect
        },
    ]
});

export default router