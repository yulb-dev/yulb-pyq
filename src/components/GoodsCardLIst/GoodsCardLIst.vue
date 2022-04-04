<template>
    <view class="GoodsCardLIst" @touchstart="GoodsCardLIstTouchStart" @touchend="GoodsCardLIstTouchEnd"
        @touchmove="GoodsCardLIstTouchMove">
        <view class="GoodsCardBOx" id="GoodsCardBOx"
            :style="{ transform: 'translateY(' + translateY + 'px)', top: MyGoodsCardBOxTop + 'px' }">
            <view class='refreshBox'>
                <image src="@/static/images/icons/refresh.png" class="img" :style="{ animation: upBoxanimationValue }">
                </image>
                <text>松开刷新...</text>
            </view>
            <goods-card v-for="(item, i) in cardList" :message="item" :key="item._id + i">
            </goods-card>
            <view class='refreshBox'>
                <image src="@/static/images/icons/refresh.png" class="img" :style="{ animation: animationValue }">
                </image>
                <text>松开刷新...</text>
            </view>
        </view>
    </view>
</template>
<script setup>
import { ref, computed, inject } from 'vue'
import GoodsCard from "@/components/GoodsCardList/GoodsCard"

const windowHeight = inject('windowHeight')
const statusBarHeight = inject('statusBarHeight')

const props = defineProps({
    cardList: {
        type: Array,
        required: true
    }
})
const emit = defineEmits(['refresh'])

const startY = ref(0)
const translateY = ref(0)
const endY = ref(0)
const MyGoodsCardBOxTop = ref(-50)
const animationValue = ref('')
const upBoxanimationValue = ref('')
let page = 0 //当前第几个卡片

const cardLength = computed(() => props.cardList.length)


function GoodsCardLIstTouchStart(e) {
    startY.value = e.changedTouches[0].clientY
}

function GoodsCardLIstTouchEnd(e) {
    if (startY.value - e.changedTouches[0].clientY >= 60) {
        //上拉刷新
        if (page === cardLength.value - 1) {
            animationValue.value = 'turn 1s linear infinite'
            emit("refresh", 0, animationValue, translateY)
            return
        }
        else {
            const mcbclientHeight = windowHeight - (44 + statusBarHeight + 16 + 18)
            MyGoodsCardBOxTop.value = (-mcbclientHeight - 18) * ++page - 50
        }
    } else if (startY.value - e.changedTouches[0].clientY <= -60) {
        //下拉刷新
        if (page === 0) {
            upBoxanimationValue.value = 'turn 1s linear infinite'
            emit("refresh", 1, upBoxanimationValue, translateY)
            return;
        }
        else {
            const mcbclientHeight = windowHeight - (44 + statusBarHeight + 16 + 18)
            MyGoodsCardBOxTop.value = (-mcbclientHeight - 18) * --page - 50
        }
    }
    translateY.value = 0

}

function GoodsCardLIstTouchMove(e) {
    translateY.value = e.changedTouches[0].clientY - startY.value
    endY = e.changedTouches[0].clientY
}
</script>

<style lang="scss">
@use './GoodsCardLIst';
</style>