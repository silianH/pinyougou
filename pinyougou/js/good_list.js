$(function () {

  $(".refresh").on("tap", function () {
    window.location.reload();
  })


  // 设置初始查询参数
  var QueryObj = {
    query: "",
    cid: getValue("cid"),
    pagenum: 1,
    pagesize: 10,
  }
  init();
  // 根据url 上的key 来获取值
  function getValue(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
  }
  // 总页数
  var totalPage = 1;

  function init() {
    mui.init({
      pullRefresh: {
        container: '.goods_list',
        down: {
          auto: true,
          callback: function () {
            // console.log(QueryObj);
            QueryObj.pagenum = 1;
            $(".goods_list ul").html("");
            search(function () {
              mui('.goods_list').pullRefresh().endPulldownToRefresh();
              // 重置 上拉组件
              mui('.goods_list').pullRefresh().refresh(true);
            });
          }
        },
        up: {
          contentrefresh: '正在加载...',
          auto: true,
          callback: function () {
            if (QueryObj.pagenum >= totalPage) {
              // console.log("没数据");
              mui(".goods_list").pullRefresh().endPullupToRefresh(true);
              return;
            } else {
              QueryObj.pagenum++;
              search(function () {
                // console.log($(".goods_list li").length);
                mui(".goods_list").pullRefresh().endPullupToRefresh();
              })
            }
          }
        }
      }
    });
  }

  // search();
  // 请求数据  获取列表数据
  function search(callback) {
    $.get("goods/search", QueryObj, function (res) {
      // console.log(res);
      totalPage = Math.ceil(res.data.total / QueryObj.pagesize);
      // console.log(totalPage);
      var html = template("listTemplate", {
        arr: res.data.goods
      });
      $(".goods_list ul").append(html);
      // console.log(html);
      callback && callback();
    })
  }

})