<template>
    <div class="d-md-flex justify-content-between" style="align-items: baseline;">
        <p v-if="props.config.showTitle" :class="{ 'ms-3': !showItemsPerPageOptions }">
            <b>{{ props.config.currentPage }}</b> a {{ totalPages  }} páginas de {{ props.config.totalRows }} {{ props.config.title }}
        </p>
        <div :class="{ 'd-flex': showItemsPerPageOptions }">
            <select
                v-if="showItemsPerPageOptions"
                class="form-select"
                @change="$emit('change:setItemsPerPage', itemsPerPage)"
                v-model="itemsPerPage"
            >
                <option v-for="i in arrayItemsPerPage" :key="i" :value="i">{{ i }}</option>
            </select>
            <nav class="ms-3">
                <ul class="pagination mb-0">
                    <li class="page-item" @click="setCurrentPageHandler(props.config.currentPage - 1)">
                        <a href="javascript:void(0);" class="page-link" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                    <template v-for="p in pageList" :key="p">
                        <li class="page-item" :class="{ 'active': props.config.currentPage === p }">
                            <a
                                href="javascript:void(0);"
                                class="page-link"
                                @click="setCurrentPageHandler(p)"
                                type="button"
                            >{{ p }}</a>
                        </li>
                    </template>
                    <li class="page-item" @click="setCurrentPageHandler(props.config.currentPage + 1)">
                        <a href="javascript:void(0);" class="page-link" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { PaginationConfig } from './types'
import { usePagination } from './usePagination'

const props = defineProps<PaginationConfig>()
const emit = defineEmits<{
    (e: 'change:setItemsPerPage', value: number): void
    (e: 'change:currentPage', value: number): void
}>()

const {
    totalPages,
    setCurrentPage,
    arrayItemsPerPage,
    pageList,
    itemsPerPage,
    showItemsPerPageOptions
} = usePagination(props.config)

const setCurrentPageHandler = (page: number) => {
    setCurrentPage(page)
    emit('change:currentPage', page)
}
</script>