<template>
    <view class="todo-list">
        <collect-item v-for="item in collectList" :cardId="item" :key="item"></collect-item>
    </view>
</template>

<script setup>
import { ref, provide } from 'vue'
import CollectItem from '@/components/UserLogin/CollectItem'

const index = ref('')
provide('moveItem', index)

defineProps({
    collectList: {
        type: Array,
        required: true
    }
})
</script>

<style lang="scss" scoped>
.todo-list {
    width: 100%;
}
</style>