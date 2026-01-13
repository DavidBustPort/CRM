import type { EstatusProspecto } from '@/shared/types/estatusProspecto'
import type { EtapasOportunidades } from '@/shared/types/etapasOportunidades'

export interface ProspectosListFilters {
    date: {
        month: number,
        year: number
    } | null
    showGteDetails: boolean
    tipoProspecto: string | null,
    etapa: EtapasOportunidades | -1
    rik: number | null
    etapaLead: string | null
    registro: number
    nombreProspecto: string
    estatus: EstatusProspecto | -1
}