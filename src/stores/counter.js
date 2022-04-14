import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { mySelf, Details } from '@/network/index'

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

    function addFavorite(id) {
        const { favorites } = user.data
        const i = favorites.indexOf(id)
        const data = { userid: user.data._id, cardid: id }
        if (i > -1) {
            favorites.splice(i, 1)
            mySelf.post({ url: '/delFavorite', data }).then(({ data }) => {
                if (data.keyValue) {
                    throw (data)
                }
            })
            return -1
        } else {
            favorites.push(id)
            Details.post({ url: '/addfavorite', data }).then(({ data }) => {
                if (data.keyValue) {
                    throw (data)
                }
            })
            return 1
        }
    }

    function addDynamic(carid) {
        user.data.dynamic.push(carid)
    }

    return { userIsLogin, user, InitUser, setUser, quit, becomeIdol, addFavorite, addDynamic }
})

export { useStore }