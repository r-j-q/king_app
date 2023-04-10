import $config from '@/common/config'
import api from '@/service/api'

const tools = {
  formatHttp: (url = '') => { // 判断域名是否包含http
    let http = 'https://'
    if (url.includes('http://') || url.includes('https://')) http = ''
    return http + url
  },
  serverImg: (img = '') => { // 服务器图片路径拼接
    if (img.includes('http://') || img.includes('https://')) return img
    return img ? $config.SERVER_PATH + '/upload/' + img : tools.platformImg($config.IMG_ERROR)
  },
  platformImg: (img = $config.IMG_ERROR, suffix = 'png') => { // 不同平台所展示的图片
    const res = uni.getSystemInfoSync()
    if (res.pixelRatio < 3) {
      // #ifdef H5
      img = process.env.NODE_ENV === 'development' ? '/wechat/static' + img + '@2x.' + suffix : '/wechat/static' + img + '@2x.' + suffix
      // #endif

      // #ifdef APP-PLUS
      img = '../../static' + img + '@2x.' + suffix
      // #endif

      // #ifdef MP-WEIXIN
      img = $config.SERVER_PATH + '/wechat/static' + img + '@2x.' + suffix
      // #endif
    } else {
      // #ifdef H5
      img = process.env.NODE_ENV === 'development' ? '/wechat/static' + img + '@3x.' + suffix : '/wechat/static' + img + '@3x.' + suffix
      // #endif

      // #ifdef APP-PLUS
      img = '../../static' + img + '@3x.' + suffix
      // #endif

      // #ifdef MP-WEIXIN
      img = $config.SERVER_PATH + '/wechat/static' + img + '@3x.' + suffix
      // #endif
    }
    return img
  },
  formatMoney: (money, digit = 2) => { // 金钱显示为xxx,xxx.xx
    var tpMoney = '0.00'
    if (undefined !== money) {
      tpMoney = money
    }
    tpMoney = Number(tpMoney)
    if (isNaN(tpMoney)) {
      return '0.00'
    }
    tpMoney = tpMoney.toFixed(digit) + ''
    var re = /^(-?\d+)(\d{3})(\.?\d*)/
    while (re.test(tpMoney)) {
      tpMoney = tpMoney.replace(re, '$1,$2$3')
    }

    return tpMoney
  },
  numLimit: value => { // 大于99的数字变成99+
    return value > 99 ? '99+' : value
  },
  distance: value => { // 距离米和千米
    if (value === null || value === undefined) {
      return '--'
    } else if (value < 1000) {
      return value + ' m'
    } else {
      return (value / 1000).toFixed(1) + ' km'
    }
  },
  amount: (value, unit = '万') => { // 数量过万截取
    if (value === null || value === undefined) {
      return '--'
    } else if (value < 10000) {
      return value
    } else {
      return (value / 10000).toFixed(1) + unit
    }
  },
  bindCardNo: value => { // 卡号加***
    if (value) {
      const arr1 = value.substr(value.length - 4)
      const arr2 = value.substr(0, 4)
      return arr2 + ' **** **** **** ' + arr1
    }
  },
  sliceString: (str, max = 20) => { // 字符串限制长度 超出部分隐藏显示...
    if (!str || str.length === 0) { return '' }
    if (str.length > max) {
      str = str.substring(0, max)
      str += '...'
    }
    return str
  },
  arrToStr: (arr = []) => { // 数组处理为字符串用‘，’隔开
    var str = ''
    var len = arr.length
    for (var i = 0; i < len; i++) {
      if (i >= 1) {
        str += ','
      }
      str += arr[i]
    }
    return str
  },
  lessTen: (num = 0) => { // 数字小于10显示01-09
    var newNum = parseInt(num)
    return newNum < 10 ? '0' + newNum : newNum
  },
  capital: (str = '') => { // 数字转换为大写汉字
    str = str + ''
    var len = str.length - 1
    var idxs = ['', '十', '百', '千', '万', '十', '百', '千', '亿', '十', '百', '千', '万', '十', '百', '千', '亿']
    var num = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
    return str.replace(/([1-9]|0+)/g, function($, $1, idx, full) {
      var pos = 0
      if ($1[0] !== '0') {
        pos = len - idx
        if (idx === 0 && $1[0] === 1 && idxs[len - idx] === '十') {
          return idxs[len - idx]
        }
        return num[$1[0]] + idxs[len - idx]
      } else {
        var left = len - idx
        var right = len - idx + $1.length
        if (Math.floor(right / 4) - Math.floor(left / 4) > 0) {
          pos = left - left % 4
        }
        if (pos) {
          return idxs[pos] + num[$1[0]]
        } else if (idx + $1.length >= len) {
          return ''
        } else {
          return num[$1[0]]
        }
      }
    })
  },
  secondToTime: (sec = 0) => { // 秒数转换成时分秒格式
    if (sec < 3600) {
      return (
        tools.lessTen(Math.floor(parseInt(sec) / 60)) +
        ':' +
        tools.lessTen(parseInt(sec) % 60)
      )
    } else {
      return (
        tools.lessTen(Math.floor(parseInt(sec) / 3600)) +
        ':' +
        tools.lessTen(Math.floor((parseInt(sec) % 3600) / 60)) +
        ':' +
        tools.lessTen(parseInt(sec) % 60)
      )
    }
  },
  handlePhone(val) { // 手机号中间四位隐藏
    var phone = val.substr(0, 3) + '****' + val.substr(7)
    return phone
  },
  secondToDate(result) {
    var h = Math.floor(result / 3600) < 10 ? '0' + Math.floor(result / 3600) : Math.floor(result / 3600)
    var m = Math.floor((result / 60 % 60)) < 10 ? '0' + Math.floor((result / 60 % 60)) : Math.floor((result / 60 % 60))
    var s = Math.floor((result % 60)) < 10 ? '0' + Math.floor((result % 60)) : Math.floor((result % 60))
    return h + ':' + m + ':' + s
  },
  getValforObj: (obj, val) => {
    return obj[val]
  },
  forObj: (obj, val) => {
    for (val in obj) {
      return val
    }
  },
  getDateTime: () => { // 获取当前时间
    var dt = new Date()
    var year = dt.getFullYear()
    var month = dt.getMonth() + 1
    var day = dt.getDate()
    // var h = dt.getHours()
    // var m = dt.getMinutes()
    // var s = dt.getSeconds()
    month = (parseInt(month) < 10 ? '0' : '') + month
    day = (parseInt(day) < 10 ? '0' : '') + day
    var currentdate = year + '-' + month + '-' + day
    return currentdate
  },
  getWeekday: (dt, str) => { // 获取传入日期 str为空时默认返回星期几
    str = str || '星期'
    var index = dt.getDay()
    var arr = ['天', '一', '二', '三', '四', '五', '六']
    var wd = arr[index]
    return str + wd
  },
  getDateDiff: (dt) => { // 获取传入时间与当前时间的差
    dt = new Date(dt).getTime()
    var minute = 1000 * 60
    var hour = minute * 60
    var day = hour * 24
    var month = day * 30
    var now = new Date().getTime()
    var diff = now - dt
    if (diff < 0) return

    var monthC = diff / month
    var weekC = diff / (7 * day)
    var dayC = diff / day
    var hourC = diff / hour
    var minC = diff / minute
    var result = ''
    if (monthC >= 1) {
      result = '' + parseInt(monthC) + '个月前'
    } else if (weekC >= 1) {
      result = '' + parseInt(weekC) + '周前'
    } else if (dayC >= 1) {
      result = '' + parseInt(dayC) + '天前'
    } else if (hourC >= 1) {
      result = '' + parseInt(hourC) + '小时前'
    } else if (minC >= 1) {
      result = '' + parseInt(minC) + '分钟前'
    } else { result = '刚刚' }
    return result
  },
  getDateByCount: (dt, acount, sign) => { // 传入日期dt 获取acount天后的日期 sign默认为/
    sign = sign || '/'
    var dd = new Date(dt)
    dd.setDate(dd.getDate() + acount * 1)

    // 获取acount天后的日期
    var y = dd.getFullYear()
    var m = dd.getMonth() + 1

    // 获取当前月份的日期
    var d = dd.getDate()
    if (m < 10) { m = '0' + m }
    if (d < 10) { d = '0' + d }
    return y + sign + m + sign + d
  },
  handelTime(sec = 0) { // 处理时间格式 return[天，小时，分钟，秒]
    let d = 0
    let h = 0
    let m = 0
    let s = parseInt(sec)

    if (s >= 60) {
      m = parseInt(sec / 60)
      s = parseInt(sec % 60)
      if (m >= 60) {
        h = parseInt(m / 60)
        m = parseInt(m % 60)
        if (h >= 24) {
          d = parseInt(h / 24)
          h = parseInt(h % 24)
        }
      }
    }
    return [d, h, m, s]
  },
  dateFormat: (date, fmt = 'yyyy-MM-dd HH:mm:ss') => { // 服务器时间格式化
    if (!date) return ''
    date = new Date(date)
    var o = {
      'M+': date.getMonth() + 1, // 月份
      'd+': date.getDate(), // 日
      'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12, // 小时 (12小时制)
      'H+': date.getHours(), // 小时 (24小时制)
      'm+': date.getMinutes(), // 分
      's+': date.getSeconds(), // 秒
      'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
      'S': date.getMilliseconds() // 毫秒
    }
    var week = {
      '0': '/u65e5',
      '1': '/u4e00',
      '2': '/u4e8c',
      '3': '/u4e09',
      '4': '/u56db',
      '5': '/u4e94',
      '6': '/u516d'
    }
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    if (/(E+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '/u661f/u671f' : '/u5468') : '') + week[date.getDay() + ''])
    }
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
      }
    }
    return fmt
  },
  getQueryString: key => { // 接受URL地址参数 key为传入参数
    var reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)', 'i')
    var r = window.location.search.substr(1).match(reg)
    if (r != null) return unescape(r[2])
    return null
  },
  getParams: url => { // 获取链接中包含的参数
    const paramObj = {}
    const params = url.split('?')[1]
    if (!params) return paramObj
    const keyValueArr = params.split('&')
    keyValueArr.forEach(item => {
      const keyValue = item.split('=')
      paramObj[keyValue[0]] = decodeURIComponent(keyValue[1])
    })

    return paramObj
  },
  weixinAuth: async() => {
    if (process.env.NODE_ENV === 'development') return

    // 微信授权
    const code = tools.getParams(window.location.href).code // 截取url上的code ,可能没有,则返回''空字符串
    if (code) {
      const res = await api.wx.getOpenId({ code }) // 获取用户信息
      // 返回用户信息
      if (res.code === 0 && res.result && res.result.openid) {
        uni.setStorageSync('wxUserInfo', res.result)
        return res.result
      }
    } else {
      let redirectUrl = window.location.href
      redirectUrl = encodeURIComponent(redirectUrl)
      const appid = $config.WXAPPID
      window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirectUrl}&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect`
    }
  },
  executeExp: (r, v) => { // 进行校验
    if (!v) return false
    return r.test(v)
  },
  isMobile: (v = '') => { // 判断是否为手机号码
    var r = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/
    return !v ? false : r.test(v)
  },
  isPassword: (v = '') => { // 判断密码
    var r = /^[a-zA-Z0-9]{6,14}$/
    return !v ? false : r.test(v)
  },
  isMobile2: (v = '') => { // 判断是否为固定电话号码
    var r = /^(0[0-9]{2,3}\-)([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/
    return this.executeExp(r, v)
  },
  isCardID: (v = '') => { // 验证身份证的有效性
    var r = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
    // return this.executeExp(r, v)
    return !v ? false : r.test(v)
  },
  isEmail: (v = '') => {
    var r = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
    return this.executeExp(r, v)
  },
  idChinese: (v = '') => { // 判断是否为汉字
    var r = /^\s*$/g
    if (!v) return false
    return r.test(v)
  },
  isPlateNumber: (v = '') => { // 判断是否为车牌号
    var r = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/
    return this.executeExp(r, v)
  },
  isBankNumber: (bankcardnumberResult) => { // 判断是否是银行卡号
    // 长度校验
    if (bankcardnumberResult === '' || bankcardnumberResult.length < 16 || bankcardnumberResult.length > 19) {
      return {
        boole: false,
        title: '银行卡号位数必须在16~19之间，请完整输入银行卡号！'
      }
    }
    // 开头6位校验
    var strBin = '10,18,30,35,37,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,58,60,62,65,68,69,84,87,88,94,95,98,99'
    if (strBin.indexOf(bankcardnumberResult.substring(0, 2)) === -1) {
      return {
        boole: false,
        title: '银行卡号开头6位不符合规范，请检查后重新输入！'
      }
    }
    // 全数字校验
    var num = /^\d*$/
    if (!num.exec(bankcardnumberResult)) {
      return {
        boole: false,
        title: '银行卡号必须全为数字，请检查后重新输入！'
      }
    }
    // Luhm验证
    var lastNum = bankcardnumberResult.substr(bankcardnumberResult.length - 1, 1)// 取出最后一位（与luhm进行比较）
    var first15Num = bankcardnumberResult.substr(0, bankcardnumberResult.length - 1)// 前15或18位
    var newArr = []
    for (var i = first15Num.length - 1; i > -1; i--) {	// 前15或18位倒序存进数组
      newArr.push(first15Num.substr(i, 1))
    }
    var arrJiShu = []	// 奇数位*2的积 <9
    var arrJiShu2 = [] // 奇数位*2的积 >9
    var arrOuShu = []	// 偶数位数组
    for (var j = 0; j < newArr.length; j++) {
      if ((j + 1) % 2 === 1) { // 奇数位
        if (parseInt(newArr[j]) * 2 < 9) { arrJiShu.push(parseInt(newArr[j]) * 2) } else { arrJiShu2.push(parseInt(newArr[j]) * 2) }
      } else { // 偶数位
        arrOuShu.push(newArr[j])
      }
    }
    var jishu_child1 = [] // 奇数位*2 >9 的分割之后的数组个位数
    var jishu_child2 = [] // 奇数位*2 >9 的分割之后的数组十位数
    for (var h = 0; h < arrJiShu2.length; h++) {
      jishu_child1.push(parseInt(arrJiShu2[h]) % 10)
      jishu_child2.push(parseInt(arrJiShu2[h]) / 10)
    }
    var sumJiShu = 0 // 奇数位*2 < 9 的数组之和
    var sumOuShu = 0 // 偶数位数组之和
    var sumJiShuChild1 = 0 // 奇数位*2 >9 的分割之后的数组个位数之和
    var sumJiShuChild2 = 0 // 奇数位*2 >9 的分割之后的数组十位数之和
    var sumTotal = 0
    for (var m = 0; m < arrJiShu.length; m++) {
      sumJiShu = sumJiShu + parseInt(arrJiShu[m])
    }
    for (var n = 0; n < arrOuShu.length; n++) {
      sumOuShu = sumOuShu + parseInt(arrOuShu[n])
    }
    for (var p = 0; p < jishu_child1.length; p++) {
      sumJiShuChild1 = sumJiShuChild1 + parseInt(jishu_child1[p])
      sumJiShuChild2 = sumJiShuChild2 + parseInt(jishu_child2[p])
    }
    // 计算总和
    sumTotal = parseInt(sumJiShu) + parseInt(sumOuShu) + parseInt(sumJiShuChild1) + parseInt(sumJiShuChild2)
    // 计算Luhm值
    var k = parseInt(sumTotal) % 10 === 0 ? 10 : parseInt(sumTotal) % 10
    var luhm = 10 - k

    if (lastNum === luhm) {
      return {
        boole: true,
        title: '成功'
      }
    } else {
      return {
        boole: false,
        title: '银行卡号不合法，请检查后重新输入！'
      }
    }
  },
  isPrime: (v = '') => { // 判断数字是否为质数
    return !(/^.?$|^(..+?)\1+$/).test('1'.repeat(v))
  },
  isPhoto: (u = '') => { // 判断图片格式是否符合要求
    var _index = u.lastIndexOf('.')
    var _type = u.substring(_index + 1)
    var _types = ['jpg', 'png', 'gif']
    return !(_types.indexOf(_type) <= -1)
  },
  isMoney: (v = '') => { // 判断是否为整数，或者最多保留两位小数
    var r = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
    return r.test(v)
  },
  isAge: (v = '') => { // 判断是否为正整数(1-120)
    var r = /^(?:[1-9][0-9]?|1[01][0-9]|120)$/
    return r.test(v)
  },
  // 判断设备类型
  device() {
    const u = navigator.userAgent
    const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 // android终端
    const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
    if (isAndroid) { return 'android' }
    if (isiOS) { return 'ios' }
  },
  // input 失去焦点后页面错误
  handleOnresize(callback) {
    let isReset = true// 是否归位
    if (tools.device() === 'ios') {
      document.body.addEventListener('focusin', () => {
        // 软键盘弹出的事件处理
        isReset = false
      })
      document.body.addEventListener('focusout', () => {
        // 软键盘收起的事件处理
        isReset = true
        // 当焦点在弹出层的输入框之间切换时先不归位
        setTimeout(() => {
          if (isReset) window.scroll(0, 0) // 失焦后强制让页面归位
        }, 300)
      })
    } else if (tools.device() === 'android') {
      const h = document.documentElement.clientHeight
      window.onresize = function() {
        // 键盘弹起与隐藏都会引起窗口的高度发生变化
        const resizeHeight = document.documentElement.clientHeight || document.body.clientHeight
        if (resizeHeight < h) {
          // 当软键盘弹起，在此处操作
          isReset = false
        } else {
          // 当软键盘收起，在此处操作
          isReset = true
          setTimeout(() => {
            if (isReset) {
              window.scroll(0, 0)// 失焦后强制让页面归位
            }
          }, 300)
        }
        callback && callback(isReset)
      }
    }
  },
  debounce(func, delay) {
    let timer
    return (...args) => {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        func.apply(this, args)
      }, delay)
    }
  },
  // 处理富文本
  handleHtml: function(str) {
    if (!str) return
    let result = str
    result = result.replace(/font-size:.*?px;/gi, function(tag) {
      return 'font-size:1em'
    })
    result = result.replace(/font-size:.*?pt;/gi, function(tag) {
      return 'font-size:1em'
    })
    result = result.replace(/line-height:.*?px;/gi, function(tag) {
      return 'line-height:1.2em'
    })
    result = result.replace(/line-height:.*?pt;/gi, function(tag) {
      return 'line-height:1.2em'
    })
    // result = HtmlCode.de(result).replace(" ", "");
    result = result.replace(/src="\/upload\//ig, 'src="' + $config.IMG_PATH)
    return result
  },
  // 浮点型计算
  floatCompute: {
    // 加
    formatParams(values) {
      const params = []
      values.forEach(value => params.push(value = Math.floor(Number(value) * 100)))
      return params
    },
    // values is a array
    add(values) {
      let result = 0
      const params = this.formatParams(values)
      params.forEach(param => { result += param })
      result = result / 100
      return result
    },
    // 减
    subtract(values) {
      let result = 0
      const params = this.formatParams(values)
      result = params[0] - params[1]
      result = result / 100
      return result
    },
    // 乘
    multiply(values) {
      let result = 1
      const params = this.formatParams(values)
      params.forEach(param => { result *= param })
      result = result / (Math.pow(100, params.length))
      return result
    }
    // 除
  }
}

export default tools
