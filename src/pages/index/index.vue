<template>
  <view class="content" :style="{ paddingTop: 44 + statusBarHeight + 'px' }">
    <top-logo></top-logo>
    <goods-card-list :cardList="state.cardList" @refresh="refresh"></goods-card-list>
  </view>
</template>

<script setup>
import { reactive, inject, provide } from 'vue'
import { onShareAppMessage, onLoad } from '@dcloudio/uni-app'
import TopLogo from '@/components/TopLogo/TopLogo'
import GoodsCardList from '@/components/GoodsCardLIst/GoodsCardLIst'
import { getCardList, isRefresh } from '@/network/home'

uni.showLoading({
  title: '',
})

getCardList().then((res) => {
  state.cardList = res.data
  uni.hideLoading();
})

onLoad(({ cardid }) => {
  if (cardid) {
    uni.navigateTo({
      url: 'detailsPage?cardid=' + cardid
    });
  }
})

const statusBarHeight = inject('statusBarHeight')
let cardid = null
let title = null
provide('clickUserId', changeUserId)
const state = reactive({
  cardList: []
})

function changeUserId(id, text) {
  cardid = id
  title = text
}
onShareAppMessage(() => {
  const promise = new Promise((resolve) => {
    let timer = setInterval(() => {
      if (cardid && title) {
        clearInterval(timer)
        resolve({
          title: '分享给你：【' + title + '】，快来看看吧！',
          path: '/pages/index/index?cardid=' + cardid,
        })
      }
    }, 100);
  })
  return {
    title: '自定义转发标题',
    path: '/pages/index/index',
    promise
  }
})

function refresh(value, animationValue, translateY) {
  if (value) {
    isRefresh().then(({ data }) => {
      //数组头部插入
      for (let i = data.length - 1; i >= 0; i--) {
        state.cardList.unshift(data[i])
      }
    })
    setTimeout(() => {
      animationValue.value = ''
      translateY.value = 0
    }, 600);
  }
  else {
    setTimeout(() => {
      isRefresh().then(({ data }) => {
        //数组尾部插入
        for (let i = 0; i < data.length; i++) {
          state.cardList.push(data[i])
        }
        animationValue.value = ''
        translateY.value = 0
      })
    }, 600);
  }
}

</script>

<style lang="scss">
.content {
  height: 100%;
  position: relative;
  background-color: rgb(249, 249, 255);
  padding-top: 44px;
}
</style>
