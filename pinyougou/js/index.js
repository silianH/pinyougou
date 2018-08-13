$(function () {
  init();

  function init() {
    getSwiperData();
    getCatitems();
    getGoodsList();
  }

  function getSlider() {
    var gallery = mui('.mui-slider');
    gallery.slider({
      interval: 2000 //自动轮播周期，若为0则不自动播放，默认为0；
    });
  }

  // http://api.pyg.ak48.xyz/api/public/v1/home/swiperdata
  function getSwiperData() {
    $.get("home/swiperdata", function (res) {
      // console.log(res);
      var swiperTemp = template("sliderTemplate", {
        data: res.data
      });
      // console.log(swiperTemp);
      $(".index_sliderHead").html(swiperTemp);
      getSlider();
    })
  }

  // http://api.pyg.ak48.xyz/api/public/v1/home/catitems
  function getCatitems() {
    $.get("home/catitems",function (res) {
      // console.log(res);
      var catitemsTemp = template("catitemsTemplate",{data:res.data});
      // console.log(catitemsTemp);
      $(".index_nav").html(catitemsTemp);
    })
  }

  // http://api.pyg.ak48.xyz/api/public/v1/home/goodslist
  function getGoodsList() {
    $.get("home/goodslist",function (res) {
      console.log(res);
      var goodsListTemp = template("goodslistTemplate",{data:res.data});
      // console.log(goodsListTemp);
      $(".goods").html(goodsListTemp);
    })
  }

})