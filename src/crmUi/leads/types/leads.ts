export interface Leads {
    leads: LeadsData[]
    totalRows: number
}

export interface LeadsData {
    id: number
    nombreEmpresa: string
    productoInteres: number
    fechaAlta: Date | string
    giroEmpresa: string
    estatusId: number
    estatus: string
    comentarios: string
    ciudad: string
    correo: string
    telefono: string
    nombreContacto: string
    rik: number | null
    cdId: number
    cd: string
    fuente: string
}