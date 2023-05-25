$(document).ready(function () {
  $(".reaction-body").hide();
  $("#like").show();

  let post_id = $("#reaction-post-id").attr("value");
  let like_count = parseInt($("#like .reaction-count").attr("data-count"));
  let laugh_count = parseInt($("#laugh .reaction-count").attr("data-count"));
  let angry_count = parseInt($("#angry .reaction-count").attr("data-count"));
  let thumbs_up_count = parseInt($("#thumbs-up .reaction-count").attr("data-count"));

  let total_reaction_count = like_count + laugh_count + angry + thumbs_up_count;

  if (total_reaction_count)
    $(`#post-${post_id} .likes .count`).html(total_reaction_count);
  else $(`#post-${post_id} .likes .count`).html("");
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
