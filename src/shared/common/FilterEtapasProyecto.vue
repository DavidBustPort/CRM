<template>
    <div class="mb-2">
        <label for="etapaProyectos" class="form-label" :class="{ 'fst-italic': props.labelItalics }">
            Etapas de proyectos
        </label>
        <select
            v-model.number="model"
            class="form-select p-2"
            id="etapaProyectos"
        >
            <option value="-1">Todos</option>
            <option v-for="etapa in etapasOptions" :key="etapa.value" :value="etapa.value">
                {{ etapa.label }}
            </option>
        </select>
    </div>
</template>

<script lang="ts" setup>
import { EtapasOportunidadesName, EtapasOportunidades, EtapasOportunidadesAbbreviation } from '../types/etapasOportunidades'
import { computed } from 'vue'

const props = withDefaults(defineProps<{
    labelItalics?: boolean
    showCancelled?: boolean
}>(), {
    labelItalics: false
})

const model = defineModel()

const etapasOptions = computed(() => {
    return Object.values(EtapasOportunidades).map((value) => {
        return {
            label: `${EtapasOportunidadesAbbreviation[value]} (${EtapasOportunidadesName[value]})`,
            value: value
        }
    }).filter(option => {
        if (!props.showCancelled && option.value === EtapasOportunidades.CANCELADA) {
            return false
        }
        return true
    })
})
</script>