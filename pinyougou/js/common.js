$(function () {


  var BaseUrl = "http://api.pyg.ak48.xyz/";
  template.defaults.imports.iconUrl = BaseUrl;
  // 拦截器
  var ajaxNums = 0;
  $.ajaxSettings.beforeSend = function (xhr,obj) {
    obj.url = BaseUrl + "api/public/v1/" + obj.url;
    ajaxNums++;
    $(".mask").addClass("show");
  }
  $.ajaxSettings.complete = function () {
    ajaxNums--;
    if(ajaxNums==0){
      $(".mask").removeClass("show");
    }
    
  }




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
})