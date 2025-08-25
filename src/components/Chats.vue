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

    import { useChatStore } from '@/stores/chatStore'
    const chatStore = useChatStore()

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
        
            console.log(`load chats data : ${JSON.stringify(data)}`);
            
            return data
        } catch (e) {
            console.error('Refresh error:', e)
            // this.logout()
        }
        
    }


    onMounted(async() => {
        chatListStore.chatList = await load_chats()
    })

    const ws = new WebSocket("/api/chat-service/ws");

    // Pass jwt to authenticate in WS opening
    ws.onopen = function(event) {
        let data = {
            "access_token": authStore.accessToken,
        }
        ws.send(JSON.stringify(data))

    }

    
    ws.onmessage = function(event) {
        console.log(`Message received: ${event.data}`)
        let response_data_obj = JSON.parse(event.data)
        console.log(`Message received text: ${response_data_obj.message_obj.text}`)

        
        // check if this message in current chat
        if (response_data_obj.receiver_id == chatStore.selectedUserId || response_data_obj.sender_id == chatStore.selectedUserId) { 
            // console.log(response_data_obj.message_obj)
            chatStore.messages.push(response_data_obj.message_obj)

        } 
        // response_data_obj = {
        //     "message_obj": new_message.to_dict(),
        //     "sent_at": str(new_message.sent_at),
        //     "sender_id": this_user_id,
        //     "receiver_id": other_user_id,
        //     "receiver_username": session.query(User).filter_by(id=other_user_id).first().username,
        // }

        
        
        // Get chat in message list
        const chatList_item = chatListStore.chatList.find(item => {
            if (item.chatter.user_id === response_data_obj.sender_id || item.chatter.user_id === response_data_obj.receiver_id) {
                return item
            }
        })
            // chatListStore.chatList = [{
            //  chatter: {
            //      username: str
            //      user_id: int,
            //      },
            //  last_message = {
            //      text: str,
            //      sent_at: Datetime
            //      }
            // }]

        console.log(chatList_item)
        // Check if exists chat in chatList
        if (chatList_item) {
            // Executes if EXISTS
            chatList_item.last_message.text = response_data_obj.message_obj.text
            chatList_item.last_message.sent_at = response_data_obj.message_obj.sent_at
            console.log("exsits")
        } else {
            // Executes if DOES NOT exists
            // we create new
            let new_chatList_item = {
                chatter: {},
                last_message: {}
            }

            new_chatList_item.chatter.username = response_data_obj.sender_username
            new_chatList_item.chatter.user_id = response_data_obj.sender_id

            new_chatList_item.last_message.text = response_data_obj.message_obj.text
            new_chatList_item.last_message.sent_at = response_data_obj.message_obj.sent_at

            
            chatListStore.chatList.push(new_chatList_item)
            

        }
    }


    
    function sendMessage(messageData) {
        console.log("hellow orld");
        ws.send(JSON.stringify(messageData))
        console.log(`message text: ${messageData.message}`)
        console.log(`message receiver: ${messageData.selectedUserId}`)

    }

    

</script>

