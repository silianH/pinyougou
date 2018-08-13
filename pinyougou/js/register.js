$(function () {
  init();

  function init() {
    eventList();
  }

  function eventList() {
    // 获取验证码
    $("#code_btn").on("click", function () {
      // 获取手机 -> 验证合法性
      // 没通过验证  给出提示 同时return

      var mobile_txt = $("[name='mobile']").val().trim();

      // 判断合法性
      if (!$.checkPhone(mobile_txt)) {
        mui.toast('手机非法', {
          duration: 'long',
          type: 'div'
        })
        return;
      }

      $.post("users/get_reg_code", {
        mobile: mobile_txt
      }, function (res) {
        if (res.meta.status = 200) {
          console.log(res);
          // 禁用按钮
          $("#code_btn").attr("disabled", "disabled");

          var times = 10;
          $("#code_btn").text(times + "s之后在获取");
          var timeId = setInterval(function () {
            times--;
            $("#code_btn").text(times + "s之后在获取");
            if (times == 0) {
              clearInterval(timeId);
              $("#code_btn").text("获取验证码");
              $("#code_btn").removeAttr("disabled");
            }
          }, 1000);
        }else{
          mui.toast(res.meta.msg);
        }



      })

    });

    // 点击注册事件
    $("#reg_btn").on("tap",function () {
      var mobile_txt = $("[name='mobile']").val().trim();
      var code_txt = $("[name='code']").val().trim();
      var email_txt = $("[name='email']").val().trim();
      var pwd_txt = $("[name='pwd']").val().trim();
      var pwd2_txt = $("[name='pwd2']").val().trim();
      var gender_txt = $("[name='gender']:checked").val().trim();

      if (!$.checkPhone(mobile_txt)) {
        // mui 提示框
        mui.toast("手机不合法");
        return;
      }
      if (code_txt.length!=4) {
        // mui 提示框
        mui.toast("验证码不合法");
        return;
      }
      if (!$.checkEmail(email_txt)) {
        // mui 提示框
        mui.toast("邮箱不合法");
        return;
      }
      if (!$.checkPwd(pwd_txt)) {
        // mui 提示框
        mui.toast("密码不合法(6-18位 字母 数字 _-组合)");
        return;
      }
      if (pwd_txt != pwd2_txt) {
        // mui 提示框
        mui.toast("密码不一致");
        return;
      }

      // 请求路径：http://api.pyg.ak48.xyz/api/public/v1/users/reg
      // 请求方法：post
      // 请求参数

      // 参数名   	参数说明	备注  
      // mobile	手机号 	必填  
      // code  	验证码 	必填  
      // email 	邮箱  	必填  
      // pwd   	密码  	必填  
      // gender	性别  	必填  


      $.post("users/reg",{
        mobile:mobile_txt,
        code:code_txt,
        email:email_txt,
        pwd:pwd_txt,
        gender:gender_txt
      },function (res) {
        if (res.meta.status==200) {
          mui.toast(res.meta.msg);
          setTimeout(function () {
            location.href="/pages/login.html";
          },1000);
        }else{
          mui.toast(res.meta.msg);
        }
      })
      // 通过初步验证  向后台发送请求
    })
  }

  // 拓展zepto -> 给$对象添加自定义的属性或者方法
  
})