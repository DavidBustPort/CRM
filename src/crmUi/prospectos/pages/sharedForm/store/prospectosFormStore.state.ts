import type { Pagination } from '@/shared/components/pagination/types'
import type { ProspectoForm } from '../types/prospectosForm'

export interface ProspectosFormState {
    formData: ProspectoForm
    pagination: Pagination,
    mode: 'create' | 'edit'
}

export const state = (): ProspectosFormState => ({
    formData: {
        razonSocial: '',
        contacto: '',
        correo: '',
        telefono: '',
        uenId: null,
        segmentoId: null,
        tipoClienteId: null,
        vpo: 0,
        territorioId: -1,
        observaciones: ''
    },
    pagination: {
        currentPage: 1,
        totalRows: 0,
        itemsPerPage: 10,
        title: 'Prospectos',
        showTitle: true,
        arrayItemsPerPage: [4, 8, 120]
    },
    mode: 'create'
})