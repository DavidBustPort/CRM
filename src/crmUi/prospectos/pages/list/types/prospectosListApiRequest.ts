import type { EstatusProspecto } from '@/shared/types/estatusProspecto'

export interface ProspectosListApiRequest {
    filterMes: number | null
    filterAnio: number | null
    filterFuente: string | null
    filterRegistro: number | null
    filterNombreProspecto: string | null
    filterEtapaLead: string | null
    filterRik: number | null
    filterEstatus: EstatusProspecto
    page: number
    itemsPerPage: number
    isGte: boolean
    filterEtapaOportunidad: number | null
}