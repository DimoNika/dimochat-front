import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAppStateStore = defineStore('appState', {

    state: () => ({
        currentView: 'home', // или null
    }),

    actions: {
        setView(viewName) {
            this.currentView = viewName
        },
    }
        
})
