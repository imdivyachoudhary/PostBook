$(document).ready(function () {
  $(".reaction-body").hide();
  $("#like").show();

  let post_id = $("#reaction-post-id").attr("value");
  let like_count = parseInt($("#like .reaction-count").html());
  let laugh_count = parseInt($("#laugh .reaction-count").html());
  let angry_count = parseInt($("#angry .reaction-count").html());
  let thumbs_up_count = parseInt($("#thumbs-up .reaction-count").html());

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
