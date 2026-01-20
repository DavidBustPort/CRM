import { defineStore } from 'pinia'
import { state} from './prospectosFormStore.state'
import type { ProspectosAddApiRequest, ProspectosEditApiRequest } from '../types/prospectosApiRequest'

export const useProspectosFormStore = defineStore('prospectosForm', {
    state,
    getters: {
        hasSelectedLead: (state): boolean => false
    },
    actions: {
        getProspectosAddApiRequest(): ProspectosAddApiRequest {
            return {
                ...this.formData,
                uenId: this.formData.uenId ? this.formData.uenId : -1,
                segmentoId: this.formData.segmentoId ? this.formData.segmentoId : -1,
                tipoClienteId: this.formData.tipoClienteId ? this.formData.tipoClienteId : -1,
                idLead: -1
            }
        },
        getProspectosEditApiRequest(): ProspectosEditApiRequest {
            return {
                ...this.formData,
                uenId: this.formData.uenId ? this.formData.uenId : -1,
                segmentoId: this.formData.segmentoId ? this.formData.segmentoId : -1,
                tipoClienteId: this.formData.tipoClienteId ? this.formData.tipoClienteId : -1,
                prospectoId: -1
            }
        }
    }
})