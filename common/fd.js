//防抖
/**
 * @param {Function()} = fn //要执行的函数
 * @param {number} = delay  //防抖间隔
 * @param {this} = th //vue实例的this
 * @param {boolean} = immediate //第一次触发是否立即执行
 */
var util ={}
util._debounce = function(fn, delay,th,immediate = false) {
	var delay = delay || 300;
	return (function() {
		if (th.timer) clearTimeout(th.timer)
		if (immediate && !th.isImmediate) {
			fn.apply(th)
			th.isImmediate = true
		}else{
			th.timer = setTimeout(function() {
				th.timer = null;
				th.isImmediate = false
				fn.apply(th);
			}, delay);
		}	
	})()
}
export default util