export interface Catalogos {
    id: number
    nombre: string
}

export type Rik = Catalogos
export type Uen = Catalogos
export type Segmento = Catalogos
export type Areas = Catalogos
export type Soluciones = Catalogos
export type Aplicaciones = Catalogos & {
    potencial: number
}

export type TipoCliente = Catalogos
export type Territorio = Catalogos