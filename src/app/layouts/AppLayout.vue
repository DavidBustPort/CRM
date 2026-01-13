<template>
    <div class="wrapper">
        <AppSidebar />
        <div class="main">
            <AppHeader />
            <div class="content">
                <AppContainer />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import AppSidebar from './components/appSidebar/AppSidebar.vue'
import AppHeader from './components/appHeader/AppHeader.vue'
import AppContainer from './components/appContainer/AppContainer.vue'
</script>