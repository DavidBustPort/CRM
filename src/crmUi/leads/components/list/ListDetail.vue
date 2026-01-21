<template>
    <tr>
        <td :colspan="props.colspan" class="p-0 border-0">
            <div class="p-4 border-start border-4 border-primary animate__animated animate__fadeIn">
                <div class="row">
                    <div :class="authSianwebStore.isGte ? 'col-md-8' : 'col-12'">
                        <div class="row g-3">
                            <div class="col-sm-6 col-lg-4">
                                <label class="text-muted small d-block text-uppercase fw-bold">Contacto</label>
                                <span class="small">
                                    <FontAwesomeIcon icon="fa-user" class="text-muted me-1" />
                                    {{ props.lead.nombreContacto || '---' }}
                                </span>
                            </div>
                            <div class="col-sm-6 col-lg-4">
                                <label class="text-muted small d-block text-uppercase fw-bold">Teléfono</label>
                                <span class="small">
                                    <FontAwesomeIcon icon="fa-phone" class="text-muted me-1" />
                                    {{ props.lead.telefono || '---' }}
                                </span>
                            </div>
                            <div class="col-sm-6 col-lg-4">
                                <label class="text-muted small d-block text-uppercase fw-bold">Email</label>
                                <span class="small">
                                    <FontAwesomeIcon icon="fa-envelope" class="text-muted me-1" />
                                    {{ props.lead.correo || '---' }}
                                </span>
                            </div>
                            <div class="col-sm-6 col-lg-4">
                                <label class="text-muted small d-block text-uppercase fw-bold">Fuente</label>
                                <span class="small fw-bold">{{ props.lead.fuente || '---' }}</span>
                            </div>
                            <div class="col-sm-6 col-lg-4">
                                <label class="text-muted small d-block text-uppercase fw-bold">Sucursal</label>
                                <span class="small">
                                    <FontAwesomeIcon icon="fa-store" class="text-muted me-1" />
                                    {{ props.lead.cd || '---' }}
                                </span>
                            </div>
                            <div class="col-12">
                                <label class="text-muted small d-block text-uppercase fw-bold">Comentarios</label>
                                <div class="bg-white p-3 rounded border">
                                    <p class="mb-0 text-dark fst-italic small">
                                        {{ props.lead.comentarios || 'Sin comentarios' }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="authSianwebStore.isGte" class="col-md-4 d-flex flex-column gap-2 align-items-end">
                        <ListDetailRepresentate :id-lead="props.lead.id" />
                        <ListDetailSucursales :id-lead="props.lead.id" :current-sucursal-id="props.lead.cdId" />
                        <hr class="w-75 my-1 opacity-25">
                        <ListDetailRechazar :id-lead="props.lead.id" />
                    </div>
                </div>
            </div>
        </td>
    </tr>
</template>

<script lang="ts" setup>
import ListDetailRechazar from './ListDetailRechazar.vue'
import ListDetailSucursales from './ListDetailSucursales.vue'
import ListDetailRepresentate from './ListDetailRepresentate.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import type { LeadsData } from '../../types/leads'
import { useAuthSianwebStore } from '@/core/store/authSianwebStore'

const props = defineProps<{
    colspan: number,
    lead: LeadsData
}>()

const authSianwebStore = useAuthSianwebStore()
</script>