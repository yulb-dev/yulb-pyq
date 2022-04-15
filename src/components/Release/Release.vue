<template>
  <view class="release">
    <to-top-bar v-show="toTopBarIsShow" @toTop="toTop"></to-top-bar>
    <scroll-view scroll-y="true" class="addPage" :scroll-top="scrollTop" scroll-with-animation @scroll="scroll">
      <view class="addPage-box">
        <view class="topimg">
          <image @click="chooseMedia" class="img" :src="imgsrc" mode="widthFix" />
        </view>
        <view class="form-content">
          <view class="labels-box">
            <view class="top">
              <text class="labels-title">标签</text>
            </view>
            <view class="input">
              <input :value="labelsText" class="labelsInput" @input="labelsChange" placeholder="添加标签" :maxlength="8" />
              <button :class="['btn', { btnActive: addLabelsBtnActive }]" @click="addLabels">
                添加
              </button>
            </view>
            <view class="labels">
              <view class="labels-content" v-for="(item, i) in state.labels" :key="i">
                <text>{{ item }}</text>
                <image @click="delLabels(i)" class="delete-icon" src="@/static/images/icons/delete.png" />
              </view>
            </view>
          </view>
          <view class="content-box">
            <label class="label" for="title">标题</label>
            <input class="text title" id="title" :value="title" placeholder="..." @input="valueChange" />
          </view>
          <view class="content-box">
            <label for="content" class="label">内容</label>
            <textarea class="text content" id="content" :value="content" cols="30" rows="5" placeholder="..."
              @input="textareaChange" :show-confirm-bar="false"></textarea>
          </view>
          <button class="submit" @click="publishAnArticle">发布</button>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref, reactive, computed, toRefs, inject } from 'vue'
import { useScroll } from '@/BusinessLogic/Composable'
import { formValidation, goDetails } from '@/BusinessLogic/getUserProfile'
import { Registered } from '@/network/index'
import { useStore } from '@/stores/counter'
import ToTopBar from '@/components/ToTopBar/ToTopBar'
import uploadPicture from '@/static/images/background/upload-picture.png'

const props = defineProps({
  isReleasePage: {
    default: false
  }
})

const emits = defineEmits(['editArticle'])

const store = useStore()

const { toTopBarIsShow, scrollTop, toTop, scroll } = useScroll()

const state = reactive({
  imgsrc: uploadPicture,
  title: '',
  content: '',
  labelsText: '',
  labels: [],
})

const data = inject('Release')
if (data.message) {
  Reflect.ownKeys(data.message).forEach(key => state[key] = data.message[key])
  data.message = null
}

const { imgsrc, title, content, labelsText, } = toRefs(state)
const addLabelsBtnActive = computed(
  () => labelsText.value.replace(/\s*/g, '') !== ''
)
const imgChange = computed(() => imgsrc.value !== uploadPicture)

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
      console.log(res)
    },
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
  content.value = e.detail.value
}

async function publishAnArticle() {
  uni.showLoading({ title: '发布中' });
  const isOk = formValidation(
    imgChange,
    state.labels.length,
    title.value,
    content.value
  )
  if (!isOk) return
  const suffix = imgsrc.value.slice(imgsrc.value.lastIndexOf('.'))
  let fileID = null
  try {
    const value = await wx.cloud.uploadFile({
      cloudPath: 'public/img/cardImg/' + Date.now() + suffix,
      filePath: imgsrc.value,
      config: {
        env: 'prod-6gjaadkm5f538e2a', // 微信云托管环境ID
      },
    })
    fileID = value.fileID
  } catch (error) {
    fileID = imgsrc.value
  }

  const data = {
    imgsrc: fileID,
    userid: store.user.data._id,
    title: title.value,
    labels: state.labels,
    content: content.value,
    cardId: state._id
  }
  if (props.isReleasePage) {
    emits('editArticle', data)
    return
  }
  Registered.post({ url: '/pushCard', data }).then(({ data }) => {
    uni.hideLoading();
    if (data.keyValue) {
      throw data
    } else {
      store.addDynamic(data)
      goDetails(data)
      imgsrc.value = uploadPicture
      title.value = ''
      state.labels = []
      content.value = ''
    }
  })
}
</script>

<style lang="scss" scoped>
@use './Release';
</style>
