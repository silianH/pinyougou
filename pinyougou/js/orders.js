$(function () {
  init();

  function init() {
    getOrders(1);
    clickTitle();
    
    // console.log($(".tab_title a"));
    
  }

  // 点击按钮
  function clickTitle() {
    $(".tab_title a").on("tap",function () {
      // console.log($(this).index());
      // console.log($(this));
      getOrders($(this).index()+1);
      
    })

  }

  function getOrders(num) {
    // http://api.pyg.ak48.xyz/api/public/v1/my/orders/all
    $.ajax({
      url: "my/orders/all",
      type: "get",
      data: {
        type: num
      },
      headers: {
        Authorization: $.token()
      },
      success: function (res) {
        // console.log(res);
        if (res.meta.status == 200) {
          var html = template("ordersTemplate", {
            data: res.data
          });
          $("#item"+num+" ul").html(html);
          // console.log($("#item"+num+" ul"));
          
        } else {
          mui.toast(res.meta.msg);
        }
      }

    })
  }
});