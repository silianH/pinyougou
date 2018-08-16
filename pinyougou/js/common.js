$(function () {
  var BaseUrl = "http://api.pyg.ak48.xyz/";
  template.defaults.imports.iconUrl = BaseUrl;
  // 拦截器
  var ajaxNums = 0;
  $.ajaxSettings.beforeSend = function (xhr, obj) {
    obj.url = BaseUrl + "api/public/v1/" + obj.url;
    ajaxNums++;
    $(".mask").addClass("show");
  }
  $.ajaxSettings.complete = function () {
    ajaxNums--;
    if (ajaxNums == 0) {
      $(".mask").removeClass("show");
    }
  }

  // 滑动 返回上一次
  $('html').on("swipeRight", function () {
    history.go(-1);
  });
  // 左滑  
  $('html').on("swipeLeft", function () {
    history.go(1);
  });
  $("#previous_page").on("tap", function () {
    history.go(-1);
  })


  onresize = function () {
    setWidth();
  }
  setWidth();

  function setWidth() {
    var onWidth = 375;
    var newWidth = document.querySelector("html").offsetWidth;
    var oneSize = 100;
    var fontSize = newWidth * oneSize / onWidth;
    document.querySelector("html").style.fontSize = fontSize + "px";
  }


  $.extend($, {
    // 手机号码合法性验证
    checkPhone: function (phone) {
      if (!(/^1[34578]\d{9}$/.test(phone))) {
        return false;
      } else {
        return true;
      }
    },
    // 邮箱合法性验证
    checkEmail: function (myemail) {
      var myReg = /^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/;
      if (myReg.test(myemail)) {　　　　
        return true;　　
      } else {　　　　
        return false;
      }
    },
    checkPwd: function (pwd) {
      var myReg = /^[a-z0-9_-]{6,18}$/;
      if (myReg.test(pwd)) {
        return true;
      } else {
        return false;
      }
    },
    // 判断永久存储中是否有userinfo
    checkLogin: function () {
      return localStorage.getItem("userinfo");
    },
    token: function () {
      // 如果userinfo 存在 则返回token 反之返回"";
      var token;
      if (!localStorage.getItem("userinfo")) {
        token = "";
      } else {
        token = JSON.parse(localStorage.getItem("userinfo")).token;
      }
      return token;
    },
    setPage: function () {
      sessionStorage.setItem("pageName", location.href);
    }

  });

  // fastclick初始化代码
  if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function () {
      FastClick.attach(document.body);
    }, false);
  }
})