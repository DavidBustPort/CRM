import { markRaw } from 'vue'
import type { FormField } from '../../types/prospectosFormField'
import { useProspectosFormStore } from '../../store/prospectosFormStore'
import FilterUEN from '@/shared/common/FilterUEN.vue'
import FilterSegmento from '@/shared/common/FilterSegmento.vue'
import FilterTipoCliente from '@/shared/common/FilterTipoCliente.vue'
import FilterTerritorio from '@/shared/common/FilterTerritorio.vue'

const store = useProspectosFormStore()

const FORM_FIELDS: FormField[] = [
    {
        key: 'razonSocial',
        label: 'Razón social',
        validationKey: 'isRazonSocialRequired',
        component: 'input',
        type: 'text',
        class: 'col-md-8'
    },
    {
        key: 'contacto',
        label: 'Contacto (opcional)',
        validationKey: 'isContactoRequired',
        component: 'input',
        type: 'text',
        class: 'col-md-4'
    },
    {
        key: 'correo',
        label: 'Correo electrónico (opcional)',
        validationKey: 'isCorreoRequired',
        component: 'input',
        type: 'text',
        placeholder: 'tucorreo@sitio.com',
        class: 'col-md-4'
    },
    {
        key: 'telefono',
        label: 'Teléfono (opcional)',
        validationKey: 'isTelefonoRequired',
        component: 'input',
        type: 'text',
        placeholder: 'xx-xxxx',
        class: 'col-md-4'
    },
    {
        key: 'vpo',
        label: 'VPO',
        validationKey: 'isVPORequired',
        component: 'input',
        type: 'text',
        class: 'col-md-4',
        isCurrency: true
    },
    {
        key: 'uenId',
        label: '',
        validationKey: 'isUenRequired',
        component: markRaw(FilterUEN),
        class: 'col-md-6',
        props: {
            title: '--Seleccione una UEN--',
            labelItalics: true
        }
    },
    {
        key: 'segmentoId',
        label: '',
        validationKey: 'isSegmentoRequired',
        component: markRaw(FilterSegmento),
        class: 'col-md-6',
        props: () => ({
            title: '--Seleccione un Segmento--',
            labelItalics: true,
            idUen: store.formData.uenId
        })
    },
    {
        key: 'tipoClienteId',
        label: 'Tipo de cliente',
        validationKey: 'isTipoClienteRequired',
        component: markRaw(FilterTipoCliente),
        class: 'col-md-6',
        props: {
            labelItalics: true
        }
    },
    {
        key: 'territorioId',
        label: '',
        validationKey: 'isTerritorioRequired',
        component: markRaw(FilterTerritorio),
        class: 'col-md-6',
        props: {
            labelItalics: true,
            showFirstRecord: true
        }
    },
    {
        key: 'observaciones',
        label: 'Observaciones RIK (opcional)',
        validationKey: 'isObservacionesRequired',
        component: 'textarea',
        class: 'col-md-12'
    }
]

export { FORM_FIELDS }