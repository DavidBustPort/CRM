<template>
    <div class="mb-2">
        <label for="territorio" class="form-label" :class="{ 'fst-italic': props.labelItalics }">
            Territorio
        </label>
        <select
            class="form-select p-2"
            id="territorio"
            v-model.number="model"
        >
            <option :value="null" v-if="territorios.length > 1">Todos</option>
            <option v-for="t in territorios" :key="t.id" :value="t.id">
                {{ t.nombre }}
            </option>
        </select>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import type { Territorio } from '../types/catalogos'
import { CatalogoService } from '@/shared/services/catalogos-service'

const props = withDefaults(defineProps<{
    labelItalics?: boolean
    showFirstRecord?: boolean
}>(), {
    labelItalics: false,
    showFirstRecord: false
})

const territorios = ref<Territorio[]>([])
const model = defineModel<number | null>()

onMounted(async () => {
    territorios.value = await CatalogoService.getTerritorios()
    if (props.showFirstRecord && territorios.value && territorios.value.length === 1) {
        model.value = territorios.value[0]!.id
    }
})
</script>