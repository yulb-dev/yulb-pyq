<template>
    <view class="UserList">
        <back-bar></back-bar>
        <to-top-bar v-show="toTopBarIsShow" @toTop="toTop"></to-top-bar>
        <scroll-view class="UserList-scroll" scroll-y="true" :show-scrollbar="false" :scroll-top="scrollTop"
            scroll-with-animation @scroll="scroll">
            <view class="box" :style="{ paddingTop: $statusBarHeight + 56 + 'px' }">
                <view class="search-bar">
                    <input class="input" @input="inputChange" placeholder="🔍搜索..." />
                </view>
                <user-card v-for="item in UserList" :message="item" :key="item._id" />
            </view>
        </scroll-view>
    </view>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { useStore } from '@/stores/counter'
import { useScroll } from '@/BusinessLogic/Composable'
import { mySelf } from '@/network/index'
import ToTopBar from '@/components/ToTopBar/ToTopBar'
import UserCard from '@/components/UserCard/UserCard'
import BackBar from '@/components/BackBar/BackBar'

const { toTopBarIsShow, scrollTop, toTop, scroll } = useScroll()

const store = useStore()

const state = reactive({
    UserList: [],
    value: ''
})

const UserList = computed(() => state.UserList.filter((item) => item.name.indexOf(state.value) > -1))

onLoad(async (option) => {
    const data = {
        userIdList: store.user.data[option.query]
    }
    const res = await mySelf.post({ url: '/idol', data })
    state.UserList = res.data
})

function inputChange(e) {
    state.value = e.detail.value
}

</script>

<style lang="scss">
@use './UserList';
</style>