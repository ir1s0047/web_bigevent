$.ajaxPrefilter((options) => {
  // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
  options.url = `http://big-event-api-t.itheima.net` + options.url;
  //注入token
  if (options.url.includes('/my/')) {
    options.headers = {
      Authorization: localStorage.getItem('token'),
    };
    options.complete = (res) => {
      if (
        res.responseJSON.status === 1 &&
        res.responseJSON.message === '身份认证失败！'
      ) {
        localStorage.removeItem('token');
        location.href = '/login.html';
      }
    };
  }
});
