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

async function getUserProfile() {
    try {
        const { userInfo } = await uni.getUserProfile({
            desc: '用于获取用户头像、昵称',
        })
        const { code } = await wx.login()
        if (code) {
            console.log(userInfo);
            const data = {
                name: userInfo.nickName,
                avatar: userInfo.avatarUrl,
                code
            }
            Login.post({ data }).then((res) => {
                console.log(res.data);
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