$(function () {
    //注册账号
    $("#goToRegi").click(function () {
        //显示注册
        $(".register").show();
        //隐藏登录
        $(".login").hide();
    });
    $("#goToLogin").click(function () {
        //显示登录
        $(".login").show();
        //隐藏注册
        $(".register").hide()
    })

    //从layui中获取的表单相关的功能==》一定要申明变量存储，否则直接使用form会报错
    let form = layui.form;
    let layer = layui.layer;
    form.verify({

        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        pass: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repass: function (value, item) {
            if (value !== $('.passIpt').val()) {
                return "密码输入不一致"
            }
        }

    });

    //注册功能
    $("#registerForm").on("submit", function (e) {
        e.preventDefault();
        let data = $(this).serialize();
        $.ajax({
            type: "POST",
            url: "http://ajax.frontend.itheima.net/api/reguser",
            data,
            success: function (res) {
                if (res.status !== 0) {
                    //return "res.message"
                    return layer.msg(res.message);
                } else {
                    layer.msg(res.message);
                    $("#registerForm")[0].reset()
                }

                $("#goToLogin").click();
            }
        })
    })


    //登录功能
    $("#loginForm").on("submit", function (e) {
        e.preventDefault();
        let data = $(this).serialize();

        $.ajax({
            type: "POST",
            url: "http://ajax.frontend.itheima.net/api/login",
            data,
            success: function (res) {
             console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message);
                } else {
                    layer.msg("登陆成功");
                }

                 layer.msg('登录成功 即将跳转', {
                     time: 2000 //2秒关闭（如果不配置，默认是3秒）
                 }, function () {
                     location.href = ""
                 });
            }
        })

    })
});