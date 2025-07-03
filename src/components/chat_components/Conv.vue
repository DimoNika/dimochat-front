<template>
<div class="flex flex-col h-full max-h-screen">
  <!-- Контейнер с сообщениями -->
    <div v-if="chatStore.selectedChatUsername" class="bg-cyan-700 flex text-center justify-center h-11">
        
            <span class="text-gray-200 my-auto">
                {{ chatStore.selectedChatUsername }}
                {{ chatStore.selectedUserId }}
            </span>
        
        
    </div>
    <div v-else>
    </div>

    <!----------------->

    <div ref="chatContainer" class="flex-1 overflow-y-auto">
<div class="p-4 space-y-2 flex flex-col-reverse h-full">
            <!-- No messages -->
            <div v-if="chatStore.messages.length === 0" class="flex-1 flex items-center justify-center">
                <span class="text-center underline">
                    There is no messages yet.
                </span>
            </div>

            <!-- Display messages -->
            <div v-else>
                <!-- 
                messages = [{
                    chat_id: 5
                    edited_at: null
                    id: 9
                    is_deleted: false
                    sender_id: 88
                    sent_at: "2025-07-03T14:29:14.036284"
                    text: "asdasdasdasd Dimo n 1"
                }]
                 -->
                 <!-- <p>{{ chatStore.messages }}</p> -->
                <div
                    v-for="message in chatStore.messages" class="message my-1.5" 
                    :class="message.sender_id === chatStore.selectedUserId ? 'others-message' : 'your-message'  ">
                    <p>
                        {{ message.text }}
                    </p>
                    <span class="text-xs text-gray-500">{{ message.sent_at }}</span>
                </div> 
            </div>
            <!-- и т.д. -->
        </div>
    </div>

    <!-- Инпут -->
    <div class="p-2" v-if="chatStore.selectedChatUsername">
    <!-- <textarea class="w-full p-2 border rounded" name="" id="" rows="1"></textarea> -->
    
        <input  
            v-model="messageInput"
            type="text"
            placeholder="Type..."
            class="w-full p-2 border rounded"
        />
        <button @click="sendMessage()" type="">Send</button>  
    </div>
</div>
</template>

<script setup>



import { ref, onMounted, nextTick, useTemplateRef} from 'vue'
import { watch } from 'vue'

const messages = ref([
    
    ])
    
import { useChatStore } from '@/stores/chatStore'
const chatStore = useChatStore()

const newMessage = ref('')
const chatContainer = ref(null)
// const messageInput = useTemplateRef("messageInput")
const messageInput = ref("")


const emit = defineEmits(["sendMessage"])


const scrollToBottom = () => {
  const el = chatContainer.value
  if (el) {
    el.scrollTop = el.scrollHeight
  }
}

onMounted(() => {
    scrollToBottom()
})

const sendMessage = () => {
    console.log("message sent");
    let messageData = {
        "message": messageInput.value,
        "selectedUserId": chatStore.selectedUserId,
    }
    emit('sendMessage', messageData)

  
    nextTick(() => {
        scrollToBottom()
    })

}
watch(() => chatStore.selectedUserId, async (newVal, oldVal) => {

    console.log('selectedUserId в store изменился с', oldVal, 'на', newVal)
    
    chatStore.messages = await chatStore.fetch_messages()
    nextTick(() => {
        scrollToBottom()
    })
    // scrollToBottom()
    // if (newVal) chatStore.fetch_messages()
})
// console.log(messages.value)

</script>

<style>
    @reference "tailwindcss";

    .message {
        @apply bg-blue-300 p-2 pb-0.5 rounded-xl break-words w-fit max-w-[400px] px-2;

    }

    .your-message {
        @apply ms-auto
    }

    .others-message {
        /* @apply  */
    }
</style>
