import type { Component } from 'vue'
import type { ProspectoForm } from './prospectosForm'
import type { ProspectosFormValidation } from './prospectosFormValidation'

export interface FormField {
    key: keyof ProspectoForm,
    label: string,
    validationKey: keyof ProspectosFormValidation,
    component: 'input' | 'textarea' | Component,
    type?: string,
    placeholder?: string,
    class?: string,
    props?: object,
    isCurrency?: boolean
}