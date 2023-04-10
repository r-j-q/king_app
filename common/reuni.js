const REUNI = {
  init: () => {
    REUNI.reNavigateBack()
    REUNI.reShowToast()
  },
  // 重写关闭页面方法
  reNavigateBack: () => {
    var uniNavigateBack = uni.navigateBack
    uni.navigateBack = (params) => {
      // #ifdef H5
      // h5端刷新之后页面栈会消失
      if (getCurrentPages().length > 1) {
        uniNavigateBack(params)
      } else {
        history.back(params.delta || 1)
      }
      // #endif

      // #ifndef H5
      uniNavigateBack(params)
      // #endif
    }
  },
  // 重写toast
  reShowToast: () => {
    var uniShowToast = uni.showToast
    uni.showToast = (params) => {
      // toast信息为空时不弹出提示框
      if (params.title === '') { return }
      uniShowToast(params)
    }
  }
}
export default REUNI
