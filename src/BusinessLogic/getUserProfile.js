import { useStore } from '@/stores/counter'
import { Login } from '@/network/index'

const store = useStore()

async function getUserProfile() {
    try {
        const { userInfo } = await uni.getUserProfile({
            desc: '用于获取用户头像、昵称',
        })
        const { code } = await wx.login()
        if (code) {
            const data = {
                name: userInfo.nickName,
                avatar: userInfo.avatarUrl,
                code
            }
            Login.post({ data }).then((res) => {
                store.InitUser(res.data)
            })
        } else {
            console.log('登录失败！' + res.errMsg)
        }
    } catch (err) {
        console.log(err);
        return
    }
}

export { getUserProfile }