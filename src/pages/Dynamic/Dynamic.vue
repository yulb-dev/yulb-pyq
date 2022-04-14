<template>
    <view class='myself-dynamic'>
        <back-bar></back-bar>
        <to-top-bar v-show="toTopBarIsShow" @toTop="toTop"></to-top-bar>
        <scroll-view class="box" scroll-y="true" :show-scrollbar="false" :scroll-top="scrollTop" scroll-with-animation
            @scroll="scroll">
            <view class="content" :style="{ paddingTop: $statusBarHeight + 76 + 'px' }">
                <dynamic-item v-for="item in state.user.data.dynamic" :cardId="item" :key="item" />
            </view>
        </scroll-view>
    </view>
</template>

<script setup>
import { useStore } from '@/stores/counter'
import { useScroll } from '@/BusinessLogic/Composable'
import DynamicItem from '@/components/DynamicItem/DynamicItem'
import BackBar from '@/components/BackBar/BackBar'
import ToTopBar from '@/components/ToTopBar/ToTopBar'

const { toTopBarIsShow, scrollTop, toTop, scroll } = useScroll()

const state = useStore()

</script>

<style lang="scss">
@use './Dynamic';
</style>
