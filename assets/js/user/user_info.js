$(function () {

    // 获取 form 对象
    var form = layui.form
    var layer = layui.layer
    // 自定义校验规则
    form.verify({
        nickname: function (value) {
            if (value.trim().length > 6) {
                return '昵称长度必须在 1 ~ 6 个字符之间'
            }
        }
    })

    //初始化用户的基本管理信息
    function initUserInfo() {
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败!')
                }
                // console.log(res);

                // 将数据填充到表单中
                form.val('formUserInfo', res.data)
            }
        })
    }


    //重置按钮
    $('#btnReset').on('click', function (e) {
        e.preventDefault()
        initUserInfo()
    })

    //监听表单的提交事件
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败！')
                }
                layer.msg('更新用户信息成功！')
                window.parent.getUserInfo()
            }
        })
    })
})