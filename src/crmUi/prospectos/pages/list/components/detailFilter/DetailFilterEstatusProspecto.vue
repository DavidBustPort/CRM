 <template>
    <div class="mb-2">
        <label for="estatus-prospecto" class="form-label" :class="{ 'fst-italic': props.labelItalics }">
            Estatus prospecto
        </label>
        <select
            v-model.number="store.prospectosFilters.estatus"
            class="form-select p-2"
            id="estatus-prospecto"
        >
            <option value="-1">Todos</option>
            <option :value="EstatusProspecto.ABIERTO">Abierto</option>
            <option :value="EstatusProspecto.CERRADO">Cerrado</option>
        </select>
    </div>
</template>

<script lang="ts" setup>
import { EstatusProspecto } from '@/shared/types/estatusProspecto'
import { useProspectosListStore } from '../../store/prospectosListStore'

const props = withDefaults(defineProps<{
    labelItalics?: boolean
}>(), {
    labelItalics: false
})

const store = useProspectosListStore()
</script>