import Request from '../request.js'
const request = new Request().http

/**
 * @param {String} code 微信授权的code
 * @description 获取openId
 */
const getOpenId = data => {
  return request('/wechat/openid', data, 'GET')
}

export default {
  getOpenId
}
