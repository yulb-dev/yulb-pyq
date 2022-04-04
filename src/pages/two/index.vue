<template>
  <view class="content">
    <button @click="saveFile">保存文件</button>
  </view>
</template>

<script setup>
async function saveFile() {
  let { tempFilePaths } = await uni.chooseImage({
    count: 1,
    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
  })
  console.log(tempFilePaths);
  let value = await wx.cloud.uploadFile({
    cloudPath: 'public/test.jpg',
    filePath: tempFilePaths[0],
    config: {
      env: 'prod-6gjaadkm5f538e2a' // 微信云托管环境ID
    },
  })
  console.log(value);
  //"cloud://prod-6gjaadkm5f538e2a.7072-prod-6gjaadkm5f538e2a-1310711794/public/test.jpg"
}
</script>

<style>
</style>
