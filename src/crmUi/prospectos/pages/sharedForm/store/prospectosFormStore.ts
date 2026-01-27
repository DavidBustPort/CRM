import { defineStore } from 'pinia'
import { state} from './prospectosFormStore.state'
import type { ProspectosAddApiRequest, ProspectosEditApiRequest } from '../types/prospectosApiRequest'
import { LeadsService } from '@/crmUi/leads/services/leads-service'
import type { Prospecto } from '@/crmUi/prospectos/types/prospecto'

export const useProspectosFormStore = defineStore('prospectosForm', {
    state,
    getters: {
        hasSelectedLead: (state): boolean => !!state.fromLeads.selectedLead
    },
    actions: {
        buildBaseRequest() {
            return {
                ...this.formData,
                uenId: this.formData.uenId!,
                segmentoId: this.formData.segmentoId!,
                tipoClienteId: this.formData.tipoClienteId!,
                territorioId: this.formData.territorioId!,
            }
        },
        getProspectosAddApiRequest(): ProspectosAddApiRequest {
            const base = this.buildBaseRequest()
            return {
                ...base,
                idLead: -1
            }
        },
        getProspectosEditApiRequest(): ProspectosEditApiRequest {
            const base = this.buildBaseRequest()
            return {
                ...base,
                prospectoId: this.$state.propspectoId!
            }
        },
        async getLeads(): Promise<void> {
            this.$state.fromLeads.suggestions = await LeadsService.getSuggestionsLeads(
                this.$state.fromLeads.pagination.currentPage,
                this.$state.fromLeads.pagination.itemsPerPage,
                this.$state.fromLeads.searchFilter
            )
            this.$state.fromLeads.pagination.totalRows = this.$state.fromLeads.suggestions.totalRows
        },

        loadProspectoForEdit(prospecto: Prospecto) {
            this.mode = 'edit'
            this.$state.formData = {
                razonSocial: prospecto.razonSocial,
                contacto: prospecto.contacto,
                correo: prospecto.correo,
                telefono: prospecto.telefono,
                uenId: prospecto.uenId,
                segmentoId: prospecto.segmentoId,
                tipoClienteId: prospecto.tipoClienteId,
                vpo: prospecto.vpo ?? 0,
                territorioId: prospecto.territorioId,
                observaciones: prospecto.observaciones
            }
            this.$state.propspectoId = prospecto.prospectoId ?? null
        }
    }
})