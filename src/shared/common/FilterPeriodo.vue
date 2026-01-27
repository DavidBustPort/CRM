<template>
    <div class="mb-2">
        <label
            class="form-label"
            :class="{ 'fst-italic': props.labelItalics }"
            for="mes-consulta"
        >{{ props.title ?? 'Periodo' }}</label>
        <VueDatePicker
            v-model="model"
            :formats="{
                input: 'MMMM yyyy',
                preview: '---'
            }"
            month-picker
            auto-apply
            :locale="es"
            :range="props.format === 'range'"
        />
    </div>
</template>

<script lang="ts" setup>
import { es } from 'date-fns/locale'

interface Props {
    format: 'range' | 'single'
    title?: string
    labelItalics?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    labelItalics: false
})

const model = defineModel()
</script>

<style scoped>
:deep(.dp__input) {
    text-transform: capitalize;
}

:deep(.dp__overlay_cell),
:deep(.dp__overlay_cell_active),
:deep(.dp__overlay_cell_pad) {
    text-transform: capitalize !important;
}
</style>
