<template>
    <div class="row">
        <div class="col">
            <div class="card">
                <div class="card-header">
                    <div class="row aling-items-center">
                        <div class="col-12 col-md-6 col-lg-8">
                            <h4 class="text-primary">
                                <FontAwesomeIcon icon="fa-tachometer-alt" class="me-2" />
                                Dashboard CRM
                            </h4>
                            <h6 class="text-muted mt-2">
                                <FontAwesomeIcon icon="fa-user" class="me-1" />
                                Bienvenido, {{ authSianwebStore.userName }}
                                <FontAwesomeIcon icon="fa-building" class="ms-2 me-1" />
                                Usuario ID {{ authSianwebStore.userId }}
                            </h6>
                        </div>
                        <div class="col-12 col-md-6 col-lg-4">
                            <UserHeaderFilters />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import UserHeaderFilters from './UserHeaderFilters.vue'
import { useAuthSianwebStore } from '@/core/store/authSianwebStore'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const authSianwebStore = useAuthSianwebStore()
</script>