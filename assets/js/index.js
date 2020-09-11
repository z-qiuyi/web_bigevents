$(function () {
    //调用用户得基本信息
    getUserInfo()

    var layer = layui.layer
    //点击按钮，实现退出功能
    $('#btnLogout').on('click', function () {
        //提示用户是否确认退出
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
            //do something

            //1.清空本地存储中的token
            localStorage.removeItem('token')
            //2.重新跳转到登录页面
            location.href = '/login.html'

            //3.关闭confirm询问框
            layer.close(index);
        });
    })
})



//获取用户基本信息
function getUserInfo() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        //headers是请求头的配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || ""
        // },
        success: function (res) {
            // console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            // 调用 renderAvatara 渲染用户头像
            renderAvatar(res.data)
        },

        //不论成功还是失败，都会调用complete回调函数
        // complete: function (res) {
        //     //在complete回调函数中，可以使用res.responseJSON拿到服务器响应回来的数据
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
        //         //强制清空本地存储中的token
        //         localStorage.removeItem('token')
        //         //强制跳转到登录页面
        //         location.href = '/login.html'
        //     }
        // }
    })
}


//渲染用户的头像
function renderAvatar(user) {
    // 1.获取用户的名称
    var name = user.nickname || user.username
    //2.渲染欢迎的文本内容
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    //3.按需求渲染用户的头像
    if (user.user_pic !== null) {
        //3.1 渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        //3.2渲染文本头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}