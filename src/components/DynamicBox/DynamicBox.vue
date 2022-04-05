<template>
    <view class="dynamic-box">
        <view class="refresh-box trans">
            <text>热门文章：</text>
            <view class="refresh" @click="DynamicRefresh">
                <image class="refresh_2" src="@/static/images/icons/refresh_2.png"></image>
                <text>换一批</text>
            </view>
        </view>
        <personal-space-card v-for="item in cardList" :message="item" :key="item._id">
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