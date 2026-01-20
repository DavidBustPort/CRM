export interface Prospecto {
    prospectoId?: number | null
    razonSocial: string
    contacto: string
    correo: string
    telefono: string
    uenId: number
    uen?: string
    segmentoId: number
    segmento?: string
    tipoClienteId: number
    tipoCliente?: string
    vpo: number | null
    territorioId: number
    territorio?: string
    observaciones: string
    idLead?: number | null
    registro: string
    segmentoDimension: string
    segmentoValorDimension: number
    cantidadDimension: number
    clienteId: number
}