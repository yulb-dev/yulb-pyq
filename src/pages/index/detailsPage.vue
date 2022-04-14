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
                            <text v-for="(item, i) in state.labels" :key="i" class="labels" @click="goLabelsPage(item)">
                                {{
                                    item
                                }}
                            </text>
                            <text class="h4">{{ state.title }}</text>
                            <view class="useravatar" v-if="state.userid" @click="toPersonalSpace(state.userid._id)">
                                <image :src="state.userid.avatar" class="avatar" />
                                <text class="useravatar-text">{{ state.userid.name }}</text>
                                <text class="span"></text>
                                <text class="useravatar-text">{{ $formatTime(state.ctime) }}</text>
                                <button :style="{ display: isMyself ? 'none' : 'flex' }" :class="{ isIdol }"
                                    @click.stop="toIdol">{{ isIdol ? '已关注' : '关注' }}</button>
                            </view>
                        </view>
                        <view class="text">
                            <text class="text-content">{{ state.content }}</text>
                        </view>
                    </view>
                    <view class='btnicon'>
                        <image @click="addFavorite" class="svg" :src="isFavorite ? collet : not_collet"></image>
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
                    <comment-item v-for="item in state.comments" :key="item._id" :message="item">
                    </comment-item>
                </view>
            </view>
        </scroll-view>
        <view :class="['post_comment', { post_comment_change: isChange }]">
            <textarea :class="['textarea', { textarea_change: isChange }]" placeholder-class="placeholder-class"
                placeholder="发一条友善的评论" auto-height :show-confirm-bar="false" cursor-spacing="20" hold-keyboard
                @linechange="linechange" @input="changeComment" />
            <text class="release" @click="addComment">发布</text>
        </view>
    </view>
</template>

<script setup>
import { reactive, computed, ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { useStore } from '@/stores/counter'
import { Details } from '@/network/index'
import { getUserProfile, toPersonalSpace } from "@/BusinessLogic/getUserProfile"
import { useScroll } from '@/BusinessLogic/Composable'
import BackBar from '@/components/BackBar/BackBar'
import ToTopBar from '@/components/ToTopBar/ToTopBar'
import NewImg from '@/components/image/img'
import CommentItem from '@/components/CommentItem/CommentItem'
import not_collet from '@/static/images/icons/not_collet.png'
import collet from '@/static/images/icons/collet.png'

const { toTopBarIsShow, scrollTop, toTop, scroll } = useScroll()

const state = reactive({})
const isChange = ref(false)
let content = ''
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


onLoad(async (option) => {
    const res = await Details({ url: '/getMessage', data: { id: option.cardid } })
    const { card, comments } = res.data
    if (!card.notdel) {
        //提示文章已删除
        uni.navigateBack()
        return
    }
    Reflect.ownKeys(card).forEach((key) => state[key] = card[key])
    state.comments = comments
})
function goLabelsPage(label) {
    uni.navigateTo({
        url: '../LabelsPage/labelsPage?label=' + label
    });
}

async function toIdol() {
    const id = state.userid._id
    if (store.userIsLogin) {
        store.becomeIdol(id)
    } else {
        await getUserProfile()
    }
}

async function addFavorite() {
    const id = state._id
    if (store.userIsLogin) {
        let num = store.addFavorite(id)
        state.likesnum += num
    } else {
        await getUserProfile()
    }
}

function linechange(e) {
    const { lineCount } = e.detail
    isChange.value = lineCount > 1
}

function changeComment(e) {
    const { value } = e.detail
    content = value
}

function addComment() {
    if (content.replace(/\s*/g, "") == '') {
        return
    }
    const { name, avatar, _id } = store.user.data
    let data = {
        userid: _id,
        content: content,
        cardid: state._id
    }
    Details.post({ url: '/addcomment', data }).then(({ data }) => {
        data.userid = {
            name,
            avatar,
            _id
        }
        state.comments.unshift(data)
    })
}

</script>

<style lang="scss" scoped>
@use './detailsPage';
</style>