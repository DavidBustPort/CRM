import { defineStore } from 'pinia'
import { state } from './prospectosListStore.state'
import { actions } from './prospectosListStore.actions'

export const useProspectosListStore = defineStore('prospectosList', {
    state,
    actions
})