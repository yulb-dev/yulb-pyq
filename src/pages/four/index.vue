<template>
  <view class="myself" :style="{ paddingTop: $statusBarHeight + 56 + 'px' }">
    <top-logo></top-logo>
    <not-login></not-login>
  </view>
</template>

<script setup>
import TopLogo from '@/components/TopLogo/TopLogo'
import NotLogin from '@/components/NotLogin/NotLogin'
</script>

<style>
.myself {
  height: 100%;
  background-color: #f9f9ff;
}
</style>
