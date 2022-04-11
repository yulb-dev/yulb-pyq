<template>
    <view class="SearchPage">
        <back-bar></back-bar>
        <to-top-bar v-show="toTopBarIsShow" @toTop="toTop"></to-top-bar>
        <scroll-view
            scroll-y="true"
            class="scroll"
            @scrolltolower="scrolltolower"
            :scroll-top="scrollTop"
            scroll-with-animation
            @scroll="scroll"
        >
            <view class="SearchPage-main" :style="{ paddingTop: $statusBarHeight + 80 + 'px' }">
                <search-bar @clickButton="startSearch" :defaultValue="value"></search-bar>
                <view class="toggle-bar">
                    <text
                        v-for="(item, i) in toggleArr"
                        :key="item"
                        @click="toggleIndex = i"
                        :class="{ text: true, toggleActive: toggleIndex === i }"
                    >{{ item }}</text>
                </view>
                <view class="result-box">
                    <view v-show="toggleIndex === 0" class="marginTop">
                        <personal-space-card
                            v-for="item in state.articleList"
                            :key="item._id"
                            :message="item"
                        />
                    </view>
                    <view v-show="toggleIndex === 1" class="marginTop">
                        <personal-space-card
                            v-for="item in state.cardList"
                            :key="item._id"
                            :message="item"
                        />
                    </view>
                    <view v-show="toggleIndex === 2">
                        <user-card v-for="item in state.userList" :message="item" :key="item._id" />
                    </view>
                </view>
            </view>
        </scroll-view>
    </view>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { DiscoverPage } from "@/network/index"
import { useScroll } from '@/BusinessLogic/Composable'
import ToTopBar from '@/components/ToTopBar/ToTopBar'
import BackBar from '@/components/BackBar/BackBar'
import SearchBar from '@/components/SearchBar/SearchBar'
import PersonalSpaceCard from '@/components/PersonalSpaceCard/PersonalSpaceCard'
import UserCard from '@/components/UserCard/UserCard'

const { toTopBarIsShow, scrollTop, toTop, scroll } = useScroll()

const value = ref('')
const toggleIndex = ref(0)
const toggleArr = ['文章', '标签', '用户']

const state = reactive({})

onLoad((option) => {
    value.value = option.value
    const data = {
        name: option.value
    }
    DiscoverPage({ url: '/getUser', data }).then(({ data }) => {
        Reflect.ownKeys(data).forEach(key => state[key] = data[key])
    })
})

function startSearch(value) {
    const data = {
        name: value
    }
    DiscoverPage({ url: '/getUser', data }).then(({ data }) => {
        Reflect.ownKeys(data).forEach(key => state[key] = data[key])
    })
}
</script>

<style lang="scss" scoped>
@use './SearchPage';
</style>