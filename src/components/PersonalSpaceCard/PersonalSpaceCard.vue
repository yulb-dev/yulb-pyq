<template>
    <view class="personalSpaceCard" @click="goDetails(message._id)">
        <new-img class="main-src" :src="message.imgsrc"></new-img>
        <view class="labels">
            <text
                v-for="(item, i) in message.labels"
                class="labelsList_item"
                :key="i"
                @click.stop="goLabelsPage(item)"
            >{{ item }}</text>
        </view>
        <text class="h5">{{ message.title }}</text>
        <text class="content">{{ message.content }}</text>
        <view class="userMessage" @click.stop="toPersonalSpace(_id)">
            <image :src="avatar" class="img" />
            <text class="text">{{ name }}</text>
            <text class="span"></text>
            <text class="text">{{ $formatTime(message.ctime) }}</text>
        </view>
    </view>
</template>

<script setup>
import { toRefs } from 'vue'
import { goDetails, goLabelsPage, toPersonalSpace } from '@/BusinessLogic/getUserProfile'
import NewImg from '@/components/image/img'

const props = defineProps({
    message: {
        type: Object,
        required: true,
    }
})
const { name, avatar, _id } = toRefs(props.message.userid)

</script>

<style lang="scss">
@use './PersonalSpaceCard';
</style>