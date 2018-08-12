$(function () {
  goods_id = parseInt(getUrl("goods_id"));
  console.log(goods_id);
  init();

  function init() {
    getDetail();
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
      console.log(res);
      var sliderTemp = template("sliderTemplate", {
        arr: res.data.pics
      });
      console.log(sliderTemp);
      $(".view_slider").html(sliderTemp);
      setSlider();

      var goodsTemp = template("goodsTemplate",{arr:res.data});
      $(".view_goods").html(goodsTemp);
      console.log(res.data.attrs[0].attr_name.split("-"));
      
    })

  }

})