import { defineStore } from 'pinia'


export const useListChatStore = defineStore('chatListStore', {

    state: () => ({
        chatList: [],
    }),

    // actions: {
    //     getMessagesLength() {
    //         return this.messages.length
    //     }
        
    // }
})