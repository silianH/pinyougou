$(function () {
  init();


  function init() {
    if (!$.checkLogin()) {
      $("body").css({
        "display": "none"
      });
      // 未登录  跳转到登录页
      sessionStorage.setItem("pageName", location.href);
      location.href = "/pages/login.html";
      return;
    } else {
      $("body").fadeIn();
    }
    getGoodsList();
    clickCompile();
    clickCreate();
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
          // 判断有没有商品
          if (res.data.cart_info) {
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
      }
    })
  }

  // 计算总价
  function getPriceNum() {
    var lis = $(".BuyCart_content ul li");
    var priceNum = 0;
    for (var i = 0; i < lis.length; i++) {
      var li = lis[i];
      // 在  自定义属性中获取  自定义属性名为 data-obj 的形式 可以直接通过这种形式 data("obj") 获取 属性值
      var obj = $(li).data("obj");
      // console.log(obj);

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
        // 判断是否有商品  没有商品无法编辑
        var lis = $(".BuyCart_content ul li");
        if (lis.length == 0) {
          mui.toast("请先添加商品");
          return;
        }
        // 完成编辑  同步数据
        var infos = {};
        for (var i = 0; i < lis.length; i++) {
          var num = $(".BuyCart_content ul li .mui-numbox .mui-numbox-input").eq(i).val();
          console.log($(".BuyCart_content ul li .mui-numbox .mui-numbox-input").eq(i).val());
          var li = lis[i];
          var obj = $(li).data("obj");
          console.log(obj);
          obj.amount = num;
          infos[obj.goods_id] = obj;
        }
        syncCart(infos);
      }

      // 删除功能
      $(".delete_btn button").on("click", function () {
        // console.log($(this));
        var chks = $(".goods_input input[name='goods_ratio']:checked");
        // console.log($(".goods_input input[name='goods_ratio']:checked"));

        if (chks.length == 0) {
          // 没选中 提示
          mui.toast("请选择要删除的商品");
          return;
        }

        // 选中了商品 确认是否真的执行该操作
        mui.confirm("确认抛弃该商品?", "请考虑", ["狠心抛弃", "留下来"], function (e) {
          if (e.index == 0) {
            // console.log("确认");
            // 选中 未选择的商品
            // 获取未删除的li标签  构造参数 发送请求
            var unSelectLis = $(".goods_input input[name='goods_ratio']").not(":checked").parents("li");
            // console.log($(".goods_input input[name='goods_ratio']").not(":checked").parents("li"));
            var infos = {};
            for (var i = 0; i < unSelectLis.length; i++) {
              var li = unSelectLis[i];
              var obj = $(li).data("obj");
              infos[obj.goods_id] = obj;
              console.log(infos);
              // 发送ajax 同步数据
            }
            syncCart(infos);
          } else if (e.index == 1) {
            console.log("取消");
          }
        })

      })

    })



  }

  // 点击加减
  function clickUpOrDown() {
    $(".mui-numbox .mui-btn").on("tap", function () {
      getPriceNum();
    })
  }

  // 同步购物车信息  需要传入同步的参数 infos
  function syncCart(infos) {
    $.ajax({
      url: "my/cart/sync",
      type: "post",
      data: {
        infos: JSON.stringify(infos)
      },
      headers: {
        Authorization: $.token()
      },
      success: function (res) {
        if (res.meta.status == 200) {
          mui.toast(res.meta.msg);
          getGoodsList();
        } else {
          mui.toast(res.meta.msg);
        }
      }
    })
  }

  // 点击生成订单
  function clickCreate() {
    $(".createOrder").on('click', function () {
      var lis = $(".BuyCart_content ul li");
      if (lis.length == 0) {
        mui.toast("购物车中没有添加商品");
        return;
      }
      var orderPrice = $(".price_num").text();
      var consigneeAddr = $(".consignee_addr").text();
      console.log(orderPrice, consigneeAddr);
      var ordersObj = {
        "order_price": parseInt(orderPrice),
        "consignee_addr": consigneeAddr,
        "goods": []
      }
      var lis = $(".BuyCart_content ul li");
      for (var i = 0; i < lis.length; i++) {
        var li = lis[i];
        var obj = $(li).data("obj");
        // console.log($(li).data("obj"));
        // goods[]
        var tmp = {
          "goods_id": obj.goods_id,
          "goods_number": $(lis).eq(i).find(".mui-numbox-input").val(),
          "goods_price": obj.goods_price
        }
        // console.log(tmp);
        ordersObj.goods.push(tmp);
      }
      console.log(ordersObj);
      ordersCreate(ordersObj);
    })
  }

  //  请求生成订单
  function ordersCreate(ordersObj) {
    // console.log(JSON.stringify(ordersObj));
    // http://api.pyg.ak48.xyz/api/public/v1/my/orders/create
    $.ajax({
      url: "my/orders/create",
      type: "post",
      data: ordersObj,
      headers: {
        Authorization: $.token()
      },
      success: function (res) {
        console.log(res);

        if (res.meta.status == 200) {
          mui.toast(res.meta.msg);
          setTimeout(function () {
            location.href = "/pages/orders.html";
          }, 2000);
        }
      }
    })
  }


})