import { defineStore } from 'pinia'

// export const authStore = defineStore('authStore', {
//         state: () => ({
//                 accessToken: '', 
//                 exp: 0
//         }),


//         actions: {
//                 setAT(token, exp) {
//                         this.accessToken = token
//                         this.exp = exp
//                 },
//         }
                
// })






// auth.js
export const useAuthStore = defineStore('authStore', {

    state: () => ({
        accessToken: null,
        refreshIntervalId: null,
    
    }),

    actions: {
    // Устанавливаем токен
    setAccessToken(token) {
        this.accessToken = token
        this.startRefreshLoop()
    },

    // Запускаем интервал для автообновления токена
    startRefreshLoop() {
        if (this.refreshIntervalId) return // уже работает

        this.refreshIntervalId = setInterval(() => {
            if (!this.accessToken) return

            const payload = JSON.parse(atob(this.accessToken.split('.')[1])) // декодируем JWT payload
            console.log(payload)

            const expDate = new Date(payload.exp * 1000);
            console.log(expDate.toLocaleString());

            const now = Math.floor(Date.now() / 1000)
            const timeLeft = payload.exp - now

            // Если меньше 30 секунд до истечения — обновляем
            if (timeLeft < 30) {
                this.refreshAccessToken()
            }
        }, 10000) // проверка каждые 10 сек
    },

    // Обновляем access token через API
    async refreshAccessToken() {
        try {
            const res = await fetch('http://localhost/api/auth-service/refresh', {
                method: 'POST',
                credentials: 'include', // чтобы браузер отправил cookie с refresh_token
            })

            if (!res.ok) throw new Error('Refresh failed')

            const data = await res.json()
            console.log(data)
            this.setAccessToken(data.access_token)
            console.log('Access token refreshed')
        } catch (e) {
            console.error('Refresh error:', e)
            // this.logout()
        }
    },

    // Logout и остановка автообновления
    logout() {
        this.accessToken = null
        if (this.refreshIntervalId) {
            clearInterval(this.refreshIntervalId)
            this.refreshIntervalId = null
        }
        // например, редирект:
        window.location.href = '/login'
    }
    }
})