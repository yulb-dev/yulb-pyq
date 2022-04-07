<template>
    <view class="todo-list">
        <collect-item v-for="item in collectList" :cardId="item" :key="item"></collect-item>
    </view>
</template>

<script setup>
import CollectItem from '@/components/UserLogin/CollectItem'

const props = defineProps({
    collectList: {
        type: Array,
        required: true
    }
})
</script>

<style lang="scss" scoped>
.todo-list {
    width: 100%;
    border: 1px solid rgb(114, 114, 114);
}
</style>