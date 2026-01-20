<template>
    <div @click="back" class="back-btn rounded-pill shadow-sm px-4 py-2">
        <FontAwesomeIcon icon="fa-arrow-left" class="me-3" size="lg" />
        <span class="fw-bold fs-5">Volver</span>
    </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useRouter } from 'vue-router'

const router = useRouter()
const back = () => {
    router.push('/prospectos')
}
</script>

<style scoped lang="scss">
.back-btn {
    cursor: pointer;
    color: #6c757d;
    background-color: #fff;
    border: 2px solid #e9ecef;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    &:hover {
        color: #fff;
        background-color: #0d6efd;
        border-color: #0d6efd;
        transform: translateX(-5px);
        box-shadow: 0 4px 15px rgba(13, 110, 253, 0.3) !important;
    }
}
</style>