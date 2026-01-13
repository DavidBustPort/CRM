<template>
    <td v-for="(e, index) in etapas" :key="index">
        <div v-if="e.totalProyectos > 0" class="d-flex flex-column align-items-start">
            <span class="fw-bold">{{ e.totalProyectos }} proy.</span>
            <i>{{ formatCurrency(e.total ?? 0) }}</i>
        </div>
    </td>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { Prospectos } from '../../types/prospectos'
import { formatCurrency } from '@/core/utils/numbers'

const props = defineProps<{
    prospecto: Prospectos
}>()

interface Etapas {
    total: number
    totalProyectos: number
}

const etapas = ref<Etapas[]>([
    {
        total: props.prospecto.totalAnalisis,
        totalProyectos: props.prospecto.totalProyectosAnalisis
    },
    {
        total: props.prospecto.totalPromocion,
        totalProyectos: props.prospecto.totalProyectosPromocion
    },
    {
        total: props.prospecto.totalNegociacion,
        totalProyectos: props.prospecto.totalProyectosNegociacion
    },
    {
        total: props.prospecto.totalCierre,
        totalProyectos: props.prospecto.totalProyectosCierre
    }
])
</script>