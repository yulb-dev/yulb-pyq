<template>
    <view class="label-box">
        <view class="refresh-box">
            <text>热门标签：</text>
            <view class="refresh" @click="$emit('LabelsRefresh')">
                <image class="refresh_2" src="@/static/images/icons/refresh_2.png"></image>
                <text>换一批</text>
            </view>
        </view>
        <text v-for="(item, i) in labelsList" :key="i" class="labelsList_item" @click="goLabelsPage(item.value)">
            {{ item.value }}
        </text>
    </view>
</template>

<script setup>
import { goLabelsPage } from '@/BusinessLogic/getUserProfile'
defineProps({
    labelsList: {
        type: Array,
        required: true
    }
})
defineEmits(['LabelsRefresh'])
</script>

<style lang="scss">
@use './LabelBox';
</style>