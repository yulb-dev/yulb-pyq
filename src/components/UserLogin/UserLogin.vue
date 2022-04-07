<template>
    <view class="Myself-login">
        <view class="myself-main">
            <view class="main-information" @click="goSetting">
                <image class="img" :src="avatar"></image>
                <text class="name">{{ name }}</text>
                <text class="introduction">{{ introduction }}</text>
            </view>
            <view class='other-information'>
                <view class="box" @click="goDynamic">
                    <text class="one">{{ dynamic.length }}</text>
                    <text class="two">动态</text>
                </view>
                <view class="box" @click="goIdol">
                    <text class="one">{{ idol.length }}</text>
                    <text class="two">关注</text>
                </view>
                <view class="box" @click="goFans">
                    <text class="one">{{ fans.length }}</text>
                    <text class="two">粉丝</text>
                </view>
            </view>
            <view class='sticky-note'>
                <view class='sticky-note-top'>
                    <view class='left'>
                        <image class="img" src="@/static/images/icons/collet.png"></image>
                        <text>我的收藏</text>
                    </view>
                    <view class='right'>
                        <text>[{{ favorites.length }}]</text>
                    </view>
                </view>
                <collect-card :collectList="favorites"></collect-card>
            </view>
        </view>
    </view>
</template>

<script setup>
import CollectCard from '@/components/UserLogin/CollectCard'
import { toRefs } from 'vue'
import { useStore } from '@/stores/counter'

const store = useStore()
const { avatar, name, introduction, dynamic, idol, fans, favorites } = toRefs(store.user.data)

function goSetting() {
    setTimeout(() => {
        uni.navigateTo({
            url: 'SettingUser'
        });
    }, 100)
}

function goDynamic() {

}

function goIdol() {

}

function goFans() {

}

</script>

<style lang="scss">
@use './UserLogin';
</style>