import { defineStore } from 'pinia'

import { useAuthStore } from '@/stores/auth'
// const authStore = useAuthStore()


export const useChatStore = defineStore('chatStore', {

    state: () => ({
        selectedChatUsername: null,
        selectedUserId: null,
        messages: [],
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
        
        // // Устанавливаем токен
        // setAccessToken(token) {
        //     this.accessToken = token
        //     this.startRefreshLoop()
        // },

        // // Запускаем интервал для автообновления токена
        // startRefreshLoop() {
        //     if (this.refreshIntervalId) return // уже работает

        //     this.refreshIntervalId = setInterval(() => {
        //         if (!this.accessToken) return

        //         const payload = JSON.parse(atob(this.accessToken.split('.')[1])) // декодируем JWT payload
        //         console.log(payload)

        //         const expDate = new Date(payload.exp * 1000);
        //         console.log(expDate.toLocaleString());

        //         const now = Math.floor(Date.now() / 1000)
        //         const timeLeft = payload.exp - now

        //         // Если меньше 30 секунд до истечения — обновляем
        //         if (timeLeft < 30) {
        //             this.refreshAccessToken()
        //         }
        //     }, 10000) // проверка каждые 10 сек
        // },

        // // Обновляем access token через API
        // async refreshAccessToken() {
        //     try {
        //         const res = await fetch('/api/auth-service/refresh', {
        //             method: 'POST',
        //             credentials: 'include', // чтобы браузер отправил cookie с refresh_token
        //         })

        //         if (!res.ok) throw new Error('Refresh failed')

        //         const data = await res.json()

        //         this.setAccessToken(data.access_token)
        //         console.log('Access token refreshed: ', this.accessToken)
        //     } catch (e) {
        //         console.error('Refresh error:', e)
        //         // this.logout()
        //     }
        // },

        // // Logout и остановка автообновления
        // logout() {
        //     this.accessToken = null
        //     if (this.refreshIntervalId) {
        //         clearInterval(this.refreshIntervalId)
        //         this.refreshIntervalId = null
        //     }
        //     // например, редирект:
        //     window.location.href = '/login'
        // },

        // // Check if user has working tokens
        // async auth() {
        // // const token = await this.accessToken  // дожидаемся Promise

        //     let requestOptions = {
        //         headers: {
        //             "Authenticate": `Bearer ${this.accessToken}`
        //         },
        //     }

        //     // request itselt
        //     return fetch("/api/auth-service/auth", requestOptions)
        //     .then(async (response) => {

        //         const data = await response.json()  // data decoding
        //         console.log("Authentication result: ", data);
        //         return data
        //     })
        // }
    }
})