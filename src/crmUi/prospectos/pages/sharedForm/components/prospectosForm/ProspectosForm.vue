<template>
    <form @submit.prevent="handleFormSubmit">
        <div class="row px-4">
            <div
                v-for="(field, index) in FORM_FIELDS"
                class="col-12"
                :class="field.class"
                :key="field.key"
            >
                <div class="mb-2" v-if="typeof field.component === 'string'">
                    <label :for="'field' + index" class="form-label fst-italic">{{ field.label }}</label>

                    <div :class="{ 'input-group': field.isCurrency }">
                        <span v-if="field.isCurrency" class="input-group-text">$</span>
                        <component
                            :is="field.component"
                            :id="'field' + index"
                            :type="field.type"
                            class="form-control p-2"
                            @input="updateField(field.key, $event, field.isCurrency)"
                            :value="field.isCurrency ? formatInputView(String(store.formData[field.key])) : store.formData[field.key]"
                            :placeholder="field.placeholder"
                        />
                    </div>
                </div>

                <component
                    v-else
                    :is="field.component"
                    v-bind="resolveProps(field)"
                    v-model="store.formData[field.key]"
                />

                <div v-if="submitted && !formValidation[field.validationKey]" class="invalid-feedback">Campo requerido</div>
            </div>
        </div>
        <div class="row px-4">
            <div class="col mt-3 text-center">
                <button
                    type="submit"
                    class="btn btn-primary btn-lg px-4 py-2 py-md-3 fw-bold shadow text-white"
                >
                    <FontAwesomeIcon icon="fa-plus-circle me-2" />
                    {{ store.mode === 'create' ? 'Crear prospecto' : 'Actualizar prospecto' }}
                </button>
            </div>
        </div>
    </form>
</template>

<script lang="ts" setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useProspectosForm } from './useProspectosForm'
import { useProspectosFormStore } from '../../store/prospectosFormStore'
import { FORM_FIELDS } from './prospectosForm.config'
import type { FormField } from '../../types/prospectosFormField'
import type { ProspectoForm } from '../../types/prospectosForm'
import { formatInputView, parseInputToNumber } from '@/core/utils/numbers'

const store = useProspectosFormStore()
const { submitted, formValidation, handleFormSubmit } = useProspectosForm()

const resolveProps = (field: FormField) => {
    if (!field || !field.props) return {}
    return typeof field.props === 'function' ? field.props() : field.props
}

const updateField = <K extends keyof ProspectoForm>(key: K, e: Event, isCurrency?: boolean) => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement
    const value = target.value

    if (isCurrency) {
        const formatted = formatInputView(value)
        target.value = formatted
        const numericValue = parseInputToNumber(value)
        
        store.formData[key] = numericValue as ProspectoForm[K]
    } else store.formData[key] = value as ProspectoForm[K]
}
</script>

<style scoped>
textarea {
    height: 80px;
}
button[type="submit"] {
    background: linear-gradient(45deg, #0d6efd, #0056b3);
    border: none;
}
</style>