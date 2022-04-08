<template>
    <view class="commentItem" @click="goPersonalSpace">
        <img :src="message.userid.avatar" class="avatar" />
        <text class="text">{{ message.userid.name }}</text>
        <text class="span"></text>
        <text class="text">{{ $formatTime(message.ctime) }}</text>
        <text class="content">{{ message.content }}</text>
    </view>
</template>

<script setup>
defineProps({
    message: {
        type: Object,
        required: true
    }
})

function goPersonalSpace() {

}
</script>

<style lang="scss" scoped>
@use './CommentItem';
</style>