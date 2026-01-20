<template>
    <div class="mb-2">
        <label for="tipoCliente" class="form-label" :class="{ 'fst-italic': props.labelItalics }">
            Tipo de cliente
        </label>
        <select
            class="form-select p-2"
            id="tipoCliente"
            v-model.number="model"
        >
            <option :value="null">Todos</option>
            <option v-for="tc in tiposCliente" :key="tc.id" :value="tc.id">
                {{ tc.nombre }}
            </option>
        </select>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import type { TipoCliente } from '../types/catalogos'
import { CatalogoService } from '@/shared/services/catalogos-service'

const props = withDefaults(defineProps<{
    labelItalics?: boolean
}>(), {
    labelItalics: false
})

const tiposCliente = ref<TipoCliente[]>([])
const model = defineModel<number | null>()

onMounted(async () => {
    tiposCliente.value = await CatalogoService.getTipoClientes()
})
</script>