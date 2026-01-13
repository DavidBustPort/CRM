export interface Prospectos {
    empresa: string
    id: number
    observacionesRik: string
    registro: boolean
    vpo: number,
    fuente: string
    mktEstatus: string
    gteEstatus: string
    rikEstatus: string
    totalAnalisis: number
    totalProyectosAnalisis: number
    totalPromocion: number
    totalProyectosPromocion: number
    totalNegociacion: number
    totalProyectosNegociacion: number
    totalCierre: number
    totalProyectosCierre: number
}

export interface ProspectosList {
    prospectos: Prospectos[],
    totalRows: number
}