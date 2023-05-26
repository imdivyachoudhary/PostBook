$(document).ready(function () {
  total_friends = parseInt($("#more-people-list").attr("data-count"));
  if (!total_friends) $("#more-people-list p.show-failure-message").show();
});

function acceptRequest(ele) {
  var friend_id = $(ele).attr("data-id");
  $.ajax({
    url: "/friendship/accept-request",
    type: "post",
    data: { friend_id: friend_id },
    success: function (response) {
      $(`#received-requests-list #friend-${friend_id}`).remove();
      let total_friends = parseInt($("#received-requests-list").attr("data-count")) - 1;
      $("#received-requests-list").attr("data-count", total_friends);
      if (!total_friends)
        $("#received-requests-list p.show-failure-message").show();
    
      let friendDom = createFriendDom(response.data.friend);
      $(`#friends-list`).prepend(friendDom);
      total_friends = parseInt($("#friends-list").attr("data-count")) + 1;
      $("#friends-list").attr("data-count", total_friends);
      if (total_friends)
        $("#friends-list p.show-failure-message").hide();
    },
    error: function (err) {
      console.log(err);
    },
  });
}
  
function createFriendDom(friend) {
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

                  <div
                    class="message-icon"
                    data-bs-toggle="modal"
                    data-bs-target="#modalChatbox"
                    data-id="${friend._id}"
                    onclick="openChatBox(this)"
                  >
                    <i class="fa-solid fa-message"></i>
                  </div>

                  <div class="add-friend-icon">
                    <button
                      class="btn btn-sm"
                      data-id="${friend._id}"
                      onclick="unfriend(this)"
                    >
                      Unfriend
                    </button>
                  </div>
                </div>`);
}
  
function declineRequest(ele) {
  var friend_id = $(ele).attr("data-id");
  $.ajax({
    url: "/friendship/decline-request",
    type: "post",
    data: { friend_id: friend_id },
    success: function (response) {
      $(`#received-requests-list #friend-${friend_id}`).remove();
      let total_friends = parseInt($("#received-requests-list").attr("data-count")) - 1;
      $("#received-requests-list").attr("data-count", total_friends);
      if (!total_friends)
        $("#received-requests-list p.show-failure-message").show();
    
      let friendDom = createMorePeopleDom(response.data.friend);
      $(`#more-people-list`).prepend(friendDom);
      total_friends = parseInt($("#more-people-list").attr("data-count")) + 1;
      $("#more-people-list").attr("data-count", total_friends);
      if (total_friends)
        $("#more-people-list p.show-failure-message").hide();
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
