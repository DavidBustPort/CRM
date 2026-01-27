<template>
    <div class="d-inline-flex align-items-center px-3 py-1 rounded-pill shadow-sm border" :class="statusConfig.containerClass">
        <span class="status-dot me-2" :class="statusConfig.dotClass"></span>
        
        <span class="fw-bold small text-uppercase tracking-wider">{{ label }}</span>
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
    type: 'edit' | 'new' | 'view',
    label: string
}>()

const statusConfig = computed(() => {
    switch (props.type) {
        case 'edit':
            return {
                containerClass: 'bg-warning-subtle border-warning text-warning-emphasis',
                dotClass: 'bg-warning animate-pulse'
            }
        case 'new':
            return {
                containerClass: 'bg-success-subtle border-success text-success-emphasis',
                dotClass: 'bg-success'
            }
        default:
            return {
                containerClass: 'bg-light border-secondary-subtle text-secondary',
                dotClass: 'bg-secondary'
            }
    }
})
</script>

<style scoped>
.status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    display: inline-block;
}

.animate-pulse {
    animation: pulse-animation 2s infinite;
}

@keyframes pulse-animation {
    0% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.4; transform: scale(1.2); }
    100% { opacity: 1; transform: scale(1); }
}

.tracking-wider {
    letter-spacing: 0.05em;
}
</style>