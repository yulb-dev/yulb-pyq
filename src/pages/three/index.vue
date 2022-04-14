<template>
  <view class="content" :style="{ paddingTop: $statusBarHeight + 56 + 'px' }">
    <top-logo></top-logo>
    <release v-if="store.userIsLogin"></release>
    <not-login v-else></not-login>
  </view>
</template>

<script setup>
import { useStore } from '@/stores/counter'
import Release from '@/components/Release/Release'
import TopLogo from '@/components/TopLogo/TopLogo'
import NotLogin from '@/components/NotLogin/NotLogin'

const store = useStore()
</script>

<style lang="scss" scoped>
.content {
  height: 100%;
  overflow: hidden;
  background-color: #f9f9ff;
}
</style>
