<template>
  <view class="content">
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
// async function saveFile() {
//   let { tempFilePaths } = await uni.chooseImage({
//     count: 1,
//     sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
//   })
//   console.log(tempFilePaths);
//   let value = await wx.cloud.uploadFile({
//     cloudPath: 'public/test.jpg',
//     filePath: tempFilePaths[0],
//     config: {
//       env: 'prod-6gjaadkm5f538e2a' // 微信云托管环境ID
//     },
//   })
//   console.log(value);
//   //"cloud://prod-6gjaadkm5f538e2a.7072-prod-6gjaadkm5f538e2a-1310711794/public/test.jpg"
// }
</script>

<style lang="scss" scoped>
.content {
  height: 100%;
  overflow: hidden;
  background-color: #f9f9ff;
}
</style>
