<template>
    <view class="collect-item">
        <view class="content" :style="{ transform: 'translateX(' + state.translateX + 'px)' }"
            @click="goDetails(state.cardId)" @touchstart="collectItemTouchStart" @touchmove="collectItemTouchMove"
            @touchend="collectItemTouchEnd">
            <image v-if="state.imgsrc" :src="state.imgsrc" class="img" />
            <text class="title">{{ state.title }}</text>
        </view>
        <image @click="store.addFavorite(state.cardId)" :class="['svg', { show: deleteIcon }]"
            src="@/static/images/icons/delete.png" />
    </view>
</template>

<script setup>
import { reactive, nextTick, inject, watchEffect, computed } from 'vue'
import { mySelf } from '@/network/index'
import { goDetails } from '@/BusinessLogic/getUserProfile'
import { useStore } from '@/stores/counter'

const store = useStore()

const moveId = inject('moveItem')
const props = defineProps(['cardId'])
const state = reactive({
    imgsrc: null,
    title: '...',
    cardId: null,
    startX: 0,
    translateX: 0,
})

const deleteIcon = computed(() => state.translateX <= -60)

watchEffect(() => {
    if (moveId.value !== state.cardId)
        state.translateX = 0
})

let timer = null

mySelf({ url: '/getCard', data: { id: props.cardId } }).then(res => {
    const { imgsrc, title, _id } = res.data
    state.imgsrc = imgsrc
    state.title = title
    state.cardId = _id
})

function collectItemTouchStart(e) {
    moveId.value = state.cardId
    state.startX = e.changedTouches[0].clientX
}

function collectItemTouchMove(e) {
    clearTimeout(timer)
    timer = setTimeout(() => {
        let value = e.changedTouches[0].clientX - state.startX
        if (value > 0) {
            state.translateX = 0
            return
        } if (value < -70) {
            state.translateX = -70
            return
        }
        state.translateX = value
    }, 100);
}

function collectItemTouchEnd(e) {
    nextTick(() => {
        clearTimeout(timer)
        const value = e.changedTouches[0].clientX - state.startX
        if (value <= -60) {
            state.translateX = -60
        } else {
            state.translateX = 0
        }
    })
}

</script>

<style lang="scss" scoped>
@use './CollectItem';
</style>

