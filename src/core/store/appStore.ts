import type { Rik } from '@/shared/types/catalogos'
import { defineStore } from 'pinia'

interface AppState {
    sidebarCollapsed: boolean
    isPageLoading: boolean
    pageContainerMode: 'container' | 'container-fluid'
    riks: Rik[]
    selectedRik: number | null
}

export const useAppStore = defineStore('app', {
    state: (): AppState => ({
        sidebarCollapsed: false,
        isPageLoading: true,
        pageContainerMode: 'container',
        riks: [],
        selectedRik: null
    }),
    actions: {
        toggleSidebar() {
            this.sidebarCollapsed = !this.sidebarCollapsed
        },

        setPageLoading(value: boolean) {
            this.isPageLoading = value
        },

        togglePageContainerModel() {
            this.pageContainerMode = this.pageContainerMode === 'container' ? 'container-fluid' : 'container'
        }
    }
})