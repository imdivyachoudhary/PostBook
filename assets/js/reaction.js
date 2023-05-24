$(document).ready(function () {
  $(".reaction-body").hide();
  $("#like").show();
});

function showReactionList(ele, id) {
  // console.log($(ele).attr("data-target"));
  $(".reaction-icon").removeClass("active");
  $(ele).addClass("active");
  let s = "#" + id;
  //   console.log(s);
  $(".reaction-body").hide();
  $(s).show();
}
