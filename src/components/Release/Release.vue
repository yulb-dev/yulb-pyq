<template>
    <view class="addPage">
        <view class="topimg">
            <image @click="chooseMedia" class="img" :src="imgsrc" mode="widthFix" />
        </view>
    </view>
</template>

<script setup>
import { ref } from 'vue'
import uploadPicture from '@/static/images/background/upload-picture.png'

const imgsrc = ref(uploadPicture)

function chooseMedia() {
    uni.chooseMedia({
        count: 1,
        mediaType: ['image'],
        sizeType: ['original', 'compressed'],
        success(res) {
            const path = res.tempFiles[0].tempFilePath
            imgsrc.value = path
        },
        fail(res) {
            console.log(res);
        }
    })
}

</script>

<style lang="scss" scoped>
@use './Release';
</style>