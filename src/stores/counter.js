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

    function setUser(data) {
        Reflect.ownKeys(data).forEach((key) => user.data[key] = data[key])
    }
    function quit() {
        user.data = null
        userIsLogin.value = false
    }

    return { userIsLogin, user, InitUser, setUser, quit }
})

export { useStore }