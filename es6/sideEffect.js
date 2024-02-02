// 立即函式在匯入後，可直接執行函式
(function (global) {
  global.$ = '我是 jQuery';
})(window);