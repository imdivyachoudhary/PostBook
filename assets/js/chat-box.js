$(document).ready(function () {
  // var ele = document.getElementById("messages-list");
  //   console.log(ele)
  //   console.log(ele.scrollHeight);
  // var last_msg = document.getElementById("last-msg");
  // console.log(ele.scrollHeight);
  //   console.log(innerele.scrollHeight);
  //   innerele.scrollTo(0, innerele.scrollHeight);
  // ele.scrollTop = $(".messages-list").height();
  // ele.scrollTo(0, $(".messages-list").height());

  $(".messages-list").animate(
    { scrollTop: 10 * $(".messages-list").height() },
    500
  );
});
