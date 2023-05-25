$(document).ready(function () {
  let post_id = $("#modalComments #comment-form #form-post-id").attr("value");
  let comments_count = $("#comments-count").val();
  // console.log(comments_count, post_id);
  if (comments_count)
    $(`#post-${post_id} .comments .count`).html(comments_count);
  else $(`#post-${post_id} .comments .count`).html("");
});

function toggleCommentReaction(ele, reactionType) {
  let comment_id = $(ele).attr("data-id");
  $.ajax({
    url: "/reaction/toggle-reaction",
    type: "post",
    data: {
      type: "Comment",
      id: comment_id,
      reactionType: reactionType,
    },
    success: function (response) {
      //   console.log(response);

      let likes_count = parseInt(
        $(`#comment-${comment_id} .like-count`).html()
      );
      if (!likes_count) likes_count = 0;

      let increaseCount = response.data.increaseCount;
      if (increaseCount == 1) {
        likes_count = likes_count + 1;
        $(`#comment-${comment_id} .like-count`).html(likes_count);
        $(`#comment-${comment_id} .like-icon`).html(
          `<i class="fas fa-heart liked"></i>`
        );
      } else if (increaseCount == -1) {
        likes_count = likes_count - 1;
        if (likes_count)
          $(`#comment-${comment_id} .like-count`).html(likes_count);
        else $(`#comment-${comment_id} .like-count`).html("");
        $(`#comment-${comment_id} .like-icon`).html(
          `<i class="far fa-heart"></i>`
        );
      }
    },
    error: function (err) {
      // $(".modal").modal("hide");
      console.log(err);
    },
  });
}

function deleteComment(ele, event) {
  event.preventDefault();
  // console.log($(event.target).attr("data-link"));

  $.ajax({
    url: $(event.target).attr("data-link"),
    type: "delete",
    success: function (response) {
      // console.log(response);
      $(`#comment-${response.data.comment_id}`).remove();

      let comments_count = parseInt($("#comments-count").val()) - 1;
      let post_id = $("#modalComments #comment-form #form-post-id").attr(
        "value"
      );
      $("#comments-count").attr("value", comments_count);
      if (comments_count)
        $(`#post-${post_id} .comments .count`).html(comments_count);
      else $(`#post-${post_id} .comments .count`).html("");
    },
    error: function (err) {
      console.log(err);
    },
  });
}

function submitCommentForm(ele, event) {
  event.preventDefault();
  let form = $(ele);
  let formData = form.serialize();
  // let formData = new FormData(ele);
  // console.log(formData);
  //   return;
  $.ajax({
    url: form.attr("action"),
    type: form.attr("method"),
    data: formData,
    success: function (response) {
      //   console.log(response);
      let commentDom = createCommentDom(
        response.data.comment,
        response.data.user
      );
      $(".comments-list").prepend(commentDom);

      let post_id = $("#modalComments #comment-form #form-post-id").attr("value");
      
      $("#comment-form")[0].reset();
      $("#modalComments #comment-form #form-post-id").attr("value", post_id);

      let comments_count = parseInt($("#comments-count").val()) + 1;
      $("#comments-count").attr("value", comments_count);
      if (comments_count)
        $(`#post-${post_id} .comments .count`).html(comments_count);
      else $(`#post-${post_id} .comments .count`).html("");
    },
    error: function (err) {
      // $(".modal").modal("hide");
      console.log(err);
    },
  });
}

function createCommentDom(comment, user) {
  let avatar = `<i class="fas fa-user-circle"></i>`;
  if (user.avatar) {
    let avatarSrc = user.avatar;
    avatar = `<img src="${avatarSrc}" alt="" />`;
  }

  return (dom = `<div class="comment-item" id="comment-${comment._id}">
                    <div class="comment-header">
                    <div class="comment-user">
                        <div class="display_pic">
                        ${avatar}
                        </div>
                        <div class="display_name">${user.name}</div>
                    </div>
                    <div class="comment-reply-button" data-link="/comment/delete/${comment._id}" onclick="deleteComment(this,event)">Delete</div>
                    <div class="comment-like-button">
                        <div class="like-icon">
                        <i class="far fa-heart"></i>
                        </div>
                        <div class="like-count"></div>
                    </div>
                    </div>
                    <div class="comment-body">
                    <div class="comment">${comment.content}</div>
                    </div>
                </div>`);
}
