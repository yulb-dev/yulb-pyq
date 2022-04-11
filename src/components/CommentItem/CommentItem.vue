<template>
    <view class="commentItem" @click="toPersonalSpace(message.userid._id)">
        <img :src="message.userid.avatar" class="avatar" />
        <text class="text">{{ message.userid.name }}</text>
        <text class="span"></text>
        <text class="text">{{ $formatTime(message.ctime) }}</text>
        <text class="content">{{ message.content }}</text>
    </view>
</template>

<script setup>
import { toPersonalSpace } from "@/BusinessLogic/getUserProfile"
defineProps({
    message: {
        type: Object,
        required: true
    }
})

</script>

<style lang="scss" scoped>
@use './CommentItem';
</style>