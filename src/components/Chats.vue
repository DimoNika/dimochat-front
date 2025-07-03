<template>
    <div class="flex flex-row h-screen w-full" style="">
        <ChatButtons class="basis-16 bg-cyan-300" />
        <ChatList class="basis-70 bg-cyan-600"/>
        <Conv @send-message="sendMessage" class="flex-1 bg-cyan-100" />
    </div>
    
</template>

<script setup>
    import ChatList from "@/components/chat_components/ChatList.vue"
    import ChatButtons from "@/components/chat_components/ChatButtons.vue"
    import Conv from "@/components/chat_components/Conv.vue"
    
    import { useAuthStore } from '@/stores/auth'
    const authStore = useAuthStore()

    import { useListChatStore } from '@/stores/chatListStore'
    const chatListStore = useListChatStore()

    import { provide } from 'vue'
    import { onMounted } from 'vue'

    import { ref } from 'vue'

    // const chatList = ref()


    async function load_chats() {
        try {
            const res = await fetch('/api/chat-service/load-chats', {
                method: 'GET',
                headers: {
                    "Authenticate": `Bearer ${authStore.accessToken}`
                },
                credentials: 'include', // чтобы браузер отправил cookie с refresh_token
            })

            if (!res.ok) throw new Error('Load chats failed')
            const data = await res.json()
        
            console.log(data);
            
            return data
        } catch (e) {
            console.error('Refresh error:', e)
            // this.logout()
        }
        
    }


    onMounted(async() => {
        chatListStore.chatList = await load_chats()
    })

    
        
    // function getData() {
    //     return [
    //         {
    //             chat_id: 1,
    //             user: "Aboba",
    //             last_message: "hello freak"
    //         },
    //         {
    //             chat_id: 2,
    //             user: "Gleck",
    //             last_message: "Money"
    //         },
    //         {
    //             chat_id: 3,
    //             user: "Freak",
    //             last_message: "lets play roblox today!"
    //         },
    //         {
    //             chat_id: 4,
    //             user: "Chell",
    //             last_message: "nice meme"
    //         },
    //     ]
    // }
    
    const ws = new WebSocket("/api/chat-service/ws");

    // Pass jwt to authenticate in WS opening
    ws.onopen = function(event) {
        let data = {
            "access_token": authStore.accessToken,
        }
        ws.send(JSON.stringify(data))

    }

    
    ws.onmessage = function(event) {
        console.log(event)
        // var messages = document.getElementById('messages')
        // var message = document.createElement('li')
        // var content = document.createTextNode(event.data)
        // message.appendChild(content)
        // messages.appendChild(message)
    }


    
    function sendMessage(messageData) {
        console.log("hellow orld");
        ws.send(JSON.stringify(messageData))
        console.log(messageData.message);
    }

    
    // console.log(data);
    

    // onMounted(async () => {
    //     let data = getData()
    //     console.log(data);
    //     provide("chats_data", getData())
    // })


</script>

