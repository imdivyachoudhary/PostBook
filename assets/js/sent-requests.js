$(document).ready(function () {
  total_friends = parseInt($("#sent-request-list").attr("data-count"));
  if (!total_friends) $("#sent-request-list p.show-failure-message").show();
});

function unsendRequest(ele) {
  var friend_id = $(ele).attr("data-id");
  $.ajax({
    url: "/friendship/unsend-request",
    type: "post",
    data: { friend_id: friend_id },
    success: function (response) {
      $(`#sent-requests-list #friend-${friend_id}`).remove();
      let total_friends = parseInt($("#sent-requests-list").attr("data-count")) - 1;
      $("#sent-requests-list").attr("data-count", total_friends);

      if (!total_friends)
        $("#sent-requests-list p.show-failure-message").show();

      let friendDom = createMorePeopleDom(response.data.friend);
      $(`#more-people-list`).prepend(friendDom);
      total_friends = parseInt($("#more-people-list").attr("data-count")) + 1;
      $("#more-people-list").attr("data-count", total_friends);
      if (total_friends) $("#more-people-list p.show-failure-message").hide();
    },
    error: function (err) {
      console.log(err);
    },
  });
}

function createMorePeopleDom(friend) {
  let avatar = `<i class="fas fa-user-circle"></i>`;
  if (friend.avatar) {
    let avatarSrc = friend.avatar;
    avatar = `<img src="${avatarSrc}" alt="" />`;
  }
  return (dom = `<div class="friend" id="friend-${friend._id}">
                    <div class="display_pic">
                      ${avatar}
                    </div>
  
                    <div class="display_name">${friend.name}</div>
  
                    <div class="add-friend-icon">
                      <button
                        class="btn btn-sm"
                        data-id="${friend._id}"
                        onclick="sendRequest(this)"
                      >
                        Add Friend
                      </button>
                    </div>
                  </div>`);
}
