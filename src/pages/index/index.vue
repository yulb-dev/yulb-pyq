<template>
  <view class="content" :style="{ paddingTop: 44 + statusBarHeight + 'px' }">
    <top-logo></top-logo>
    <goods-card-list :cardList="state.cardList" @refresh="refresh"></goods-card-list>
  </view>
</template>

<script setup>
import { reactive, inject } from 'vue'
import TopLogo from '@/components/TopLogo/TopLogo'
import GoodsCardList from '@/components/GoodsCardLIst/GoodsCardLIst'
import { getCardList, isRefresh } from '@/network/home'

getCardList().then((res) => {
  state.cardList = res.data
})

const statusBarHeight = inject('statusBarHeight')
const state = reactive({
  cardList: []
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
