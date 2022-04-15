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
            uni.showToast({
                title: '取消关注',
                duration: 1000
            });
            mySelf({ url: '/delIdol', data }).then(({ data }) => {
                if (data.keyValue) {
                    throw (data)
                }
            })
        } else {
            uni.showToast({
                title: '已关注',
                duration: 1000
            });
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
            uni.showToast({
                title: '取消收藏',
                duration: 1000
            });
            favorites.splice(i, 1)
            mySelf.post({ url: '/delFavorite', data }).then(({ data }) => {
                if (data.keyValue) {
                    throw (data)
                }
            })
            return -1
        } else {
            uni.showToast({
                title: '添加收藏',
                duration: 1000
            });
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

    async function delDynamic(cardId) {
        const res = await uni.showModal({
            title: '提示',
            content: '确定删除？',
        })
        if (res.confirm) {
            const { data } = await mySelf({ url: '/pullDynamic', data: { id: cardId } })
            if (data.keyValue) {
                throw (data)
            }
            uni.showToast({
                title: '删除成功',
                duration: 1000
            });
            const i = user.data.dynamic.indexOf(cardId)
            user.data.dynamic.splice(i, 1)
        } else if (res.cancel) {
            return
        }
    }

    return { userIsLogin, user, InitUser, setUser, quit, becomeIdol, addFavorite, addDynamic, delDynamic }
})

export { useStore }