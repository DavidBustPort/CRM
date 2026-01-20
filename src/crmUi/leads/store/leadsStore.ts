import type { Pagination } from '@/shared/components/pagination/types'
import { defineStore } from 'pinia'
import type { Leads } from '../types/leads'
import { LeadsService } from '../services/leads-service'
import { useAuthSianwebStore } from '@/core/store/authSianwebStore'

interface LeadsState {
    pagination: Pagination
    leads: Leads
    searchFilter: string | null
    isApiBusy: boolean
    expandedRowId: number | null
}

export const useLeadsStore = defineStore('leads', {
    state: (): LeadsState => ({
        pagination: {
            currentPage: 1,
            totalRows: 0,
            itemsPerPage: 10
        },
        leads: {
            leads: [],
            totalRows: 0
        },
        searchFilter: null,
        isApiBusy: false,
        expandedRowId: null
    }),
    actions: {
        async getLeads(): Promise<void> {
            this.isApiBusy = true
            const authSianwebStore = useAuthSianwebStore()
            
            this.leads = await LeadsService.getLeads(
                this.pagination.currentPage,
                this.pagination.itemsPerPage,
                authSianwebStore.isGte,
                null
            )
            this.pagination.totalRows = this.leads.totalRows
            this.isApiBusy = false      
        }
    }
})