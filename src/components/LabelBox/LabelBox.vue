<template>
    <view class="label-box">
        <view class="refresh-box">
            <text>热门标签：</text>
            <view class="refresh" @click="$emit('LabelsRefresh')">
                <image class="refresh_2" src="@/static/images/icons/refresh_2.png"></image>
                <text>换一批</text>
            </view>
        </view>
        <text v-for="(item, i) in labelsList" :key="i" class="labelsList_item">
            {{ item.value }}
        </text>
    </view>
</template>

<script setup>
defineProps({
    labelsList: {
        type: Array,
        required: true
    }
})
defineEmits(['LabelsRefresh'])

function LabelsRefresh() {
    console.log('刷新标签');
}

function goLabelsPage() {
    console.log('跳转到标签页');
}
</script>

<style lang="scss">
@use './LabelBox';
</style>