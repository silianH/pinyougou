$(function () {
  goods_id = parseInt(getUrl("goods_id"));
  console.log(goods_id);
  var GoodsObj;
  init();

  function init() {
    getDetail();
    eventList();
  }

  function eventList() {


    // 加入购物车
    $(".buyCat").on("click", function () {
      // 获取token 在登录页面已经把token信息存到本地存储中 如果已经登录就有token
      var token;
      if (!localStorage.getItem("userinfo")) {
        // 未登录  没有用户信息
        mui.toast("未登录");
        // 给一个信息  让用户登录后跳转回当前页
        $.setPage();
        // return;
        setTimeout(function () {
          location.href = "/pages/login.html";
        }, 1000);
        return;
      }
      var token = JSON.parse(localStorage.getItem("userinfo")).token;

      var obj = {
        cat_id: GoodsObj.cat_id,
        goods_id: GoodsObj.goods_id,
        goods_name: GoodsObj.goods_name,
        goods_number: GoodsObj.goods_number,
        goods_price: GoodsObj.goods_price,
        goods_weight: GoodsObj.goods_weight,
        goods_small_logo: GoodsObj.goods_small_logo
      }

      // 请求路径http://api.pyg.ak48.xyz/api/public/v1/my/cart/add
      // 请求方法： post
      // 请求参数 
      // 参数名    参数说明              备注
      // info     商品对象的JSON字符串

      $.ajax({
        url: "my/cart/add",
        type: "post",
        data: {
          info: JSON.stringify(obj)
        },
        // 设置请求头
        headers: {
          Authorization: token
        },
        success: function (res) {
          console.log(res);
          if (res.meta.status == 401) {
            mui.toast("未登录");
            $.setPage();
            setTimeout(function () {
              location.href = "/pages/login.html";
            }, 1000);
            return;
          } else if (res.meta.status == 200) {
            // 添加成功 让用户决定是否留在当前页
            /* 
            1 弹出一个确认框
            2 跳转到购物车页面
            3 留在当前页面 
             */
            mui.confirm("是否跳转到购物车页面", "添加成功", ["跳转", "取消"], function (etype) {
              // 跳转
              if (etype.index == 0) {
                setTimeout(function () {
                  location.href = "/pages/cart.html";
                }, 1000);
              } else if (etype.index == 1) {
                // 不跳转 留在当前页面
              }

            });
          }
          return;
        }
      })
    });


  }

  function setSlider() {
    var gallery = mui('.mui-slider');
    gallery.slider({
      interval: 2000 //自动轮播周期，若为0则不自动播放，默认为0；
    });
  }

  function getUrl(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
  }

  function getDetail() {
    $.get("goods/detail", {
      'goods_id': goods_id
    }, function (res) {
      // console.log(res);
      GoodsObj = res.data;
      var sliderTemp = template("sliderTemplate", {
        arr: res.data.pics
      });
      // console.log(sliderTemp);
      $(".view_slider").html(sliderTemp);
      setSlider();

      var goodsTemp = template("goodsTemplate", {
        arr: res.data
      });
      $(".view_goods").html(goodsTemp);
      // console.log(res.data.attrs[0].attr_name.split("-"));
    })

  }



})