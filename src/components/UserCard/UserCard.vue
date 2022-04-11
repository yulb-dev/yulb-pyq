<template>
    <view class="UserCard" @click="toPersonalSpace(_id)">
        <view class="left-box">
            <image class="img" :src="avatar" />
            <view class="text">
                <text class="name">{{ name }}</text>
                <text class="span">{{ fans.length }}粉丝</text>
                <text class="span">{{ dynamic.length }}动态</text>
            </view>
        </view>
        <button
            v-if="!isMyself"
            :class="{ noIdol: true, Idol: isIdol }"
            @click.stop="toIdol"
        >{{ isIdol ? '取消关注' : '+关注' }}</button>
    </view>
</template>

<script setup>
import { computed, toRefs } from 'vue'
import { useStore } from '@/stores/counter'
import { getUserProfile, toPersonalSpace } from "@/BusinessLogic/getUserProfile"

const props = defineProps({
    message: {
        type: Object,
        required: true
    }
})

const { name, avatar, _id, fans, dynamic } = toRefs(props.message)
const store = useStore()

const isMyself = computed(() => {
    return store.userIsLogin && store.user.data._id === _id.value
})
const isIdol = computed(() => {
    return store.userIsLogin && store.user.data.idol.indexOf(_id.value) > -1
})

async function toIdol() {
    const id = _id.value
    if (store.userIsLogin) {
        store.becomeIdol(id)
    } else {
        await getUserProfile()
    }
}
</script>

<style lang="scss" scoped>
@use './UserCard';
</style>