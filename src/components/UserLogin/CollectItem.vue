<template>
    <view class="collect-item">
        <view class="content">
            <new-img v-if="state.imgsrc" :src="state.imgsrc" class="img"></new-img>
            <text class="title">{{ state.title }}</text>
        </view>
    </view>
</template>

<script setup>
import { ref, reactive } from 'vue'
import NewImg from '@/components/image/img'
import { mySelf } from '@/network/index'
const props = defineProps(['cardId'])
const state = reactive({
    imgsrc: null,
    title: '...',
    cardId: null
})

mySelf({ url: '/getCard', data: { id: props.cardId } }).then(res => {
    const { imgsrc, title, _id } = res.data
    state.imgsrc = imgsrc
    state.title = title
    state.cardId = _id
})


</script>

<style lang="scss" scoped>
@use './CollectItem';
</style>

