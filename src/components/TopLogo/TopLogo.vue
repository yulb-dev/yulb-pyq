<template>
    <view class="topLogo" :style="{ top: statusBarHeight + 'px' }">
        <text class="text">
            <text class="one">P</text>icture
            <text class="one">B</text>looms
        </text>
    </view>
</template>

<script setup>
import { inject } from 'vue'
const statusBarHeight = inject('statusBarHeight')
</script>

<style lang="scss" scoped>
@use './TopLogo';
</style>
