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

<style>
/*每个页面公共css */
page {
  width: 100%;
  height: 100%;
  background-color: white;
}
page,
view,
text {
  box-sizing: border-box;
}
</style>
