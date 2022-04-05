<script>
export default {
  onLaunch: function () {
    //路由拦截
    uni.addInterceptor('request', {
      invoke(args) {
        // request 触发前拼接 url 
        args.url = 'https://demo-1784128-1310711794.ap-shanghai.run.tcloudbase.com' + args.url
      },
      success(args) {
      },
      fail(err) {
        console.log('interceptor-fail', err)
      },
    })

    wx.cloud.init()

  },
  onShow: function () {
  },
  onHide: function () {
  },
}
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
scroll-view {
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
</style>
