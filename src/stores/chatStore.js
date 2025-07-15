import { defineStore } from 'pinia'

import { useAuthStore } from '@/stores/auth'
// const authStore = useAuthStore()


export const useChatStore = defineStore('chatStore', {

    state: () => ({
        selectedChatUsername: null,
        selectedUserId: null,
        messages: [],
    //  messages = [{
    //     chat_id: int
    //     edited_at: Datetime
    //     id: int
    //     is_deleted: bool
    //     sender_id: int
    //     sent_at: Datetime
    //     text: str
    //   }]
    }),

    actions: {
        getMessagesLength() {
            return this.messages.length
        },

        async fetch_messages() {
            const authStore = useAuthStore()

            let data = {
                "chatter_id": this.selectedUserId
                
            }

            let requestOptions = {
                headers: {
                    "Authenticate": `Bearer ${authStore.accessToken}`
                },
                method: "POST",

                body: JSON.stringify(data)
            }

            // request itselt
            return fetch("/api/chat-service/load-messages", requestOptions)
            .then(async (response) => {

                const data = await response.json()  // data decoding
                console.log("Messages: ", data);
                return data
            })
        }
        
    }
})