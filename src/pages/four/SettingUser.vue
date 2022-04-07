<template>
    <view class="setUp">
        <view class="context">
            <view class="file">
                <image class="img" :src="state.avatar"></image>
                <text class="hint" @click="chooseImage">点击修改头像</text>
            </view>
            <view class='message'>
                <text class="name">姓名：</text>
                <input id='name' type='text' name='name' @input="onKeyInput" @blur="inputBlur" :value="state.name" />
            </view>
            <view class="radio-box">
                <text>性别：</text>
                <radio-group @change="radioChange" class="radio-group">
                    <label class="label" v-for="(item, i) in arr" :key="item">
                        <radio class="radio" :value="i" :checked="state.gender === i" color="#00d3c1" /> {{
                            item
                        }}
                    </label>
                </radio-group>
            </view>
            <view class='introduction'>
                <text class="text">简介</text>
                <textarea id="introduction" name="introduction" rows="5" cols="33" maxLength="60" spellCheck='true'
                    @input="introductionChange" :value="state.introduction" />
            </view>
            <button @click="show"></button>
            <!-- 
                
                <view className='submit'>
                    <p>{this.state.errorPrompt}</p>
                    <button onClick={this.submit.bind(this)}>确定</button>
                </view>
                <p className='quit' onClick={this.quit.bind(this)}>退出</p>
            </view>-->
        </view>
    </view>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useStore } from '@/stores/counter'
const arr = ['男', '女', '保密']

const store = useStore()
const user = store.user.data
const { avatar, name, introduction, gender } = user

const state = reactive({
    avatar,
    name,
    introduction,
    gender
})
const errorPrompt = ref('')

function chooseImage() {
    uni.chooseMedia({
        count: 1,
        mediaType: ['image'],
        success: function (res) {
            console.log(res.tempFiles[0].tempFilePath);
            state.avatar = res.tempFiles[0].tempFilePath
        }
    })
}

function onKeyInput(e) {
    state.name = e.target.value
}
function inputBlur() {
    if (!/^[a-zA-Z0-9_-]{4,16}$/.test(state.name)) {
        errorPrompt.value = "用户名格式有误"
        return
    }
    errorPrompt.value = ''
}

function radioChange(e) {
    state.gender = parseInt(e.detail.value)
}

function show() {
    console.log({
        avatar: state.avatar,
        name: state.name,
        introduction: state.introduction,
        gender: state.gender
    });
}

function introductionChange(e) {
    state.introduction = e.detail.value
}

</script>
<style lang="scss">
@use './SettingUser';
</style>