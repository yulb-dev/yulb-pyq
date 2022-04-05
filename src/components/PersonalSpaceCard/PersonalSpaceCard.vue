<template>
    <view class="personalSpaceCard" @click="goDetails">
        <new-img class="main-src" :src="message.imgsrc"></new-img>
        <view class="labels">
            <text v-for="(item, i) in message.labels" class="labelsList_item" :key="i">{{ item }}</text>
        </view>
        <text class="h5">{{ message.title }}</text>
        <text class="content">{{ message.content }}</text>
        <view class="userMessage">
            <new-img :src="avatar" class="img"></new-img>
            <text class="text">{{ name }}</text>
            <text class="span"></text>
            <text class="text">{{ $formatTime(message.ctime) }}</text>
        </view>
    </view>
</template>

<script setup>
import { toRefs } from 'vue'
import NewImg from '@/components/image/img'

const props = defineProps({
    message: {
        type: Object,
        required: true,
    }
})
const { name, avatar } = toRefs(props.message.userid)
// console.log(props.message);
</script>

<style lang="scss">
@use './PersonalSpaceCard';
</style>