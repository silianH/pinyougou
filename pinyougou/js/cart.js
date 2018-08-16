$(function () {
  init();


  function init() {

    getGoodsList();
    clickCompile();
  }

  // 获取数据
  function getGoodsList() {
    // 获取token 
    var token = $.token();
    // http://api.pyg.ak48.xyz/api/public/v1/my/cart/all
    $.ajax({
      url: "my/cart/all",
      type: "get",
      headers: {
        Authorization: token
      },
      success: function (res) {
        // console.log(res);
        if (res.meta.status == 200) {
          var cart_info = JSON.parse(res.data.cart_info);
          // console.log(cart_info);
          var cartHtml = template("cartTemp", {
            obj: cart_info
          });
          // console.log(cartHtml);
          $(".BuyCart_content ul").html(cartHtml);
          // $(".totalPrice .price_num").html();
          mui(".mui-numbox").numbox();
          getPriceNum();
          clickUpOrDown();
        }
      }
    })
  }

  // 计算总价
  function getPriceNum() {
    var lis = $(".BuyCart_content ul li");
    var priceNum = 0;
    for (var i = 0; i < lis.length; i++) {
      var nums = parseInt($(lis).eq(i).find(".mui-numbox-input").val()) * parseInt($(lis).eq(i).find(".li_price span").html());
      priceNum += nums;
      // console.log(priceNum);
    }
    $(".price_num").text(priceNum);
  }

  // 点击编辑
  function clickCompile() {
    $(".compile_btn button").on("click", function () {
      // console.log($(this));
      // console.log($("body").hasClass("openCompile"));

      $('body').toggleClass("openCompile");
      if ($("body").hasClass("openCompile")) {
        $(this).html("完成");
      } else {
        $(this).html("编辑");
      }

    })
  }

  // 点击加减
  function clickUpOrDown() {
    $(".mui-numbox .mui-btn").on("tap",function () {
      getPriceNum();
    })
  }
})