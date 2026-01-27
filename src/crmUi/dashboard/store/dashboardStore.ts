import { defineStore } from 'pinia'
import type { Dashboard } from '../types/dashboard'
import { DashabordService } from '../services/dashboard-service'
import { useAuthSianwebStore } from '@/core/store/authSianwebStore'
import { useAlert } from '@/core/composables/useAlert'

interface DashboardFilter {
    month: number
    year: number
}

interface DashboardState {
    data: Dashboard | null
    filters: [DashboardFilter, DashboardFilter]
}

const now = new Date()

export const useDashboardStore = defineStore('dashboard', {
    state: (): DashboardState => ({
        data: null,
        filters: [
            {
                month: now.getMonth(),
                year: now.getFullYear()
            },
            {
                month: now.getMonth(),
                year: now.getFullYear()
            }
        ]
    }),
    actions: {
        async fetchData(showLoading: boolean = true) {
            const authSianwebStore = useAuthSianwebStore()
            const { close, loading } = useAlert()
            if (showLoading) loading()
            
            try {
                const [start, end] = this.filters
                if (!start || !end) return

                const res = await DashabordService.getDashboard(
                    authSianwebStore.isGte,
                    start.month + 1,
                    start.year,
                    end.month + 1,
                    end.year,
                )
                if (res.succeeded && res.data) {
                    this.data = res.data
                }
            } finally {
                if (showLoading) close()
            }
        }
    }
})