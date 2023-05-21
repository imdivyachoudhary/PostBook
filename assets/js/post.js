$(document).ready(function () {
  $(".likes").click(function () {
    $(".modal-body").html("");
    $(".modal-body").html();
    var postid = $(this).attr("data-id");
    // console.log(postid);
    // $(".modal-header h1").html("Reactions");

    $.ajax({
      url: "/post/reactions",
      type: "post",
      data: { postid: postid },
      success: function (response) {
        // Add response in Modal body
        $("#modalReactions .modal-body").html(response);
      },
    });
  });

  $(".comments").click(function () {
    $(".modal-body").html("");
    var postid = $(this).attr("data-id");
    // console.log(postid);
    // $(".modal-header h1").html("Comments");

    $.ajax({
      url: "/post/comments",
      type: "post",
      data: { postid: postid },
      success: function (response) {
        // Add response in Modal body
        $("#modalComments .modal-body").html(response);
      },
    });
  });

});

function submitForm(ele, event) {
  event.preventDefault();
  let form = $(ele);
  // let formData = form.serialize();
  let formData = new FormData(ele);
  // console.log(formData);
  // return;
  $.ajax({
    url: form.attr("action"),
    type: form.attr("method"),
    data: formData,
    processData: false,
    contentType: false,
    success: function (response) {
      $(".modal").modal("hide");
      console.log(response);
      
      // $(responseElementId).html(response);
      
    },
    error: function (err) {
      // $("#modalUpdateAvatar").modal("hide");
      console.log(err);
    },
  });
}
