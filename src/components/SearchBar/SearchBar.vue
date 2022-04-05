<template>
    <view class="search-bar" @click="goSearchPage">
        <input class="input" type="text" placeholder="你在找什么?" />
        <button class="button">搜索🔍</button>
    </view>
</template>

<script setup>
function goSearchPage() {
    console.log('跳转到goSearchPage');
}
</script>

<style lang="scss">
@use './SearchBar';
</style>