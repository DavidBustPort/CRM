export interface SuggestedLeads {
    leads: SuggestedLeadsData[]
    totalRows: number
}

export interface SuggestedLeadsData {
    id: number
    comentarios: string
    contacto: string
    correo: string
    empresa: string
    idRik: number
    fechaRegistro: Date
    idSegmento: number
    segmento: string
    telefono: string
    productoInteres: string
    medioComunicacion: string
}