<template>
    <view class="topbar" :style="{ height: $statusBarHeight + 56 + 'px', paddingTop: $statusBarHeight + 'px' }">
        <image class="img" src="@/static/images/icons/back.png" @click="back"></image>
        <text class="title">Back</text>
    </view>
    <!-- <view :class={
    isborder ? 'topbar isborder' : 'topbar' }>
        <svg t="1622294932600" onClick={this.goBack.bind(this, history)} className="icon" viewBox="0 0 1024 1024"
            version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2867">
            <path
                d="M398.259 312.832V85.348L0.007 483.503 398.259 881.82V648.502c284.4 0 483.565 91.004 625.735 290.15-56.838-284.472-227.502-568.82-625.735-625.82"
                p-id="2868"></path>
        </svg>
        <p>{title}</p>
    </view>-->
</template>

<script setup>


function back() {
    uni.navigateBack()
}
</script>

<style lang="scss">
@use './BackBar';
</style>