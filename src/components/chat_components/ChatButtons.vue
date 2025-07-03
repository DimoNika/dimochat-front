<template>
<div class="" id="hello">
    <!-- Buttin group -->
    <div class="w-full flex-col justify-center">
        <button @click="visible_NewChatPrompt = true" type="button" class="w-16 h-16 hover:cursor-pointer hover:bg-cyan-800/50">
        <div>
            <span class="" style="">
                New
            </span>
        </div>
        </button>
        <hr class="mx-3 border-zinc-400">
        <!-- <br> -->
        <button type="button" class="w-16 h-16 hover:cursor-pointer">But2</button>
        <hr class="mx-3 border-zinc-400">
        <br>
        <button type="button" class="bg-emerald-500">But3</button>

    </div>
    <NewChatPrompt v-model:is_visible="visible_NewChatPrompt" />
</div>
</template>

<script setup>
import NewChatPrompt from "@/components/chat_components/NewChatPrompt.vue"
import { ref } from 'vue'

const visible_NewChatPrompt = ref(false)





</script>

<style>
/* button {
    margin: 5px;
} */
</style>