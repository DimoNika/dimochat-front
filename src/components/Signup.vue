<template class="">

        <!-- <div class="relative bg-gradient-to-br from-green-400 to-blue-600 p-0.5 rounded-lg min-w-100"> -->
        <div class="w-100 relative items-center justify-center p-0.5 text-sm rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 dark:text-white dark:focus:ring-green-800">



            <form class="relative px-5 py-2.5  bg-white dark:bg-gray-900 rounded-md" method="post" enctype="multipart/form-data">
                <p class="block text-3xl mb-4">
                    Sign up
                </p>
                <!-- ... -->
                <p>
                    Choose username
                </p>
                <!-- ... -->
                
                <label for="Username" class="relative my-3">
                    <input type="text" id="Username" name="username" placeholder="" class="mb-3 peer px-2 h-10 mt-0.5 w-full rounded border-1 border-zinc-200 shadow sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-white"/>
                    <span class="cursor-text absolute inset-y-0 start-3 -translate-y-5 bg-white px-0.5 text-sm font-medium text-gray-700 transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-5">
                        Username
                    </span>
                </label>
                <!-- ... -->
                <p>
                    Create strong password
                </p>
                <!-- ... -->
                <label for="Password1" class="relative my-3">
                    <input type="password" id="Password1" name="password1" placeholder="" class="mb-3 peer px-2 h-10 mt-0.5 w-full rounded border-1 border-zinc-200 shadow sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-white"/>
                    <span class="cursor-text absolute inset-y-0 start-3 -translate-y-5 bg-white px-0.5 text-sm font-medium text-gray-700 transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-5">
                        Password
                    </span>
                </label>
                <!-- ... -->
                <p>
                    And proove it
                </p>
                <!-- ... -->
                <label for="Password2" class="relative my-3">
                    <input type="password" id="Password2" name="password2" placeholder="" class="mb-3 peer px-2 h-10 mt-0.5 w-full rounded border-1 border-zinc-200 shadow sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-white"/>
                    <span class="cursor-text absolute inset-y-0 start-3 -translate-y-5 bg-white px-0.5 text-sm font-medium text-gray-700 transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-5">
                        Password
                    </span>
                </label>
                <!-- ... -->
                <p> 
                    Have an account already? <button @click="to_login()" class="text-blue-500 underline cursor-pointer">Login</button>
                </p>
                <!-- ... -->

                <div class="grid grid-cols-2 pt-4.5">
                    <button @click="to_home()" class="w-fit relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-500 to-orange-400 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
                        <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                            Back
                        </span>
                    </button>
                    <!-- ... -->

                    <button @click="signup()" class="w-fit justify-self-end relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
                        <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                            Sign up
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

const count = ref(0)

function to_home() {
    appState.setView("home")
    console.log(appState.state);
}

function to_login() {
    // login system
    appState.setView("login")
    console.log(appState.state);
}


function signup() {
    // login is system
    console.log(appState.state);
}

</script>

<style scoped>

</style>
