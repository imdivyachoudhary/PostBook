function deleteComment(ele, event) {
  event.preventDefault();
  // console.log($(event.target).attr("data-link"));

  $.ajax({
    url: $(event.target).attr("data-link"),
    type: "delete",
    success: function (response) {
      // console.log(response);
      $(`#comment-${response.data.comment_id}`).remove();
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
      $("#comment-form #input-comment").html("");
    },
    error: function (err) {
      $(".modal").modal("hide");
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
                    <div class="comment-reply-button" data-link="/post/comment/delete/${comment._id}" onclick="deleteComment(this,event)">Delete</div>
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
