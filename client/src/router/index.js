import { createRouter, createWebHistory } from 'vue-router'
import Main from "@/pages/Main";
import ArticlesPage from "@/pages/ArticlesPage";
import About from "@/pages/About";
import ArticleItemPage from "@/pages/ArticleItemPage";
import ArticlesPageWithStore from "@/pages/ArticlesPageWithStore";
import ArticlesPageWithCompositionAPI from "@/pages/ArticlesPageWithCompositionAPI";


const routes = [
    {
        path: '/',
        component: Main
    },
    {
        path: '/articles',
        component: ArticlesPage
    },
    {
        path: '/about',
        component: About
    },
    {
        path: '/articles/:id',
        component: ArticleItemPage
    },
    {
        path: '/store',
        component: ArticlesPageWithStore
    },
    {
        path: '/composition',
        component: ArticlesPageWithCompositionAPI
    }

]

const router = createRouter( {
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router;

