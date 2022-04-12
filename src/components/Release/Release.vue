<template>
    <scroll-view
        scroll-y="true"
        class="addPage"
        :scroll-top="scrollTop"
        scroll-with-animation
        @scroll="scroll"
    >
        <view class="addPage-box" :style="{ paddingTop: $statusBarHeight + 56 + 'px' }">
            <view class="topimg">
                <image @click="chooseMedia" class="img" :src="imgsrc" mode="widthFix" />
            </view>
            <view class="form-content">
                <view class="labels-box">
                    <view class="top">
                        <text class="labels-title">标签</text>
                    </view>
                    <view class="input">
                        <input
                            :value="labelsText"
                            class="labelsInput"
                            @input="labelsChange"
                            placeholder="添加标签"
                            :maxlength="8"
                        />
                        <button
                            :class="['btn', { btnActive: addLabelsBtnActive }]"
                            @click="addLabels"
                        >添加</button>
                    </view>
                    <view class="labels">
                        <view class="labels-content" v-for="(item, i) in state.labels" :key="i">
                            <text>{{ item }}</text>
                            <image
                                @click="delLabels(i)"
                                class="delete-icon"
                                src="@/static/images/icons/delete.png"
                            />
                        </view>
                    </view>
                </view>
                <view class="content-box">
                    <label class="label" for="title">标题</label>
                    <input
                        class="text title"
                        id="title"
                        :value="title"
                        placeholder="..."
                        @click="valueChange"
                    />
                </view>
                <view class="content-box">
                    <label for="content" class="label">内容</label>
                    <textarea
                        class="text content"
                        id="content"
                        :value="textareaValue"
                        cols="30"
                        rows="5"
                        placeholder="..."
                        @input="textareaChange"
                    ></textarea>
                </view>
                <button class="btn" @click="publishAnArticle">发布</button>
            </view>
        </view>
    </scroll-view>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useScroll } from '@/BusinessLogic/Composable'
import uploadPicture from '@/static/images/background/upload-picture.png'

const { toTopBarIsShow, scrollTop, toTop, scroll } = useScroll()

const state = reactive({
    labels: []
})
const imgsrc = ref(uploadPicture)
const title = ref('')
const textareaValue = ref('')
const labelsText = ref('')
const addLabelsBtnActive = computed(() => labelsText.value.replace(/\s*/g, "") !== '')

function chooseMedia() {
    uni.chooseMedia({
        count: 1,
        mediaType: ['image'],
        sizeType: ['original', 'compressed'],
        success(res) {
            const path = res.tempFiles[0].tempFilePath
            imgsrc.value = path
        },
        fail(res) {
            console.log(res);
        }
    })
}

function labelsChange(e) {
    labelsText.value = e.detail.value
}

function addLabels() {
    if (!addLabelsBtnActive.value) return
    state.labels.push(labelsText.value)
    labelsText.value = ''
}

function delLabels(i) {
    state.labels.splice(i, 1)
}

function valueChange(e) {
    title.value = e.detail.value
}

function textareaChange(e) {
    textareaValue.value = e.detail.value
}

function publishAnArticle() {
    console.log('发布');
}
</script>

<style lang="scss" scoped>
@use './Release';
</style>