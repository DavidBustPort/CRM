<template>
    <div class="mb-2">
        <label for="segmentos" class="form-label" :class="{ 'fst-italic': props.labelItalics }">
            Segmentos
        </label>
        <select
            class="form-select p-2"
            id="segmentos"
            v-model.number="model"
        >
            <option disabled :value="null">{{ props.title }}</option>
            <option v-for="segmento in segmentos" :key="segmento.id" :value="segmento.id">
                {{ segmento.nombre }}
            </option>
        </select>
    </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import type { Segmento } from '../types/catalogos'
import { CatalogoService } from '@/shared/services/catalogos-service'

const props = withDefaults(defineProps<{
    idUen: number | null
    labelItalics?: boolean
    title?: string
}>(), {
    labelItalics: false,
    title: 'Todos'
})

const segmentos = ref<Segmento[]>([])
const model = defineModel<number | null>()

watch(() => props.idUen, async (newValue) => {
    segmentos.value = []
    model.value = null

    if (newValue && newValue !== -1) {
        segmentos.value = await CatalogoService.getSegmentos(newValue)
    }
}, { immediate: true })
</script>