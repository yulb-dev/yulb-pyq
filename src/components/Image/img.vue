<template>
    <image :src="state.src" class="imBox-div-img" mode="widthFix" show-menu-by-longpress></image>
</template>

<script setup>
import { reactive } from 'vue'
import src from '@/static/images/background/Loading.png'
const state = reactive({
    src
})
const props = defineProps({
    src: {
        typeof: String,
        required: true,
    }
})
function getImg() {
    if (props.src)
        wx.cloud.getTempFileURL({
            fileList: [props.src], // 文件唯一标识符 cloudID, 可通过上传文件接口获取
            success({ fileList }) {
                state.src = fileList[0].tempFileURL
            },
            fail: console.error
        })
}

getImg()

</script>

<style lang="scss" scoped>
.imBox-div-img {
    display: block;
    width: 100%;
    border-radius: 20px;
}
</style>