<template>
    <div>
        <LeadsFilter />
        <div class="table-responsive border rounded shadow-sm">
            <table class="table mb-0 table-hover">
                <thead>
                    <tr>
                        <th>Fecha de alta</th>
                        <th>Medio</th>
                        <th>Giro</th>
                        <th>Empresa</th>
                        <th>Producto de interés</th>
                    </tr>
                </thead>
                <tbody>
                    <LoadingTable v-if="isLoading" :colspan="5" />
                    <template
                        v-else-if="!isLoading && store.fromLeads.suggestions.totalRows > 0"
                        v-for="(item, index) in store.fromLeads.suggestions.leads"
                        :key="index"
                    >
                        <tr>
                            <td></td>
                        </tr>
                    </template>
                    <NoRowsTable v-if="store.fromLeads.suggestions.totalRows === 0" :colspan="5"  />
                </tbody>
            </table>
        </div>
    </div>
</template>

<script lang="ts" setup>
import NoRowsTable from '@/shared/components/NoRowsTable.vue'
import LoadingTable from '@/shared/components/LoadingTable.vue'
import LeadsFilter from './LeadsFilter.vue'
import { onMounted, ref } from 'vue'
import { useProspectosFormStore } from '../../store/prospectosFormStore'

const store = useProspectosFormStore()
const isLoading = ref<boolean>(false)

onMounted(async () => {
    isLoading.value = true
    await store.getLeads()
    isLoading.value = false
})
</script>