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
import { getUserProfile } from "@/BusinessLogic/getUserProfile"
</script>

<style lang="scss">
@use './NotLogin';
</style>