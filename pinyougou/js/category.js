$(function () {
  init();

  function init() {
    var myScroll;
    
    getCategories();
  }
  // 滚动插件
  function loaded() {
    myScroll = new IScroll('#leftScroll');
    myScroll1 = new IScroll('#rightScroll');
  }

  function getCategories() {
    // http://api.pyg.ak48.xyz/api/public/v1/categories
    $.get("http://api.pyg.ak48.xyz/api/public/v1/categories", function (res) {
      // console.log(res);
      var categoriesTemp = template("categoriesTemplate",{data:res.data});
      // console.log(categoriesTemp);
      $(".left").html(categoriesTemp);
      var cgContentTemp = template("cgContentTemplate",{data:res.data});
      // console.log(cgContentTemp);
      $(".right").html(cgContentTemp);
      clickCategories();
      loaded();
    });
  }
  var CategoriesIndex = 0;
  function clickCategories() {
    $(".left>ul>li").on("tap",function () {
      // console.log($(this).index());
      CategoriesIndex = $(this).index();
      console.log(CategoriesIndex);
      $(this).addClass("checked").siblings().removeClass("checked");
      $(".right>ul>li").eq(CategoriesIndex).addClass("checked").siblings().removeClass("checked");
    })
  }

})