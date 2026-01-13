<template>
    <div class="row">
        <div class="col">
            <FilterPeriodo :format="'range'" title="Fecha de consulta" />
        </div>
    </div>
</template>

<script setup lang="ts">
import FilterPeriodo from '@/shared/common/FilterPeriodo.vue'

</script>