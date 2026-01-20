import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import { authGuard } from './guards/authGuard'
import { loadingGuard } from './guards/loadingGuard'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

router.beforeEach(authGuard)
router.beforeEach(loadingGuard)

export default router