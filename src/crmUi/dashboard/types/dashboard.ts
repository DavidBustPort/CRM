import type { CumplimientoPresupuesto } from './cumplimientoPresupuesto'
import type { Embudo } from './embudo'
import type { EstadisticasEtapa } from './estadisticasEtapa'
import type { Fuentes } from './fuentes'
import type { ProyectosImportantes } from './proyectosImportantes'
import type { TiempoEtapa } from './tiempoEtapa'
import type { TotalesEtapas } from './totalesEtapas'

export interface Dashboard {
    totalesEtapas: TotalesEtapas
    proyectosImportantes: ProyectosImportantes[]
    cumplimientoPresupuesto: CumplimientoPresupuesto
    embudo: Embudo[]
    estadisticasEtapas: EstadisticasEtapa[]
    tiempoPorEtapa: TiempoEtapa
    fuentes: Fuentes
}