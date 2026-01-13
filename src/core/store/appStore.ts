import { defineStore } from 'pinia'

interface AppState {
    sidebarCollapsed: boolean
    isPageLoading: boolean
    pageContainerMode: 'container' | 'container-fluid'
    selectedRik: number | null
}

export const useAppStore = defineStore('app', {
    state: (): AppState => ({
        sidebarCollapsed: false,
        isPageLoading: true,
        pageContainerMode: 'container',
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