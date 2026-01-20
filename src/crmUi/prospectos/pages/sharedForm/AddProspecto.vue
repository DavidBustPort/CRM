<template>
    <div class="row">
        <div class="col">
            <div class="d-flex justify-content-between align-items-center">
                <h2 class="text-primary fw-bold ps-3 border-start border-4 border-primary">Nuevo prospecto</h2>
                <BackToList />
            </div>
        </div>
    </div>
    <div class="card mt-3">
        <div class="card-header text-end">
            <a
                href="#"
                @click.prevent="openLeadsModel"
                type="button"
                class="text-info fw-bold btn btn-link"
            >
                <FontAwesomeIcon icon="fa-link" />
                ¿Quieres importar desde un Lead?
            </a>
        </div>
        <div class="card-body">
            <ProspectosForm />
        </div>
    </div>
    <Modal ref="modalRef">
        <Leads />
    </Modal>
</template>

<script lang="ts" setup>
import ProspectosForm from './components/prospectosForm/ProspectosForm.vue'
import Leads from './components/leads/Leads.vue'
import BackToList from './components/BackToList.vue'
import Modal from '@/shared/components/modal/Modal.vue'
import { ref } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const modalRef = ref<InstanceType<typeof Modal>>()

const openLeadsModel = (): void => {
    modalRef.value?.open({
        title: 'Leads',
        size: 'lg',
        animation: 'fade',
        showCloseButtonInHeader: true,
        showConfirmButton: false,
        closeButtonText: 'Cerrar'
    })
}
</script>