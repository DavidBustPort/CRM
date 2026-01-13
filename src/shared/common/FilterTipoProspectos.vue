<template>
    <div class="mb-2">
        <label for="tipo-prospecto" class="form-label" :class="{ 'fst-italic': props.labelItalics }">
            Tipo de prospecto
        </label>
        <select
            class="form-select p-2"
            id="tipo-prospecto"
            v-model="model"
        >
            <option :value="null">Todos</option>
            <option value="TD">TD (Tradicional)</option>
            <option value="LD">LD (Leads)</option>
        </select>
    </div>
</template>

<script lang="ts" setup>
const props = withDefaults(defineProps<{
    labelItalics?: boolean
}>(), {
    labelItalics: false
})

const model = defineModel()
</script>