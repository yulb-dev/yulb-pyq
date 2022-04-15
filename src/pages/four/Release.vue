<template>
    <release @editArticle="editArticle" :isReleasePage="true" />
</template>

<script setup>
import { inject } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { Registered } from '@/network/index'
import { useStore } from '@/stores/counter'
import Release from '@/components/Release/Release'

const ModifiedarticleId = inject('ModifiedarticleId')

const store = useStore()

let oldImgsrc = null

onLoad((option) => {
    oldImgsrc = option.oldImgsrc
})

async function editArticle(data) {
    if (data.imgsrc !== oldImgsrc) {
        wx.cloud.deleteFile({
            fileList: [oldImgsrc],
            config: {
                env: 'prod-6gjaadkm5f538e2a' // 微信云托管环境ID
            },
        })
    }
    const res = await Registered.post({ url: '/editCard', data })
    ModifiedarticleId.value = res.data._id
    uni.hideLoading();
    uni.redirectTo({
        url: '/pages/index/detailsPage?cardid=' + res.data._id
    });
}
</script>