<template>
    <view class="labels-page">
        <back-bar></back-bar>
        <to-top-bar v-show="toTopBarIsShow" @toTop="toTop"></to-top-bar>
        <scroll-view
            class="box"
            scroll-y="true"
            :show-scrollbar="false"
            :scroll-top="scrollTop"
            scroll-with-animation
            @scroll="scroll"
        >
            <text class="h3" :style="{ paddingTop: $statusBarHeight + 56 + 25 + 'px' }">
                标签：
                <text class="span">{{ state.label }}</text>
            </text>
            <card v-for="item in state.cardList" :key="item._id" :message="item" />
        </scroll-view>
    </view>
</template>

<script setup>
import { reactive } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { PersonalSpace } from '@/network/index'
import { useScroll } from '@/BusinessLogic/Composable'
import BackBar from "@/components/BackBar/BackBar"
import ToTopBar from '@/components/ToTopBar/ToTopBar'
import Card from '@/components/PersonalSpaceCard/PersonalSpaceCard'

const { toTopBarIsShow, scrollTop, toTop, scroll } = useScroll()

const state = reactive({
    label: '',
    cardList: []
})

onLoad(({ label }) => {
    state.label = label
    const data = {
        labels: label
    }
    PersonalSpace({ url: '/getLabelsInfo', data }).then(({ data }) => {
        if (data.keyValue) {
            throw data
        }
        state.cardList = data
    })
})



</script>

<style lang="scss" scoped>
@use './labelsPage';
</style>