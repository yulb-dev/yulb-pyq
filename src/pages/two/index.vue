<template>
  <view class="discover-page">
    <top-logo></top-logo>
    <scroll-view scroll-y="true" class="scroll-Y">
      <view class="top" :style="{ paddingTop: $statusBarHeight + 80 + 'px' }">
        <search-bar></search-bar>
        <label-box :labelsList="state.labelsList" @LabelsRefresh="LabelsRefresh"></label-box>
      </view>
      <dynamic-box :cardList="state.cardList" @DynamicRefresh="DynamicRefresh"></dynamic-box>
    </scroll-view>
    <view class="bottom_shadow"></view>
  </view>
</template>

<script setup>
import { reactive } from 'vue'
import TopLogo from '@/components/TopLogo/TopLogo'
import SearchBar from '@/components/SearchBar/SearchBar'
import LabelBox from '@/components/LabelBox/LabelBox'
import DynamicBox from '@/components/DynamicBox/DynamicBox'
import { discoverPage } from '@/network/index'

discoverPage().then(({ data }) => {
  state.cardList = data.cardList
  state.labelsList = data.labelsList
}, console.error)


const state = reactive({
  cardList: [],
  labelsList: []
})


function LabelsRefresh() {
  discoverPage().then(({ data }) => {
    state.labelsList = data.labelsList
  }, console.error)
}

function DynamicRefresh() {

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
