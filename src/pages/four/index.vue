<template>
  <view class="myself" :style="{ paddingTop: $statusBarHeight + 56 + 'px' }">
    <top-logo></top-logo>
    <user-login v-if="store.userIsLogin"></user-login>
    <not-login v-else></not-login>
    <view class="bottom_shadow"></view>
  </view>
</template>

<script setup>
import { useStore } from '@/stores/counter'
import TopLogo from '@/components/TopLogo/TopLogo'
import UserLogin from '@/components/UserLogin/UserLogin'
import NotLogin from '@/components/NotLogin/NotLogin'

const store = useStore()

</script>

<style>
.myself {
  height: 100%;
  overflow: hidden;
  background-color: #f9f9ff;
}
</style>
