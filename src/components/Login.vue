<template class="">

    <!-- <div class="relative bg-gradient-to-br from-green-400 to-blue-600 p-0.5 rounded-lg min-w-100"> -->
    <div class="w-100 relative items-center justify-center p-0.5 text-sm rounded-lg bg-gradient-to-br from-green-400 to-blue-600 dark:text-white dark:focus:ring-green-800">



        <form class="relative px-5 py-2.5  bg-white dark:bg-gray-900 rounded-md" method="post" enctype="multipart/form-data">
            <p class="block text-3xl mb-4">
                Login
            </p>
            <!-- ... -->
            
            <label for="Username" class="relative my-3">
                <input v-model="username" type="text" id="Username" name="username" placeholder="" class="mb-3 peer px-2 h-10 mt-0.5 w-full rounded border-1 border-zinc-200 shadow sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-white"/>
                <span class="cursor-text absolute inset-y-0 start-3 -translate-y-5 bg-white px-0.5 text-sm font-medium text-gray-700 transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-5">
                    Username
                </span>
            </label>
            <!-- ... -->
        
            <label for="Password" class="relative my-3">
                <input v-model="password" type="password" id="Password" name="password" placeholder="" class="mb-3 peer px-2 h-10 mt-0.5 w-full rounded border-1 border-zinc-200 shadow sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-white"/>
                <span class="cursor-text absolute inset-y-0 start-3 -translate-y-5 bg-white px-0.5 text-sm font-medium text-gray-700 transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-5">
                    Password
                </span>
            </label>
            <!-- ... -->

                <div v-if=" login_error_msg != ''" class="p-0.5 rounded-md bg-gradient-to-br from-red-600 to-pink-600 my-1">
                    <p class="bg-white rounded-sm p-1.5 text-red-500">{{ login_error_msg }}</p>
                </div>
            <!-- ... -->

            <p> 
                Don't have an account? <button @click="to_signup()" class="text-blue-500 underline cursor-pointer">Sign up</button>
            </p>
            <!-- ... -->

            <div class="grid grid-cols-2 pt-4.5">
                <button type="button" @click="to_home()" class="w-fit relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-500 to-orange-400 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
                    <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                        Back
                    </span>
                </button>
                <!-- ... -->

                <button type="button" @click="login()" class="w-fit justify-self-end relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
                    <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                        Login
                    </span>
                </button>
            </div>
        </form>            
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAppStateStore } from '@/stores/appState'

const appState = useAppStateStore()

import { useAuthStore } from '@/stores/auth'
const authStore = useAuthStore()

// const count = ref(0)
const username = ref("")
const password = ref("")

const login_error_msg = ref("")


function to_home() {
    appState.setView("home")
    console.log(appState.currentView);
}

function to_signup() {
    // login system
    appState.setView("signup")
    console.log(appState.currentView);
}


function login() {
    // login in system
    login_error_msg.value = ""

    // data obj
    let data = {
        "username": username.value,
        "password": password.value,     
    }
    

    let requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }

    console.log(data);

        // request itselt
    fetch("/api/auth-service/login", requestOptions)
    .then(async (response) => {

        const data = await response.json()  // data decoding
        console.log(response);

        console.log(data);
            
        

        if (response.ok) {
            // DO SONTHING COOL IF ALL OK
            // console.log(data.access_token)
            // console.log("hellow world")
            authStore.setAccessToken(data.access_token)
            appState.setView("chats")
            

                
                
        } else if (!response.ok) { // if user creation is not succesful
            login_error_msg.value = data.custom_msg
        
        }})

    .catch(error => {
        console.error("Error:", error);
    });



    // console.log(appState.currentView);
}

</script>

<style scoped>

</style>
