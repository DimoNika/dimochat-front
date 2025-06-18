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
    <div v-else-if="appState.currentView === 'chats'" class="h-screen flex flex-col items-center justify-center">
        <Chats />   
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
    import Chats from './components/Chats.vue'
    import { onMounted } from 'vue'
    
    import { useAppStateStore } from '@/stores/appState'
    const appState = useAppStateStore()
    

    import { useAuthStore } from '@/stores/auth'
    const authStore = useAuthStore()



    onMounted(async () => {
        await authStore.refreshAccessToken()
        // console.log(`alo1 ${authStore.accessToken}`);

        // let test = await authStore.auth()
        // console.log(`alo ${test}`);
        // console.log(`alo2 ${await authStore.auth()}`);

        if (authStore.auth()) {
            console.log("test");
            appState.setView("chats")
        }
    })

    // console.log(authStore.accessToken);
    // authStore.auth()



        
</script>

<style scoped>

</style>
