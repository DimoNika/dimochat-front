<template>
    <div class="overflow-auto">

        <div @click="choose_chat(chat)" v-for="chat in sortedChats" class="flex flex-row m-1 hover:bg-zinc-600/50 cursor-pointer">
        <!-- <div> -->
            <div class="basis-1/4">
                <img src="https://gravatar.com/avatar/9262bb348b11d4a8ebd7a79725066937?d=mm&s=512&r=x" alt="User pic">
            </div>
            <div class="basis-3/4 ms-1">
                <p class="text-white"> {{ chat.chatter.username }}</p>
                <!-- <p class="whitespace-nowrap overflow-hidden text-ellipsis">
  Этот очень длинный текст будет отображаться в одну строку и обрезаться с многоточием, если он выходит за пределы своего контейнера.
</p> -->
                <!-- <p class="text-amber-300 overflow-hidden text-ellipsis w-full block"> {{ chat.last_message.text }}</p> -->
                <p class="text-amber-300 overflow-hidden text-ellipsis w-full block"> {{ format_message(chat.last_message.text) }}</p>
                <p class="text-amber-300"> {{ myTimeFormatter(chat.last_message.sent_at) }}</p>

            </div>
        <!-- </div> -->
        </div>
        <!-- <li v-for="item in items">
            {{ item.message }}
        </li>
        <p>"Props: {{ props.chats_list }}</p> -->

        <!-- <button @click="console.log(message)">aboba</button> -->
    </div>
</template>


<script setup>
import { inject } from 'vue'
import { ref, computed } from 'vue'
import { defineProps } from 'vue'
import { watch } from 'vue'

import { useListChatStore } from '@/stores/chatListStore'
const chatListStore = useListChatStore()

import { useChatStore } from '@/stores/chatStore'
const chatStore = useChatStore()

// custom function for formatting time from python to human readable
function myTimeFormatter(pythonTime) {
    const isoStr = pythonTime.replace(" ", "T").slice(0, 23);
    const isoTime = new Date(isoStr + "Z")
    
    
    const pad = n => String(n).padStart(2, "0");
    return `${pad(isoTime.getHours())}:${pad(isoTime.getMinutes())}`+
    ` ${pad(isoTime.getDate())}.${pad(isoTime.getMonth()+1)}.${isoTime.getFullYear()}`

}


function choose_chat(chat) {
    chatStore.selectedChatUsername = chat.chatter.username
    chatStore.selectedUserId = chat.chatter.user_id

}

    const sortedChats = computed(() => {
        return [...chatListStore.chatList].sort((a, b) => {
            const dateA = new Date(a.last_message.sent_at.replace(' ', 'T'))
            const dateB = new Date(b.last_message.sent_at.replace(' ', 'T'))
            return dateB - dateA // По убыванию: новые сверху
        })
    })


    function format_message(text) {
        if (text.length > 22) {

            return text.slice(0, 22) + "..."
        } else {

            return text
        }
    }


    // const chats_data = ref("")
    // let message = inject("chats_data")


</script>

<style scoped>


</style>