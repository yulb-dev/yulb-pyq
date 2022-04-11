<template>
    <view class="GoodsCard" @click="goDetails(message._id)">
        <view class="box">
            <view class="imgBox">
                <view class="imBox-div">
                    <new-img :src="message.imgsrc" class="imBox-div-img"></new-img>
                </view>
            </view>
            <view class="cardLabels">
                <text v-for="(item, index) in message.labels" :style="{ backgroundColor: color[index] }"
                    @click.stop="goLabelsPage(item)" :key="index" class="cardLabels-text">{{ item }}</text>
                <text style="color:rgb(83, 83, 83);" class="cardLabels-text">{{
                    $formatTime(props.message.ctime)
                }}</text>
            </view>
            <text class="cardTitle">{{ message.title }}</text>
            <text class="cardContent">{{ message.content }}</text>
            <view class="cardLikes">
                <image class="img" src="@/static/images/icons/collet.png"></image>
                <text>{{ message.likesnum }}</text>
                <image class="img" src="@/static/images/icons/comment.png"></image>
                <text>{{ message.comment.length }}</text>
            </view>
            <view class='cardBto' @click="stop">
                <view class="left">
                    <button class="btn" open-type="share" @click.stop="stop">
                        <image src="@/static/images/icons/share.png" class="icon"></image>
                        <text> 分享</text>
                    </button>
                </view>
                <view class="right" v-if="state.message.useravatar" @click.stop="toPersonalSpace(message.userid)">
                    <text> 来自于</text>
                    <text class="separate"></text>
                    <p>{{ state.message.username }}</p>
                    <new-img :src="state.message.useravatar" class="right-img"></new-img>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup>
import { reactive, inject } from 'vue'
import { getUserMessage } from '@/network/home'
import { toPersonalSpace, goDetails, goLabelsPage } from "@/BusinessLogic/getUserProfile"
import { useStore } from '@/stores/counter'
import NewImg from '@/components/image/img'

const store = useStore()
const clickUserId = inject('clickUserId')

const props = defineProps({
    message: {
        type: Object,
        required: true
    }
})

const state = reactive({
    message: {
        useravatar: null,
        username: null
    }
})

const color = ['#36a08a', '#5db4c7', '#e52e2e', "#506172"]

getUserMessage(props.message.userid).then(({ data }) => {
    state.message = data
})

function stop() {
    clickUserId(props.message._id, props.message.title)
}
</script>
<style lang="scss">
@use './GoodsCard';
</style>