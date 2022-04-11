<template>
    <view class="PersonalSpace">
        <back-bar></back-bar>
        <to-top-bar v-show="toTopBarIsShow" @toTop="toTop"></to-top-bar>
        <scroll-view
            class="scroll"
            scroll-y="true"
            :show-scrollbar="false"
            :scroll-top="scrollTop"
            scroll-with-animation
            @scroll="scroll"
        >
            <view class="Personal-information">
                <image class="img" :src="state.avatar" />
                <view class="name">
                    <text class="h6">{{ state.name }}</text>
                    <image
                        class="name-img"
                        :src="'../../static/images/icons/gender_' + state.gender + '.png'"
                    />
                </view>
                <view class="personlabels">
                    <span class="labelsList_item">{{ state.dynamic?.length }}动态</span>
                    <span class="labelsList_item">{{ state.idol?.length }}关注</span>
                    <span class="labelsList_item">{{ state.fans?.length }}粉丝</span>
                </view>
                <text class="introduction">{{ state.introduction }}</text>
            </view>
            <view class="personal-space-card">
                <personal-space-card v-for="item in dynamicList" :message="item" :key="item._id" />
            </view>
        </scroll-view>
    </view>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { useScroll } from '@/BusinessLogic/Composable'
import { PersonalSpace } from '@/network/index'
import BackBar from '@/components/BackBar/BackBar'
import PersonalSpaceCard from '@/components/PersonalSpaceCard/PersonalSpaceCard'
import ToTopBar from '@/components/ToTopBar/ToTopBar'

const { toTopBarIsShow, scrollTop, toTop, scroll } = useScroll()

const state = reactive({
    gender: 2,
    dynamicList: []
})

onLoad(async ({ userid }) => {
    const data = {
        id: userid
    }
    let res = await PersonalSpace({ data })
    if (res.data.keyValue) {
        throw data
    }
    const { user, dynamicList } = res.data
    Reflect.ownKeys(user).forEach((key) => state[key] = user[key])
    state.dynamicList = dynamicList
})

const dynamicList = computed(() => state.dynamicList.map((item) => {
    item.userid = {
        name: state.name,
        avatar: state.avatar
    }
    return item
}))
</script>

<style lang="scss" scoped>
@use './UserHome';
</style>