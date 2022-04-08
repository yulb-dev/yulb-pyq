<template>
    <view class="toTop" @click="$emit('toTop')">
        <image class="svg" src="@/static/images/icons/up.png"></image>
    </view>
</template>

<script setup>
defineEmits(['toTop'])
</script>

<style lang="scss" scoped>
@use './ToTopBar';
</style>