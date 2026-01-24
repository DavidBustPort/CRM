<template>
    <div class="mb-2">
        <label
            class="form-label"
            :class="{ 'fst-italic': props.labelItalics }"
            for="mes-consulta"
        >{{ props.title ?? 'Periodo' }}</label>
        <VueDatePicker
            v-model="model"
            :format="'MMM yyyy'"
            month-picker
            auto-apply
            locale="es"
            :range="props.format === 'range'"
        />
    </div>
</template>

<script lang="ts" setup>

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