<template>
    <div class="mb-2">
        <label for="uens" class="form-label" :class="{ 'fst-italic': props.labelItalics }">
            UEN
        </label>
        <select
            class="form-select p-2"
            id="uens"
            v-model.number="model"
        >
            <option :value="null">{{ props.title }}</option>
            <option v-for="uen in uens" :key="uen.id" :value="uen.id">
                {{ uen.nombre }}
            </option>
        </select>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import type { Uen } from '../types/catalogos'
import { CatalogoService } from '@/shared/services/catalogos-service'

const props = withDefaults(defineProps<{
    labelItalics?: boolean
    title?: string
}>(), {
    labelItalics: false,
    title: 'Todos'
})

const uens = ref<Uen[]>([])
const model = defineModel<number | null>()

onMounted(async () => {
    const res = await CatalogoService.getUens()
    if (res.length > 0) uens.value = res.filter(u => u.id !== 5 && u.id !== 6) as Uen[]
})
</script>