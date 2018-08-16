

$(function () {
  init();

  function init() {
    eventList();
  }

  function eventList() {
    // console.log($("#login"));
    
    // 点击登录
    $("#login").on("click", function () {
      console.log($(this));

      var mobile_txt = $("[name='mobile']").val().trim();
      var pwd_txt = $("[name='pwd']").val().trim();

      if (!$.checkPhone(mobile_txt)) {
        mui.toast("手机不合法");
        return;
      }
      if (!$.checkPwd(pwd_txt)) {
        mui.toast("密码不合法");
        return;
      }
      // 请求路径：http://api.pyg.ak48.xyz/api/public/v1/login
      // 请求方法：post
      // 请求参数
      // 参数名     	参数说明	备注  
      // username	用户名 	必填  
      // password	密码  	必填  
      $.post("login", {
        username: mobile_txt,
        password: pwd_txt
      }, function (res) {
        if (res.meta.status == 200) {
          mui.toast(res.meta.msg);

          // 把用户信息存入永久存储中
          localStorage.setItem("userinfo",JSON.stringify(res.data));
          setTimeout(function () {
            // location.href = "/index.html";
            // 先判断有没有来源页面，如果没有再跳转到首页
            var pageName = sessionStorage.getItem("pageName");
            if (pageName) {
              location.href = pageName;
            } else {
              location.href = "/index.html";
            }
          }, 1000);
        } else {
          mui.toast(res.meta.msg);
        }
      })

    })
  }
})