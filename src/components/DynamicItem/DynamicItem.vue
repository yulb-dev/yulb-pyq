<template>
    <view :class="state.isDel ? 'isDel' : 'outBox'">
        <view class='dynamicItem'>
            <view class='dynamicItem-top' @click="goDetails(state._id)">
                <view class="left">
                    <image class="img" :src="state.imgsrc" mode="widthFix"></image>
                </view>
                <text class="title">{{ state.title }}</text>
                <text class="time">{{ $formatTime(state.ctime) }}</text>
            </view>
            <view class='dynamicItem-center'>
                <image class="svg" src="@/static/images/icons/collet.png" />
                <text>{{ state.likesnum }}</text>
                <image class="svg" src="@/static/images/icons/comment.png" />
                <text>{{ state.comment?.length }}</text>
            </view>
            <view class='dynamicItem-bottom'>
                <text class="btn" @click="goEditPage">编辑</text>
                <text class="btn" @click="store.delDynamic(state._id)">删除</text>
            </view>
        </view>
    </view>
</template>

<script setup>
import { reactive, inject, watch } from 'vue'
import { mySelf } from '@/network/index';
import { goDetails } from '@/BusinessLogic/getUserProfile'
import { useStore } from '@/stores/counter'

const store = useStore()

const data = inject('Release')
const ModifiedarticleId = inject('ModifiedarticleId')

const props = defineProps({
    cardId: {
        type: String,
        required: true
    }
})
const state = reactive({
    isdel: false
})

watch(ModifiedarticleId, (newValue) => {
    if (newValue === state._id)
        init()
})

function init() {
    mySelf({ url: '/dynamic', data: { id: props.cardId } }).then(({ data }) => {
        Reflect.ownKeys(data).forEach(key => state[key] = data[key])
    })
}
init()

function goEditPage() {
    let { imgsrc, title, content, labels, _id } = state
    labels = [...labels]
    data.message = {
        imgsrc,
        title,
        content,
        labels,
        _id
    }
    uni.navigateTo({
        url: '/pages/four/Release?oldImgsrc=' + imgsrc,
    });
}
</script>

<style lang="scss" scoped>
@use './DynamicItem';
</style>