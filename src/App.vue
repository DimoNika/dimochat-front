<template>
    <div v-if="appState.currentView === 'home'" class="h-screen flex  items-center justify-center">
        <HelloWorld />
    </div>

    <div v-else-if="appState.currentView === 'signup'" class="h-screen flex items-center justify-center">
        <Signup />
    </div>

    <div v-else-if="appState.currentView === 'login'" class="h-screen flex flex-col items-center justify-center">
        <Login />   
    </div>
    <div v-else>
    Not A/B/C
    </div>
    <!-- <div class="h-screen flex items-center justify-center">
        <HelloWorld />
    </div> -->
</template>

<script setup>
    import HelloWorld from './components/HelloWorld.vue'
    import Login from './components/Login.vue'
    import Signup from './components/Signup.vue'
    
    import { useAppStateStore } from '@/stores/appState'
    const appState = useAppStateStore()


        
</script>

<style scoped>

</style>
