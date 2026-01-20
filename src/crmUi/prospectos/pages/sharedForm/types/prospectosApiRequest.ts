export interface ProspectosApiRequest {
    razonSocial: string
    contacto: string
    correo: string
    telefono: string
    uenId: number
    segmentoId: number
    tipoClienteId: number
    vpo: number | null
    territorioId: number
    observaciones: string
}

export interface ProspectosAddApiRequest extends ProspectosApiRequest {
    idLead?: number | null
}

export interface ProspectosEditApiRequest extends ProspectosApiRequest {
    prospectoId: number
}