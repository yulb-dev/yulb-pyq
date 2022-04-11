<template>
    <view class="dynamic-box">
        <view class="refresh-box trans">
            <text>热门文章：</text>
        </view>
        <personal-space-card v-for="(item, i ) in cardList" :message="item" :key="item._id + i">
        </personal-space-card>
    </view>
</template>

<script setup>
import PersonalSpaceCard from '@/components/PersonalSpaceCard/PersonalSpaceCard'

defineProps({
    cardList: {
        type: Object,
        required: true
    }
})

function DynamicRefresh() {

}
</script>

<style lang="scss">
@use './DynamicBox';
</style>