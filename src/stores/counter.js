import { defineStore } from 'pinia'
import { reactive, ref, computed } from 'vue'

const useStore = defineStore('main', () => {
    const userIsLogin = ref(false)
    const user = reactive({
        data: null
    })

    function InitUser(data) {
        try {
            uni.setStorageSync('user_token', data.openid);
        } catch (e) {
            // error
        }
        user.data = data
        userIsLogin.value = true
    }

    return { userIsLogin, user, InitUser }
})

export { useStore }