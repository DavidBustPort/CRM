export {}
declare module 'vue-router' {
    interface RouteMeta {
        sidebarMenu?: boolean
        isSidebarMenuParent?: boolean
        icon?: string
        canExtendContainer?: boolean
        breadcrumbName?: string
        mainContainerColumn?: string
        requiresHeavyLoading?: boolean
        canFilterRik?: boolean
    }
}