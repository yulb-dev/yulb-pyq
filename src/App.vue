<script setup>
import { onLaunch } from '@dcloudio/uni-app'
import { useStore } from '@/stores/counter'
import { Login } from '@/network/index'

uni.addInterceptor('request', {
  invoke(args) {
    // request 触发前拼接 url
    args.url =
      'https://demo-1784128-1310711794.ap-shanghai.run.tcloudbase.com' +
      args.url
  },
  success(args) { },
  fail(err) {
    console.log('interceptor-fail', err)
  },
})

//初始化云托管接口
wx.cloud.init()

const store = useStore()
uni.getStorage({
  key: 'user_token',
  success(res) {
    if (res.data)
      Login({ url: '/init', data: { openid: res.data } }).then(({ data }) => {
        store.InitUser(data)
      })
  },
  fail() {
    return
  },
})

//应用生命周期
// onLaunch(() => {
//   //路由拦截

// })
// export default {
//   onLaunch: function () {

//   },
//   onShow: function () {
//   },
//   onHide: function () {
//   },
// }
</script>

<style lang="scss">
/*每个页面公共css */
page {
  width: 100%;
  height: 100%;
  background-color: white;
}

page,
view,
text,
scroll-view,
input,
button,
scroll-view,
radio-group,
textarea {
  box-sizing: border-box;
}

.labelsList_item {
  padding: 0 15px;
  font-size: 14px;
  background-color: #f67280;
  color: #fff;
  line-height: 26px;
  display: inline-block;
  border-radius: 20px;
  margin-right: 14px;
  letter-spacing: 0.1rem;
  margin-bottom: 14px;
}

.refresh-box {
  font-size: 15px;
  width: 100%;
  display: flex;
  align-items: center;
  line-height: 30px;
  letter-spacing: 0.1rem;
  color: gray;
  margin-bottom: 16px;
  justify-content: space-between;
  font-weight: 700;

  .refresh {
    display: flex;
    align-items: center;
    justify-content: center;

    .refresh_2 {
      width: 26px;
      height: 26px;
      margin-right: 6px;
    }
  }

  .refresh:active {
    color: #f67280;
  }
}

.bottom_shadow {
  width: 100%;
  height: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  position: fixed;
  background-color: white;
  bottom: -10px;
}

::-webkit-scrollbar {
  display: none;
  width: 0;
  height: 0;
  color: transparent;
}
</style>
