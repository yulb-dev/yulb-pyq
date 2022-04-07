<template>
    <view class="Myself-not-login">
        <image class="img" src="@/static/images/background/message.png"></image>
        <text class="span">还没登录呢</text>
        <view class='login'>
            <button class="button" @click="getUserProfile">微信登录</button>
        </view>
    </view>
</template>

<script setup>
import { Login } from '@/network/index'
import { useStore } from '@/stores/counter'
// avatar: "https://thirdwx.qlogo.cn/mmopen/vi_32/svQlDRiaQsgM1WMNekxtk2zBfKiaqicb6tyGVPTa1yX4zAH6RWDEicpyAtsHLLjXhKZVpZxBH9eBpleEuoutjB0qlw/132"
// ctime: "2022-04-07T04:57:15.434Z"
// dynamic: []
// fans: []
// favorites: []
// gender: 2
// idol: []
// introduction: "这个人很懒，什么都没写"
// name: "yu老板🏀"
// notes: []
// openid: "016aac3d232dda939eab4d0deec5cd8a3ac97f9e"
// __v: 0
// _id: "624e7501e322a320909625c0"

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
    } catch (error) {
        return
    }

    // try {
    //     await uni.checkSession()
    //     console.log('未过期');

    // } catch (error) {
    //     console.log('session_key已过期');
    // }

    // .catch(async () => {
    //     //session_key过期
    //     console.log('过期');

    // })
}

</script>

<style lang="scss">
@use './NotLogin';
</style>