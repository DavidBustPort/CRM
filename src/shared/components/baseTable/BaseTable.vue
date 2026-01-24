<template>
    <div :class="{ 'table-responsive': isMobile }" ref="tableContainer">
        <table class="table align-middle table-hover">
            <thead class="table-light">
                <tr>
                    <slot name="header" />
                </tr>
            </thead>
            <tbody :class="{ 'table-loading-state': loading }">
                <tr v-if="$props.loading && items.length > 0" class="progress-row">
                    <td :colspan="colspan" class="p-0 border-0">
                        <div class="progress" style="height: 2px;">
                            <div class="progress-bar progress-bar-animated progress-bar-striped" style="width: 100%"></div>
                        </div>
                    </td>
                </tr>
                <LoadingTable
                    class="progress-row"
                    v-if="$props.loading && items.length === 0"
                    :colspan="$props.colspan"  />

                <template v-for="(item) in $props.items">
                    <slot name="row" :item="item" />
                </template>

                <NoRowsTable
                    class="progress-row"
                    v-if="!loading && items.length === 0"
                    :colspan="$props.colspan" />
            </tbody>
        </table>
        <PaginationComponent
            v-if="$props.paginationConfig && $props.paginationConfig.totalRows > 0"
            :config="$props.paginationConfig"
            @change:current-page="$emit('change:current-page', $event)"
            @change:set-items-per-page="$emit('change:set-items-per-page', $event)"
        />
    </div>
</template>

<script lang="ts" setup generic="T">
import PaginationComponent from '../pagination/Pagination.vue'
import { nextTick, ref, watch } from 'vue'
import LoadingTable from '../LoadingTable.vue'
import NoRowsTable from '../NoRowsTable.vue'
import type { Pagination } from '../pagination/types'
import { useResize } from '@/core/composables/useResize'

interface Props {
    items: T[],
    loading: boolean,
    colspan: number,
    rowClass?: (item: T) => string,
    paginationConfig?: Pagination
}

const props = defineProps<Props>()
defineEmits<{
    'change:current-page': [number],
    'change:set-items-per-page': [number]
}>()

const tableContainer = ref<HTMLElement | null>(null)
const { isMobile } = useResize()
const isFirstLoad = ref<boolean>(true)


const scrollToTable = () => {
    if (tableContainer.value) {
        tableContainer.value.scrollIntoView({
            behavior: 'smooth'
        })
    }
}

watch(() => props.items, async (newItems) => {
    if (isFirstLoad.value) {
        isFirstLoad.value = false
        return
    }

    if (newItems && newItems.length > 0) {
        await nextTick()
        scrollToTable()
    }
}, { 
    deep: true
})
</script>

<style scoped>
.table-loading-state {
    pointer-events: none;
    user-select: none;
}
.table-loading-state :deep(tr:not(.progress-row)) {
    opacity: 0.5;
    transition: opacity 0.3s ease;
}
.progress-row {
    opacity: 1 !important;
}
</style>