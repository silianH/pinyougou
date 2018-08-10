$(function () {
  init();

  function init() {
    getSwiperData();
  }

  function getSlider() {
    var gallery = mui('.mui-slider');
    gallery.slider({
      interval: 2000 //自动轮播周期，若为0则不自动播放，默认为0；
    });
  }

  // http://api.pyg.ak48.xyz/api/public/v1/home/swiperdata
  function getSwiperData() {
    $.get("http://api.pyg.ak48.xyz/api/public/v1/home/swiperdata", function (res) {
      // console.log(res);
      var swiperTemp = template("sliderTemplate", {
        data: res.data
      });
      // console.log(swiperTemp);
      $(".sliderHead").html(swiperTemp);
      getSlider();
    })
  }


})