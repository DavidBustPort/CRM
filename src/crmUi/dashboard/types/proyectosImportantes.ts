import type { EtapasOportunidades } from '@/shared/types/etapasOportunidades'

export interface ProyectosImportantes {
    idOportunidad: number
    idCliente: number
    cliente: string
    etapa: EtapasOportunidades
    vpoAlCierre: number
}