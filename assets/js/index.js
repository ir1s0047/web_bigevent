function getUserInfo() {
  $.ajax({
    method: 'GET',
    url: '/my/userinfo',
    success: (res) => {
      if (res.status !== 0) return layer.msg(res.message);
      layer.msg('获取用户信息成功');
      renderAvatar(res.data);
    },
  });
}
// 渲染用户头像
const renderAvatar = (user) => {
  // 获取用户名字
  let name = user.nickname || user.username;
  // 设置欢迎文本
  $('#welcome').html(`欢迎 ${name}`);
  // 按需渲染用户头像
  if (user.user_pic !== null) {
    // 渲染图片头像
    $('.layui-nav-img').attr('src', user.user_pic).show();
    $('.text-avatar').hide();
  } else {
    // 渲染文本头像
    $('.layui-nav-img').hide();
    let firstName = name[0].toUpperCase();
    $('.text-avatar').html(firstName);
  }
};
// 退出登录
$('#btnLogout').click(() => {
  layer.confirm('是否退出登录?', { icon: 3, title: '提示' }, function (index) {
    localStorage.removeItem('token');
    location.href = '/login.html';
  });
});
//获取用户列表
getUserInfo();
