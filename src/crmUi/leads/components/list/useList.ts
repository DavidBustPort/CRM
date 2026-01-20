import { useLeadsStore } from '../../store/leadsStore'

interface List {
    isRowExpanded: (id: number) => boolean
    toggleRow: (id: number) => void
    statusClass: (statusId: number) => string
}

export function useList(): List {
    const store = useLeadsStore()

    const isRowExpanded = (id: number): boolean => store.expandedRowId === id

    const toggleRow = (id: number) => {
        store.expandedRowId = isRowExpanded(id) ? null : id
    }

    const statusClass = (statusId: number): string => {
        switch (statusId) {
            case 1:
            case 3:
                return 'bg-success-subtle text-success border border-success'
            case 2: return 'bg-warning-subtle text-warning-emphasis border border-warning'
            case 4: return 'bg-info-subtle text-info border border-info'
            default: return 'bg-light text-muted border'
        }
    }

    return {
        isRowExpanded,
        toggleRow,
        statusClass
    }
}