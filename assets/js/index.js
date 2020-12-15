

let layer=layui.layer;
 function getUserInfo() {
    $.ajax({
        url:"/my/userinfo",
        //jq里面请求头写法headers
        headers:{
            // token的值存储在本地存储中+
            //Authorization是后端定义要求的
            Authorization:localStorage.getItem("token")
        },
        success:function(res){
           console.log(res);
            if(res.status!==0){
                return layer.msg("获取任务失败")
            }
            //如果有昵称就优先显示昵称没有的话就选择用户名
            let name =res.data.nickname||res.data.username
            //console.log(name);
            $("#welcome").text(name);
            //判断图片如果有头像选择头像没有就选择字母头像
            // console.log(res.data);
            if(res.data.user_pic){
                // console.log(res.data.user_pic);
                $(".layui-nav-img").attr("src",res.data.user_pic).show();
                $(".textAvatar").hide();
            }else{
                $(".textAvatar").show().text(name[0].toUpperCase());
                $(".layui-nav-img").hide();
            }
        }
    })
}
getUserInfo();