$(function () {
  init();
  function init() {
    getUsers();
  }

  function getUsers() {
    $.ajax({
      url:"my/users/userinfo",
      type:"get",
      headers: {
        Authorization: $.token()
      },
      success:function (res) {
        console.log(res);
        if (res.meta.status == 200) {
          var html = template("usersTemplate",{data:res.data});
          $(".my").html(html);
        } else {
          mui.toast(res.meta.msg);
        }
      }
      
    })
  }
})