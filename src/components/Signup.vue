<template class="">

        <!-- <div class="relative bg-gradient-to-br from-green-400 to-blue-600 p-0.5 rounded-lg min-w-100"> -->
        <div class="w-100 relative items-center justify-center p-0.5 text-sm rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 dark:text-white dark:focus:ring-green-800">



            <form class="relative px-5 py-2.5  bg-white dark:bg-gray-900 rounded-md" method="post" enctype="multipart/form-data">
                <p class="block text-3xl mb-4">
                    Sign up
                </p>
                <!-- USERNAME -->
                <p class="pb-2">
                    Choose username
                </p>
                <!-- ... -->
                
                <label for="Username" class="relative my-3">
                    <input v-model="username" type="text" id="Username" name="username" placeholder="" class="mb-1 peer px-2 h-10 mt-0.5 w-full rounded border-1 border-zinc-200 shadow sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-white"/>
                    <span  class="cursor-text absolute inset-y-0 start-3 -translate-y-5 bg-white px-0.5 text-sm font-medium text-gray-700 transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-5">
                        Username
                    </span>
                </label>
                
                <!-- ... -->

                <div v-if=" username_error_msg != ''" class="p-0.5 rounded-md bg-gradient-to-br from-red-600 to-pink-600 my-1">
                    <p class="bg-white rounded-sm p-1.5 text-red-500">{{ username_error_msg }}</p>
                </div>
                <!-- PASSSWORD 1 -->

                <p class="pb-2">
                    Create strong password
                </p>
                <!-- ... -->

                <label for="Password1" class="relative my-3">
                    <input v-model="password1" type="password" id="Password1" name="password1" placeholder="" class="mb-1 peer px-2 h-10 mt-0.5 w-full rounded border-1 border-zinc-200 shadow sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-white"/>
                    <span class="cursor-text absolute inset-y-0 start-3 -translate-y-5 bg-white px-0.5 text-sm font-medium text-gray-700 transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-5">
                        Password
                    </span>
                </label>
                <!-- ... -->

                <div v-if=" password1_error_msg != ''" class="p-0.5 rounded-md bg-gradient-to-br from-red-600 to-pink-600 my-1">
                    <p class="bg-white rounded-sm p-1.5 text-red-500">{{ password1_error_msg }}</p>
                </div>
                <!-- PASSSWORD 2 -->
                <p class="pb-2">
                    And proove it
                </p>
                <!-- ... -->
                <label for="Password2" class="relative my-3">
                    <input v-model="password2" type="password" id="Password2" name="password2" placeholder="" class="mb-1 peer px-2 h-10 mt-0.5 w-full rounded border-1 border-zinc-200 shadow sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-white"/>
                    <span class="cursor-text absolute inset-y-0 start-3 -translate-y-5 bg-white px-0.5 text-sm font-medium text-gray-700 transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-5">
                        Password
                    </span>
                </label>
                <!-- ... -->

                <div v-if=" password2_error_msg != ''" class="p-0.5 rounded-md bg-gradient-to-br from-red-600 to-pink-600 my-1">
                    <p class="bg-white rounded-sm p-1.5 text-red-500">{{ password2_error_msg }}</p>
                </div>
                <!-- ... -->

                <p> 
                    Have an account already? <button @click="to_login()" class="text-blue-500 underline cursor-pointer">Login</button>
                </p>
                <!-- ... -->
                <div v-if=" password_equality_error_message != ''" class="p-0.5 rounded-md bg-gradient-to-br from-red-600 to-pink-600 my-1">
                    <p class="bg-white rounded-sm p-1.5 text-red-500">{{ password_equality_error_message }}</p>
                </div>
                <!-- ... -->


                <div class="grid grid-cols-2 pt-4.5">
                    <button type="button" @click="to_home()" class="w-fit relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-500 to-orange-400 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
                        <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                            Back
                        </span>
                    </button>
                    <!-- ... -->

                    <button type="button" @click="signup()" class="w-fit justify-self-end relative inline-flex items-center justify-center p-0.5 mb-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
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

import { useAuthStore } from '@/stores/auth'
const authStore = useAuthStore()

const appState = useAppStateStore()

const username = ref("")
const password1 = ref("")
const password2 = ref("")

const username_error_msg = ref("")
const password1_error_msg = ref("")
const password2_error_msg = ref("")

const password_equality_error_message = ref("")


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
    // data obj
    let data = {
        "username": username.value,
        "password1": password1.value,
        "password2": password2.value
    }
    

    let requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }


    // if passworld are equal we do requet to the server
    if (password1.value === password2.value) {

        // reset of all error messages
        password_equality_error_message.value = ""
        username_error_msg.value = ""
        password1_error_msg.value = ""
        password2_error_msg.value = ""

        // request itselt
        fetch("http://localhost/api/auth-service/create-user", requestOptions)
        .then(async (response) => {

            const data = await response.json()  // data decoding
            console.log(response)
            console.log(data)
            console.log(response.ok)


            if (response.ok) {
                // DO SONTHING COOL IF ALL OK
                console.log("access token: " + data.access_token)
                authStore.setAccessToken(data.access_token)
                appState.setView("chats")

                
                
            } else if (!response.ok) { // if user creation is not succesful
                
                // error structure:
                // 
                // {
                //      "is_succesful": false, (bool)
                //      "loc": some_location, (str)
                //      "custom_msg": message, (str)
                // }

                // itearte through errors
                data.forEach(element => {
                    if (element.loc === "username") {
                        username_error_msg.value = element.custom_msg
                    }
                    if (element.loc === "password1") {
                        password1_error_msg.value = element.custom_msg
                    }
                    if (element.loc === "password2") {
                        password2_error_msg.value = element.custom_msg
                    }
                });
            }            
        })
        .catch(error => {
            console.error("Error:", error);
        });

    } else { // if passwords are NOT equal, we show thaw with `password_equality_error_message`
        password_equality_error_message.value = "Passwords are not equal"
    }
}

</script>
<style scoped>

</style>
