<template>
  <div>
  
    <TransitionRoot as="template" :show="is_visible">
      <Dialog class="relative z-10" @close="close()">
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-gray-500/75 transition-opacity" />
        </TransitionChild>

        <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild name="" as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
              <DialogPanel class="bg-gradient-to-br from-violet-600 to-pink-500 relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <!-- INNER CONTAINER -->
                <div class="bg-white rounded-md m-1 p-3 pb-2 sm:p-6 sm:pb-4">
                    <p class="text-xl mb-3">
                        New chat
                    </p>
                    <!-- <hr class="mb-3"> -->
                    <label for="Password" class="relative my-3">
                    <input v-model="username" type="text" id="Password" name="password" placeholder="" class="mb-3 peer px-2 h-10 mt-0.5 w-full rounded border-1 border-zinc-200 shadow sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-white"/>
                        <span class="cursor-text absolute inset-y-0 start-3 -translate-y-5 bg-white px-0.5 text-sm font-medium text-gray-700 transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-5">
                            Username
                        </span>
                    </label>

                    <div class="text-red-500" :class="{invisible: userNotFound_error_visible}">
                        User not found!
                    </div>

                    <!-- <div class="sm:flex sm:items-start">
                        <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                            <DialogTitle as="h3" class="text-base font-semibold text-gray-900">Deactivate account</DialogTitle>
                            <div class="mt-2">
                                <p class="text-sm text-gray-500">Are you sure you want to deactivate your account? All of your data will be permanently removed. This action cannot be undone.</p>
                            </div>
                        </div>
                    </div> -->
                    <div class="pt-3 grid grid-cols-2">
                    <button type="button" @click="close()" class="w-fit relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-500 to-orange-400 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
                        <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                            Close
                        </span>
                    </button>
                    <button type="button" @click="create_new_chat()" class="w-fit relative justify-self-end inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-blue-400 to-green-400 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
                        <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                            Start chat
                        </span>
                    </button>
                        <!-- <button type="button" class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto" @click="close()">Deactivate</button>
                        <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto" @click="close()" ref="cancelButtonRef">Cancel</button> -->
                    </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
// import { ExclamationTriangleIcon } from '@heroicons/vue/24/outline'

import { useAuthStore } from '@/stores/auth'
const authStore = useAuthStore()

import { useChatStore } from '@/stores/chatStore'
const chatStore = useChatStore()

const userNotFound_error_visible = ref(true)
const username = ref("")


defineProps({
    is_visible: Boolean
})

const emit = defineEmits(['update:is_visible'])

function close() {
    emit('update:is_visible', false)  // ← это и обновит переменную в родителе
}

function create_new_chat() {

    let data = {
        "username": username.value,
    }
    
    let requestOptions = {
        method: "POST",
        headers: {
            "Authenticate": `Bearer ${authStore.accessToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }

    // fetch("/api/chat-service/new-chat", requestOptions)
    fetch("/api/chat-service/find-user", requestOptions)
    .then(async (response) => {

        const data = await response.json()  // data decoding
        console.log(response);
        console.log(data);
        // try{
            // }



        // Data annotation
        // data = {
        //     "username": String,
        //     "user_id": Integer,
        //     "messages": Array,
        // }
            
        

        if (response.ok) {
            chatStore.selectedChatUsername = data.username
            chatStore.selectedUserId = data.user_id
            chatStore.messages = data.messages
            userNotFound_error_visible.value = true
            close()

        } else if (!response.ok) { // if user creation is not succesful
            userNotFound_error_visible.value = false
            
        }})

    .catch(error => {
        console.error("Error:", error);
    });

}

// const open = ref(true)
</script>