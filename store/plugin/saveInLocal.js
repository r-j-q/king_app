// 持久化存储vuex
export default store => {
  if (uni.getStorageSync('state')) store.replaceState(JSON.parse(uni.getStorageSync('state')))
  store.subscribe((mutation, state) => {
	   uni.setStorageSync('state', JSON.stringify(state));
  })
}
