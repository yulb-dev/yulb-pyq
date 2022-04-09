<template>
    <view class="topbar" :style="{ height: $statusBarHeight + 56 + 'px', paddingTop: $statusBarHeight + 'px' }">
        <image class="img" src="@/static/images/icons/back.png" @click="back"></image>
        <text class="title">Back</text>
    </view>
</template>

<script setup>


function back() {
    uni.navigateBack()
}
</script>

<style lang="scss">
@use './BackBar';
</style>