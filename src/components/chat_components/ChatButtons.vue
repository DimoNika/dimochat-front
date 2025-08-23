<template>
<div class="" id="hello">
    <!-- Buttin group -->
    <div class="w-full flex-col justify-center">
        <!-- BTN 1 -->
        <button @click="visible_NewChatPrompt = true" type="button" class="w-16 h-16 hover:cursor-pointer hover:bg-cyan-800/50">
            <div>
                <span class="" style="">
                    New
                </span>
            </div>
        </button>

        <!-- BTN 2 -->
        <hr class="mx-3 border-zinc-400">
        <button type="button" class="w-16 h-16 hover:cursor-pointer hover:bg-cyan-800/50">
            But2
        </button>

        <!-- BTN 3 -->
        <hr class="mx-3 border-zinc-400">
        <button @click="logout" type="button" class="w-16 h-16 hover:cursor-pointer hover:bg-cyan-800/50">
            <span class="text-red-500">
                Logout
            </span>
        </button>
        <hr class="mx-3 border-zinc-400">


    </div>
    <NewChatPrompt v-model:is_visible="visible_NewChatPrompt" />
</div>
</template>

<script setup>
import NewChatPrompt from "@/components/chat_components/NewChatPrompt.vue"
import { ref } from 'vue'

const visible_NewChatPrompt = ref(false)


async function logout() {

    const res = await fetch('/api/auth-service/logout')

    console.log(res);
    location.reload()
}


</script>

<style>
/* button {
    margin: 5px;
} */
</style>