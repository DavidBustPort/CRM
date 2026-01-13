<template>
    <tr class="loading-row">
        <td :colspan="props.colspan" class="text-center py-4">
            <div class="d-flex align-items-center justify-content-center">
                <span class="text-muted">Cargando datos...</span>
            </div>
        </td>
    </tr>
</template>

<script lang="ts" setup>
const props = defineProps<{
    colspan: number
}>()
</script>

<style scoped>
.loading-row {
    background-color: rgba(var(--bs-info-rgb), 0.05);

    .spinner-border-sm {
        width: 1rem;
        height: 1rem;
        border-width: 0.1rem;
        color: var(--bs-primary);
    }
}
</style>