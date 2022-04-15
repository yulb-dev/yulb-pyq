<template>
  <view class="discover-page">
    <top-logo></top-logo>
    <to-top-bar v-show="toTopBarIsShow" @toTop="toTop"></to-top-bar>
    <scroll-view scroll-y="true" class="scroll-Y" @scrolltolower="scrolltolower" :scroll-top="scrollTop"
      scroll-with-animation @scroll="scroll">
      <view class="top" :style="{ paddingTop: $statusBarHeight + 80 + 'px' }">
        <search-bar @clickButton="goSearchPage"></search-bar>
        <label-box :labelsList="state.labelsList" @LabelsRefresh="LabelsRefresh"></label-box>
      </view>
      <dynamic-box :cardList="state.cardList"></dynamic-box>
    </scroll-view>
    <view class="bottom_shadow"></view>
  </view>
</template>

<script setup>
import { reactive } from 'vue'
import { discoverPage } from '@/network/index'
import { useScroll } from '@/BusinessLogic/Composable'
import TopLogo from '@/components/TopLogo/TopLogo'
import ToTopBar from '@/components/ToTopBar/ToTopBar'
import SearchBar from '@/components/SearchBar/SearchBar'
import LabelBox from '@/components/LabelBox/LabelBox'
import DynamicBox from '@/components/DynamicBox/DynamicBox'

const { toTopBarIsShow, scrollTop, toTop, scroll } = useScroll()

uni.showLoading({ title: '' });
discoverPage().then(({ data }) => {
  state.cardList = data.cardList
  state.labelsList = data.labelsList
  uni.hideLoading();
}, console.error)


const state = reactive({
  cardList: [],
  labelsList: []
})

function goSearchPage(value) {
  uni.navigateTo({
    url: 'SearchPage?value=' + value
  });
}

function LabelsRefresh() {
  discoverPage().then(({ data }) => {
    state.labelsList = data.labelsList
  }, console.error)
}

function scrolltolower() {
  discoverPage().then(({ data }) => {
    Array.prototype.push.apply(state.cardList, data.cardList)
  }, console.error)
}
</script>

<style lang="scss" scoped>
.discover-page {
  width: 100%;
  height: 100%;
  background-color: rgb(249, 249, 255);

  .top {
    width: 100%;
    padding: 0 30px;
  }
}

.scroll-Y {
  height: 100%;
}
</style>
