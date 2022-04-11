<template>
    <view class="search-bar">
        <input class="input" type="text" placeholder="你在找什么?" @input="input" :value="defaultValue" />
        <button class="button" @click="clickButton">搜索🔍</button>
    </view>
</template>

<script setup>
defineProps({
    defaultValue: {
        type: String,
        default: ''
    }
})
const emits = defineEmits(['clickButton'])
let value = ''
function input(e) {
    value = e.detail.value
}
function clickButton() {
    if (value.replace(/\s*/g, "") == '') return
    emits('clickButton', value)
}
</script>

<style lang="scss">
@use './SearchBar';
</style>