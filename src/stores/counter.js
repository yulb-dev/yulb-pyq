import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { mySelf } from '@/network/index'

const useStore = defineStore('main', () => {
    const userIsLogin = ref(false)
    const user = reactive({
        data: null
    })

    function InitUser(data) {
        try {
            uni.setStorageSync('user_token', data.openid);
        } catch (e) {
            console.log(e);
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
    function becomeIdol(id) {
        const { idol } = user.data
        const i = idol.indexOf(id)
        const data = { userid: user.data._id, idolid: id }
        if (i > -1) {
            idol.splice(i, 1)
            mySelf({ url: '/delIdol', data }).then(({ data }) => {
                if (data.keyValue) {
                    throw (data)
                }
            })
        } else {
            idol.push(id)
            mySelf({ url: '/pushIdol', data }).then(({ data }) => {
                if (data.keyValue) {
                    throw (data)
                }
            })
        }
    }

    return { userIsLogin, user, InitUser, setUser, quit, becomeIdol }
})

export { useStore }