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
                    cursor-spacing="20" :show-confirm-bar="false" :disable-default-padding="true"
                    @input="introductionChange" :value="state.introduction" />
            </view>
            <view class='submit'>
                <text class="warning">{{ errorPrompt }}</text>
                <button class="button" @click="submit">保存</button>
                <view style="width: 100%;"></view>
                <text class='quit' @click="quit">退出登录</text>
            </view>
        </view>
    </view>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useStore } from '@/stores/counter'
import { Registered } from '@/network/index'
const arr = ['男', '女', '保密']

const store = useStore()
const user = store.user.data
const { avatar, name, introduction, gender } = user
const avatarUrl = avatar

const state = reactive({
    avatar,
    name,
    introduction,
    gender
})

const isOk = computed(() => !(state.name.replace(/\s*/g, "") == ''))
const errorPrompt = computed(() => isOk.value ? '' : '用户名格式有误！')

function chooseImage() {
    uni.chooseMedia({
        count: 1,
        mediaType: ['image'],
        success: function (res) {
            state.avatar = res.tempFiles[0].tempFilePath
        }
    })
}

function onKeyInput(e) {
    state.name = e.target.value
}

function radioChange(e) {
    state.gender = parseInt(e.detail.value)
}

function introductionChange(e) {
    state.introduction = e.detail.value
}

async function submit() {
    if (isOk.value) {
        const data = { ...state }
        const avatar = data.avatar
        if (avatarUrl !== avatar) {
            const url = user._id + avatar.substr(avatar.lastIndexOf('.'))
            const res = await wx.cloud.uploadFile({
                cloudPath: 'public/img/userAvatar/' + url,
                filePath: avatar,
                config: {
                    env: 'prod-6gjaadkm5f538e2a' // 微信云托管环境ID
                },
            })
            const { fileList } = await wx.cloud.getTempFileURL({
                fileList: [res.fileID],
            })
            data.avatar = fileList[0].tempFileURL
        }

        store.setUser(data)
        data.id = user._id

        Registered.post({ url: '/setUp', data }).then((res) => {
            uni.switchTab({
                url: '/pages/four/index'
            })
        })
    } else {
        return
    }
}

async function quit() {
    await uni.removeStorage({
        key: 'user_token',
    });
    store.quit()
    uni.switchTab({
        url: '/pages/four/index'
    })
}

</script>
<style lang="scss">
@use './SettingUser';
</style>