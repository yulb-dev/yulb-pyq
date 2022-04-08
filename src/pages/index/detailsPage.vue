<template>
    <view class="detailsPage">
        <back-bar></back-bar>
        <to-top-bar v-show="toTopBarIsShow" @toTop="toTop"></to-top-bar>
        <scroll-view class="box" scroll-y="true" :show-scrollbar="false" :scroll-top="scrollTop" scroll-with-animation
            @scroll="scroll">
            <view style="padding: 0 15px;">
                <view class="content">
                    <view class="box2">
                        <view class="img">
                            <new-img :src="state.imgsrc" class="img"></new-img>
                        </view>
                        <view class="title">
                            <text v-for="(item, i) in state.labels" :key="i" class="labels" @click="goLabelsPage">
                                {{
                                    item
                                }}
                            </text>
                            <text class="h4">{{ state.title }}</text>
                            <view class="useravatar" v-if="state.userid">
                                <image :src="state.userid.avatar" class="avatar" />
                                <text class="useravatar-text">{{ state.userid.name }}</text>
                                <text class="span"></text>
                                <text class="useravatar-text">{{ $formatTime(state.ctime) }}</text>
                                <button :style="{ display: isMyself ? 'none' : 'flex' }" :class="{ isIdol }"
                                    @click="toIdol">{{ isIdol ? '已关注' : '关注' }}</button>
                            </view>
                        </view>
                        <view class="text">
                            <text class="text-content">{{ state.content }}</text>
                        </view>
                    </view>
                    <view class='btnicon'>
                        <image class="svg" :src="isFavorite ? collet : not_collet"></image>
                        <text :class="{ noFavorite: !isFavorite }">{{ state.likesnum }}</text>
                        <image class="svg" src="@/static/images/icons/comment.png"></image>
                        <text>{{ state.comments?.length }}</text>
                    </view>
                </view>
            </view>
            <view class='comments'>
                <view class='comments-box'>
                    <view class='title'>
                        <text class="h5">{{ state.comments?.length }} 评论</text>
                    </view>
                    <comment-item v-for="item in state.comments" :key="item._id" :message="item"></comment-item>
                    <!-- 
                    <view class='post-comment'>
                        <h5>发表评论</h5>
                        <p>在这里发表你的评论</p>
                        <view>
                            <textarea cols='30' row='5' name='message' value={value}
                                onChange={this.valueChange.bind(this)} placeholder='说点什么...' maxLength='100'></textarea>
                        </view>
                        <button onClick={this.postAcomment.bind(this)}>发表评论</button>
                    </view> -->
                </view>
            </view>
        </scroll-view>
    </view>
</template>

<script setup>
import { reactive, computed, ref, nextTick } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { useStore } from '@/stores/counter'
import { Details } from '@/network/index'
import BackBar from '@/components/BackBar/BackBar'
import ToTopBar from '@/components/ToTopBar/ToTopBar'
import NewImg from '@/components/image/img'
import CommentItem from '@/components/CommentItem/CommentItem'
import not_collet from '@/static/images/icons/not_collet.png'
import collet from '@/static/images/icons/not_collet.png'

const state = reactive({})
const toTopBarIsShow = ref(false)
const scrollTop = ref(0)
const oldScrollTop = ref(0)
const store = useStore()
const isMyself = computed(() => {
    return store.userIsLogin && store.user.data._id === state.userid?._id
})
const isIdol = computed(() => {
    return store.userIsLogin && store.user.data.idol.indexOf(state.userid?._id) > -1
})
const isFavorite = computed(() => {
    return store.userIsLogin && store.user.data.favorites.indexOf(state._id) > -1
})

let timer = null

onLoad(async (option) => {
    const res = await Details({ url: '/getMessage', data: { id: option.cardid } })
    const { card, comments } = res.data
    if (!card.notdel) {
        //提示文章已删除
        uni.switchTab({
            url: '/pages/four/index'
        })
        return
    }
    Reflect.ownKeys(card).forEach((key) => state[key] = card[key])
    state.comments = comments
})

function toTop() {
    scrollTop.value = oldScrollTop.value
    nextTick(() => {
        scrollTop.value = 0
    });
}

function goLabelsPage() {

}

function scroll(e) {
    nextTick(() => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            oldScrollTop.value = e.detail.scrollTop
            toTopBarIsShow.value = e.detail.scrollTop >= 300 ? true : false
        }, 100);
    })
}
function toIdol() {

}
</script>

<style lang="scss" scoped>
@use './detailsPage';
</style>