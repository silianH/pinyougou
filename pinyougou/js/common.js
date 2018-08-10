$(function () {
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