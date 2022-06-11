$(function () {
  // 1.1 获取裁剪区域的 DOM 元素
  var $image = $('#image');
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview',
  };
  $('#btnChooseImage').click(() => {
    $('#file').click();
  });
  // 1.3 创建裁剪区域
  $image.cropper(options);

  $('#file').change((e) => {
    const fileLen = e.target.files.length;
    if (fileLen === 0) return;
    //1、获取到文件
    const file = e.target.files[0];
    //2、将文件转化为路径
    const imgUrl = URL.createObjectURL(file);
    $image.cropper('destroy').attr('src', imgUrl).cropper(options);
    //  销毁旧的裁剪区域        重新设置图片路径     重新初始化裁剪区域
  });

  $('#btnUpload').click(() => {
    //1.拿到用户裁切之后的头像
    const dataURL = $image
      .cropper('getCroppedCanvas', {
        width: 100,
        height: 100,
      })
      .toDataURL('image/png');
    $.ajax({
      type: 'POST',
      url: '/my/update/avatar',
      data: {
        avatar: dataURL,
      },
      success: (res) => {
        if (res.status !== 0) return layer.msg('上传头像失败');
        layer.msg('上传头像成功');
        //通知父页面更新头像
        window.parent.getUserInfo();
      },
    });
  });
});
