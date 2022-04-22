// Message Chat Code ...............................................

localStorage.removeItem("prospect_id");
localStorage.removeItem("isProspectCollabClicked1");
localStorage.removeItem("prospectCollabData1");
localStorage.removeItem("prospect_id1");
localStorage.removeItem("replied_id");
localStorage.removeItem("message_id");
localStorage.removeItem("nullGroupChat");
localStorage.removeItem("dmNullChats");
localStorage.removeItem("group_name");
localStorage.removeItem("editGroupName");

// localStorage.removeItem('group_id');

let groupUsersArr = [];

// Test URL

const globalURl = "https://precious-ride.thefastech.com";

// Stable URL

// const globalURl = "https://linkedin.thefastech.com";

// Test URL

// const globalURl = "https://testlinkedin.thefastech.com";

setTimeout(() => {
  if (document.getElementById("shardm1")) {
    document.getElementById("shardm1").addEventListener("click", () => {
      var element = document.getElementById("value1").value;
      localStorage.setItem("receiver_id", element);
      openChatBox();
    });
  }
  if (document.getElementById("shardm2")) {
    document.getElementById("shardm2").addEventListener("click", () => {
      var element = document.getElementById("value2").value;
      localStorage.setItem("receiver_id", element);
      openChatBox();
    });
  }
  if (document.getElementById("shardm3")) {
    document.getElementById("shardm3").addEventListener("click", () => {
      var element = document.getElementById("value3").value;
      localStorage.setItem("receiver_id", element);
      openChatBox();
    });
  }
}, 3000);

function topbaricons() {
  var user_id = localStorage.getItem("user_id");

  const url = `${globalURl}/getmembers/${user_id}`;

  let xhr = new XMLHttpRequest();

  xhr.open("GET", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();

  document.querySelector(".imgContainer").innerHTML = "";

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let userData = JSON.parse(xhr.responseText);
      let style = -60;
      let count = 1;
      let z = 1;
      userData.users.slice(0, 3).map((item, i, arr) => {
        var row =
          item.image != null
            ? `
			  <input type="hidden" id="value${z}" value="${item.linked_to_id}"></input>
        <div class="iconMsgPicContainer">
        ${
          item.total_notifications != 0
            ? `<div class="countNum1">${item.total_notifications}</div>`
            : ""
        }
          <img class="new-top-img" id="shardm${count}" src="${item.image}">
          <span class="tooltiptext">${item.username}</span>
          </div>
          `
            : "";

        document.querySelector(".imgContainer").innerHTML += row;
        style = style + 35;
        count = count + 1;
        z = z + 1;
      });
    }
  };
}

setTimeout(() => {
  openChatBox();
  openModal25();
  topbaricons();
}, 1000);

function openChatBox() {
  let isChatIcon = localStorage.getItem("isChatIcon");
  let receiver_id = localStorage.getItem("receiver_id");
  let user_id = localStorage.getItem("user_id");

  if (receiver_id) {
    document.getElementById("nullHeading").style.display = "none";
  }

  if (isChatIcon) {
    localStorage.removeItem("isChatIcon");
    var x = setInterval(() => {
      if (document.querySelector(".userIcon")) {
        clearInterval(x);
        document.querySelectorAll(".userIcon").forEach((ele) => {
          ele.classList.remove("userClicked");
          if (ele.getAttribute("data-receiverId") == receiver_id) {
            document.querySelector(".rightProspectBox").style.display = "none";
            ele.classList.add("userClicked");
            openChatDynamicModal();
          }
        });
      }
    });
  } else {
    var x = setInterval(() => {
      if (document.querySelector(".userIcon")) {
        clearInterval(x);
        document.querySelectorAll(".userIcon").forEach((ele) => {
          ele.classList.remove("userClicked");
          if (ele.getAttribute("data-receiverId") == receiver_id) {
            document.querySelector(".rightProspectBox").style.display = "none";
            ele.classList.add("userClicked");
            openChatDynamicModal();
          }
        });
      }
    });
  }
}

function showSharedProspectChat() {
  let isShared = localStorage.getItem("shared");

  if (isShared) {
    localStorage.removeItem("shared");

    dynamicModalOpenP();
  }
}

setTimeout(() => {
  getChats();
  showSharedProspectChat();
}, 100);

setInterval(() => {
  receivedMessages();
}, 1000);

function receivedMessages() {
  var user_id = localStorage.getItem("user_id");

  var receiver_id = localStorage.getItem("receiver_id");

  let prospect_id = localStorage.getItem("prospect_id");

  const url = `${globalURl}/recieve_messages/${user_id}/${receiver_id}/${prospect_id}`;

  let xhr = new XMLHttpRequest();

  xhr.open("GET", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let userData = JSON.parse(xhr.responseText);

      let userMessages = userData.data;

      let chatMessageContent = document.querySelector(".chatMessageContent");

      if (userMessages) {
        userMessages.map((obj, i) => {
          if (obj.sender_id == user_id) {
            let dbTime = obj.created_at;

            let newDate = new Date();

            let UTCDate = new Date(
              newDate.getUTCFullYear(),
              newDate.getUTCMonth(),
              newDate.getUTCDate(),
              newDate.getUTCHours(),
              newDate.getUTCMinutes(),
              newDate.getUTCSeconds(),
              newDate.getUTCMilliseconds()
            );

            let currentTime = Math.abs((UTCDate.getTime() / 1000).toFixed(0));

            let futureTime = Math.abs(
              (new Date(dbTime).getTime() / 1000).toFixed(0)
            );

            let TimeDifference = currentTime - futureTime;

            let days = Math.floor(TimeDifference / 86400);

            let hours = Math.floor(TimeDifference / 3600) % 24;

            let minutes = Math.floor(TimeDifference / 60) % 60;

            let seconds = Math.floor(TimeDifference % 60);

            let messageTimeString = "";

            if (days == 0) {
              if (hours == 0) {
                if (minutes == 0) {
                  if (seconds == 0) {
                    messageTimeString = `less than a second ago`;
                  } else {
                    messageTimeString =
                      seconds == 1
                        ? `${seconds} second ago`
                        : `${seconds} seconds ago`;
                  }
                } else {
                  messageTimeString =
                    minutes == 1
                      ? `${minutes} minute ago`
                      : `${minutes} minutes ago`;
                }
              } else {
                messageTimeString =
                  hours == 1 ? `${hours} hour ago` : `${hours} hours ago`;
              }
            } else {
              messageTimeString =
                days == 1 ? `${days} day ago` : `${days} days ago`;
            }

            let row = `
            <div style="position: relative; margin-bottom: 30px;">
              <div class='myMessageDiv'>

              <div class="imageNameContainer">
                
                    <span class="senderName">${obj.sender_name}</span>
                    <img src="${obj.sender_image}" class='messageImage'/>
                  
                  </div>

              <i class="far fa-ellipsis-v menuDMIcon"></i>

              <div class='menuBox' style="display: none">
                <div class='editContainer editDMContainer'>
                  <i class="far fa-edit"></i>
                  <h1>Edit</h1>
                </div>
                <div class="deleteContainer deleteDMContainer">
                  <i class="far fa-trash"></i>
                  <h1>Delete</h1>
                </div>
              </div>

              ${
                obj.replied_id != null
                  ? `<div class="prospectReplyDiv">
                  <div class="prospectContentDiv style="${
                    obj.reply_image == null ? "width: 100%;" : ""
                  }" >
                    <h1>${
                      obj.reply_msg != null
                        ? `<h1>${obj.reply_msg}</h1>`
                        : '<h1 style="font-style: italic; font-weight: 400; color: #555; width: auto;"><i class="fas fa-ban blockIcon"></i>The message was deleted</h1>'
                    }</h1>
                  </div>
                  ${
                    obj.reply_image != null
                      ? `<img src="${obj.reply_image}" class="replyImage1"/>`
                      : ""
                  }
                </div>`
                  : ""
              }

                <i class="fas fa-reply myReplyIcon"></i>
                <div style="width: 100%">
                  <p class="messageTxt" data-replied_id=${obj.id}>${
              obj.text
            }</p>
                </div>
                <div class="timestampDiv" style="margin-top: 10px">
                  ${messageTimeString}
                </div>
              </div>
            </div>
          `;
            chatMessageContent.innerHTML += row;

            setTimeout(() => {
              document.querySelectorAll(".menuDMIcon").forEach((ele) => {
                ele?.addEventListener("click", openDmThreeDotMenu);
              });
            }, 100);

            setTimeout(() => {
              document.querySelectorAll(".myReplyIcon").forEach((ele) => {
                ele.addEventListener("click", replyToMessageFn);
              });
            }, 100);
          } else {
            let dbTime = obj.created_at;

            let newDate = new Date();

            let UTCDate = new Date(
              newDate.getUTCFullYear(),
              newDate.getUTCMonth(),
              newDate.getUTCDate(),
              newDate.getUTCHours(),
              newDate.getUTCMinutes(),
              newDate.getUTCSeconds(),
              newDate.getUTCMilliseconds()
            );

            let currentTime = Math.abs((UTCDate.getTime() / 1000).toFixed(0));

            let futureTime = Math.abs(
              (new Date(dbTime).getTime() / 1000).toFixed(0)
            );

            let TimeDifference = currentTime - futureTime;

            let days = Math.floor(TimeDifference / 86400);

            let hours = Math.floor(TimeDifference / 3600) % 24;

            let minutes = Math.floor(TimeDifference / 60) % 60;

            let seconds = Math.floor(TimeDifference % 60);

            let messageTimeString = "";

            if (days == 0) {
              if (hours == 0) {
                if (minutes == 0) {
                  if (seconds == 0) {
                    messageTimeString = `less than a second ago`;
                  } else {
                    messageTimeString =
                      seconds == 1
                        ? `${seconds} second ago`
                        : `${seconds} seconds ago`;
                  }
                } else {
                  messageTimeString =
                    minutes == 1
                      ? `${minutes} minute ago`
                      : `${minutes} minutes ago`;
                }
              } else {
                messageTimeString =
                  hours == 1 ? `${hours} hour ago` : `${hours} hours ago`;
              }
            } else {
              messageTimeString =
                days == 1 ? `${days} day ago` : `${days} days ago`;
            }

            let row = `
            <div style="position: relative; margin-bottom: 30px;">
              <div class='userMessageDiv'>
              <div class="imageNameContainer1">
                
              <img src="${obj.sender_image}" class='messageImage'/>
              <span class="senderName">${obj.sender_name}</span>
                  
                  </div>
              ${
                obj.replied_id != null
                  ? `<div class="prospectReplyDiv1">
                  <div class="prospectContentDiv" style="${
                    obj.reply_image == null ? "width: 100%;" : ""
                  }">
                    <h1>${
                      obj.reply_msg != null
                        ? `<h1>${obj.reply_msg}</h1>`
                        : '<h1 style="font-style: italic; font-weight: 400; color: #555; width: auto;"><i class="fas fa-ban blockIcon"></i>The message was deleted</h1>'
                    }</h1>
                  </div>
                  ${
                    obj.reply_image != null
                      ? `<img src="${obj.reply_image}" class="replyImage1"/>`
                      : ""
                  }
                </div>`
                  : ""
              }

                <i class="fas fa-reply replyIcon"></i>
                <div style="width: 100%"> 
                  <p class="messageTxt" data-replied_id=${obj.id}>${
              obj.text
            }</p>
                </div>
                <div class="timestampUserDiv" style="margin-top: 10px">
                  ${messageTimeString}
                </div>
              </div>
            </div>
          `;
            chatMessageContent.innerHTML += row;
          }

          chatMessageContent.scroll(0, chatMessageContent.scrollHeight);
        });

        let replyInterval = setInterval(() => {
          if (document.querySelector(".replyIcon"))
            clearInterval(replyInterval);
          document.querySelectorAll(".replyIcon").forEach((item) => {
            item.addEventListener("click", replyToMessageFn);
          });
        }, 500);
      }
    }
  };
}

let leftBox__container = document.querySelector(".leftBox__container");

var userActive = null;

function getChats() {
  var user_id = localStorage.getItem("user_id");

  const url = `${globalURl}/chats/${user_id}`;

  let xhr = new XMLHttpRequest();

  xhr.open("GET", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();

  xhr.onreadystatechange = function () {
    //Call a function when the state changes.
    if (xhr.readyState == 4 && xhr.status == 200) {
      let userData = JSON.parse(xhr.responseText);

      userActive = userData;

      userData.map((item, i, arr) => {
        var row = `${
          item.image != null
            ? `<div style="position: relative;">
                  <img src=${item.image} class='userIcon' data-receiverId=${
                item.linked_to_id
              } />
                  ${
                    item.total_notifications != 0
                      ? `<div class="chatNotificationBox">${item.total_notifications}</div>`
                      : ""
                  }
              </div>`
            : `<div class="userIcon" data-receiverId=${item.linked_to_id}>
                <span>${item.letters}</span>
                ${
                  item.total_notifications != 0
                    ? `<div class="chatNotificationBox">${item.total_notifications}</div>`
                    : ""
                }
              </div>`
        }
          `;

        leftBox__container.innerHTML += row;
      });

      leftBox__container.innerHTML += `
      <div class="customHr"></div>
      <div class="groupDiv"><i class="fas fa-users groupIcon"></i></div>
      `;
    }
    document.querySelectorAll(".userIcon").forEach((element) => {
      element.addEventListener("click", activeUserChat);
    });

    if (document.querySelector(".groupDiv")) {
      document
        .querySelector(".groupDiv")
        .addEventListener("click", fetchGroupInfo);
    }
  };
}

function fetchGroupInfo() {
  localStorage.removeItem("nullGroupChat");
  localStorage.removeItem("dmNullChats");
  localStorage.removeItem("sub_group_id");
  localStorage.removeItem("group_name");
  localStorage.removeItem("editGroupName");
  localStorage.removeItem("sub_group")

  document.getElementById("subGroupNamePara").style.display = "none";

  document.getElementById("sendMsgBtn").style.display = "none";
  document.getElementById("sendGroupMsgBtn").style.display = "block";
  document.getElementById("updateMsgBtn").style.display = "none";
  document.getElementById("updateGroupMsgBtn").style.display = "none";
  document.getElementById("cancelMsgBtn").style.display = "none";
  document.getElementById("cancelGroupMsgBtn").style.display = "none";

  document.querySelector(".rightBox").style.display = "none";
  document.querySelector(".groupContainer").style.display = "block";

  document.getElementById("noGroupHeading").style.display = "none";

  document.querySelector(".showBtnContainer").innerHTML = "";

  document.querySelectorAll(".userIcon").forEach((ele) => {
    ele.classList.remove("userClicked");
  });

  document.querySelector(".groupDiv").classList.add("groupDivClicked");

  var user_id = localStorage.getItem("user_id");

  const url = `${globalURl}/check_groups/${user_id}/0`;

  let xhr = new XMLHttpRequest();

  xhr.open("GET", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();

  xhr.onreadystatechange = function () {
    //Call a function when the state changes.
    if (xhr.readyState == 4 && xhr.status == 200) {
      let userData = JSON.parse(xhr.responseText);

      groupUsersArr = userData.users;

      if (userData.length > 0) {
        document.querySelector(".groupBoxContainer").innerHTML = "";
        userData.map((item) => {
          document.querySelector(".groupBoxContainer").innerHTML += `
                <div style="position: relative;">

                <div class="groupBox" data-group_id=${item.group_id}>
                <span class="tooltiptext"><span style="color:red">Name: </span>${
                  item.name
                }
                <br> <span style="color:red">Total prospects: </span>${
                  item.prospects
                }
                </span>

                ${item.members
                  .slice(0, 4)
                  .map((ele) => {
                    return `<img src="${ele}" class="userIconDemo" data-receiverid="32">`;
                  })
                  .join("")}
                  ${
                    item.notifications != 0
                      ? `<div class="notificationBox">${item.notifications}</div> `
                      : ""
                  }
                  </div>
                  <div class="groupName">${
                    item.name.length > 10
                      ? `${item.name.slice(0, 10)} ...`
                      : item.name
                  }</div>
                  ${
                    item.admin != false
                      ? `<div class="deleteGroupBox"><i class="fas fa-trash groupDeleteIcon"></i></div>`
                      : ""
                  }
                  <div class="leaveGroupBox"><i class="fas fa-user-minus"></i></div>
                </div>
            `;
        });
        document.querySelectorAll(".groupBox").forEach((ele) => {
          ele.addEventListener("click", () => {
            localStorage.setItem("group_id", ele.getAttribute("data-group_id"));
            dynamicModalOpenP();
          });
        });

        document.querySelectorAll(".deleteGroupBox").forEach((ele) => {
          ele.addEventListener("click", groupDeleteion);
        });
        document.querySelectorAll(".leaveGroupBox").forEach((ele) => {
          ele.addEventListener("click", groupleaveion);
        });
      } else {
        document.querySelector(".groupBoxContainer").innerHTML = "";
        document.getElementById("noGroupHeading").style.display = "block";
      }
    }
  };
}

setInterval(() => {
  var modalUserList = document.querySelectorAll(".chatContent");

  if (modalUserList) {
    modalUserList.forEach((element) => {
      element.addEventListener("click", activeClassInject);
    });
  }
}, 100);

var modalContainer1 = document.querySelector(".startChatModalOverlay");

var modalContainer2 = document.querySelector(".startChatModalOverlay1");

if (document.querySelector(".addFriendIcon")) {
  document
    .querySelector(".addFriendIcon")
    .addEventListener("click", openModal1);
}

if (document.querySelector(".closeDiv")) {
  document.querySelector(".closeDiv").addEventListener("click", closeModal1);
}

if (document.querySelector(".addUser")) {
  document.querySelector(".addUser").addEventListener("click", openModal2);
}
if (document.querySelector(".styleSubGroup")) {
  document
    .querySelector(".styleSubGroup")
    .addEventListener("click", openModal100);
}

if (document.querySelector(".closeDiv1")) {
  document.querySelector(".closeDiv1").addEventListener("click", closeModal2);
}

function getUserMessages() {
  document.querySelector(".rightUperRight").innerHTML = "";
  document.querySelector(".rightUpperBox").style.display = "flex";
  document.querySelector(".chatMessageContent").style.display = "block";
  document.querySelector(".chatControlBtn").style.display = "block";

  var user_id = localStorage.getItem("user_id");

  var receiver_id = localStorage.getItem("receiver_id");

  const url = `${globalURl}/chating/${user_id}/${receiver_id}`;

  let xhr = new XMLHttpRequest();

  xhr.open("GET", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let userMessages = JSON.parse(xhr.responseText);

      if (userMessages) {
        if (userMessages.image != null) {
          document.querySelector(".rightUperLeft").style.width = "30px";
          document.querySelector(".rightUperLeft").style.height = "30px";
          document.querySelector(".rightUperLeft").style.border = "none";
        } else {
          document.querySelector(".rightUperLeft").style.width = "25px";
          document.querySelector(".rightUperLeft").style.height = "25px";
          document.querySelector(".rightUperLeft").style.border =
            "1px solid #999";
        }
        document.querySelector(".rightUperLeft").innerHTML = `
          ${
            userMessages.image != null
              ? `<img src=${userMessages.image} />`
              : `<i class='fas fa-user'></i>`
          }
        `;
        document.querySelector(".rightUperRight").innerHTML = `
                  <p id="userEmail">${userMessages.email}</p>
        `;
      }

      let chatMessageContent = document.querySelector(".chatMessageContent");
      chatMessageContent.innerHTML = "";
      if (userMessages.data) {
        userMessages.data.map((obj, i) => {
          if (obj.sender_id == user_id) {
            let dbTime = obj.created_at;

            let newDate = new Date();

            let UTCDate = new Date(
              newDate.getUTCFullYear(),
              newDate.getUTCMonth(),
              newDate.getUTCDate(),
              newDate.getUTCHours(),
              newDate.getUTCMinutes(),
              newDate.getUTCSeconds(),
              newDate.getUTCMilliseconds()
            );

            let currentTime = Math.abs((UTCDate.getTime() / 1000).toFixed(0));

            let futureTime = Math.abs(
              (new Date(dbTime).getTime() / 1000).toFixed(0)
            );

            let TimeDifference = currentTime - futureTime;

            let days = Math.floor(TimeDifference / 86400);

            let hours = Math.floor(TimeDifference / 3600) % 24;

            let minutes = Math.floor(TimeDifference / 60) % 60;

            let seconds = Math.floor(TimeDifference % 60);

            let messageTimeString = "";

            if (days == 0) {
              if (hours == 0) {
                if (minutes == 0) {
                  if (seconds == 0) {
                    messageTimeString = `less than a second ago`;
                  } else {
                    messageTimeString =
                      seconds == 1
                        ? `${seconds} second ago`
                        : `${seconds} seconds ago`;
                  }
                } else {
                  messageTimeString =
                    minutes == 1
                      ? `${minutes} minute ago`
                      : `${minutes} minutes ago`;
                }
              } else {
                messageTimeString =
                  hours == 1 ? `${hours} hour ago` : `${hours} hours ago`;
              }
            } else {
              messageTimeString =
                days == 1 ? `${days} day ago` : `${days} days ago`;
            }

            let row = `
            <div style="position: relative; margin-bottom: 30px;">
              <div class='myMessageDiv'>

              <div class="imageNameContainer">
                
              <span class="senderName">${obj.sender_name}</span>
              <img src="${obj.sender_image}" class='messageImage'/>
                  
                  </div>

              <i class="far fa-ellipsis-v menuDMIcon"></i>

              <div class='menuBox' style="display: none">
                <div class='editContainer editDMContainer'>
                  <i class="far fa-edit"></i>
                  <h1>Edit</h1>
                </div>
                <div class="deleteContainer deleteDMContainer">
                  <i class="far fa-trash"></i>
                  <h1>Delete</h1>
                </div>
              </div>

                ${
                  obj.replied_id != null
                    ? `<div class="prospectReplyDiv">
                    <div class="prospectContentDiv" style="${
                      obj.reply_image == null ? "width: 100%;" : ""
                    }">
                      <h1>${
                        obj.reply_msg != null
                          ? `<h1>${obj.reply_msg}</h1>`
                          : '<h1 style="font-style: italic; font-weight: 400; color: #555; width: auto;"><i class="fas fa-ban blockIcon"></i>The message was deleted</h1>'
                      }</h1>
                    </div>
                    ${
                      obj.reply_image != null
                        ? `<img src="${obj.reply_image}" class="replyImage1"/>`
                        : ""
                    }
                  </div>`
                    : ""
                }
                ${
                  obj.prospect_id != null
                    ? `<div class="prospectDiv" data-id=${obj.prospect_id} data-link=${obj.url}>
                  <img src=${obj.image} alt="model pic"/>
                  <div class="prospectContentDiv">
                    <h1>${obj.name}</h1>
                    <h2>${obj.company}</h2>
                  </div>
                </div>`
                    : ""
                }

                <i class="fas fa-reply myReplyIcon"></i>
                <div style="width: 100%">
                  <p class="messageTxt" data-replied_id=${obj.id}>${
              obj.text
            }</p>
                </div>
                <div class="timestampDiv" style="margin-top: 10px">
                  ${messageTimeString}
                </div>
              </div>
            </div>
            `;
            chatMessageContent.innerHTML += row;

            setTimeout(() => {
              document.querySelectorAll(".menuDMIcon").forEach((ele) => {
                ele?.addEventListener("click", openDmThreeDotMenu);
              });
            }, 100);

            setTimeout(() => {
              document.querySelectorAll(".myReplyIcon").forEach((ele) => {
                ele.addEventListener("click", replyToMessageFn);
              });
            }, 100);
          } else {
            let dbTime = obj.created_at;

            let newDate = new Date();

            let UTCDate = new Date(
              newDate.getUTCFullYear(),
              newDate.getUTCMonth(),
              newDate.getUTCDate(),
              newDate.getUTCHours(),
              newDate.getUTCMinutes(),
              newDate.getUTCSeconds(),
              newDate.getUTCMilliseconds()
            );

            let currentTime = Math.abs((UTCDate.getTime() / 1000).toFixed(0));

            let futureTime = Math.abs(
              (new Date(dbTime).getTime() / 1000).toFixed(0)
            );

            let TimeDifference = currentTime - futureTime;

            let days = Math.floor(TimeDifference / 86400);

            let hours = Math.floor(TimeDifference / 3600) % 24;

            let minutes = Math.floor(TimeDifference / 60) % 60;

            let seconds = Math.floor(TimeDifference % 60);

            let messageTimeString = "";

            if (days == 0) {
              if (hours == 0) {
                if (minutes == 0) {
                  if (seconds == 0) {
                    messageTimeString = `less than a second ago`;
                  } else {
                    messageTimeString =
                      seconds == 1
                        ? `${seconds} second ago`
                        : `${seconds} seconds ago`;
                  }
                } else {
                  messageTimeString =
                    minutes == 1
                      ? `${minutes} minute ago`
                      : `${minutes} minutes ago`;
                }
              } else {
                messageTimeString =
                  hours == 1 ? `${hours} hour ago` : `${hours} hours ago`;
              }
            } else {
              messageTimeString =
                days == 1 ? `${days} day ago` : `${days} days ago`;
            }

            let row = `
            <div style="position: relative; margin-bottom: 30px;">
              <div class='userMessageDiv'>
              <div class="imageNameContainer1">
                
              <img src="${obj.sender_image}" class='messageImage'/>
              <span class="senderName">${obj.sender_name}</span>
                  
                  </div>

              ${
                obj.replied_id != null
                  ? `<div class="prospectReplyDiv">
                  <div class="prospectContentDiv" style="${
                    obj.reply_image == null ? "width: 100%;" : ""
                  }">
                    <h1>${
                      obj.reply_msg != null
                        ? `<h1>${obj.reply_msg}</h1>`
                        : '<h1 style="font-style: italic; font-weight: 400; color: #555; width: auto;"><i class="fas fa-ban blockIcon"></i>The message was deleted</h1>'
                    }</h1>
                  </div>
                  ${
                    obj.reply_image != null
                      ? `<img src="${obj.reply_image}" class="replyImage1"/>`
                      : ""
                  }
                </div>`
                  : ""
              }
              ${
                obj.prospect_id != null
                  ? `<div class="prospectDiv1" data-id=${obj.prospect_id} data-link=${obj.url}>
                  <img src=${obj.image} alt="model pic"/>
                  <div class="prospectContentDiv">
                    <h1>${obj.name}</h1>
                    <h2>${obj.company}</h2>
                  </div>
                </div>`
                  : ""
              }

                <i class="fas fa-reply replyIcon"></i>
                <div style="width: 100%">
                  <p class="messageTxt" data-replied_id=${obj.id}>${
              obj.text
            }</p>
                </div>
                <div class="timestampUserDiv" style="margin-top: 10px">
                  ${messageTimeString}
                </div>
              </div>
            </div>
            `;
            chatMessageContent.innerHTML += row;
          }

          chatMessageContent.scroll(0, chatMessageContent.scrollHeight);
        });

        let prospectInterval1 = setInterval(() => {
          if (document.querySelector(".prospectDiv"))
            clearInterval(prospectInterval1);
          document.querySelectorAll(".prospectDiv").forEach((item) => {
            item.addEventListener("click", openProspectPage);
          });
        }, 500);

        let prospectInterval2 = setInterval(() => {
          if (document.querySelector(".prospectDiv1"))
            clearInterval(prospectInterval2);
          document.querySelectorAll(".prospectDiv1").forEach((item) => {
            item.addEventListener("click", openProspectPage);
          });
        }, 500);

        let replyInterval = setInterval(() => {
          if (document.querySelector(".replyIcon"))
            clearInterval(replyInterval);
          document.querySelectorAll(".replyIcon").forEach((item) => {
            item.addEventListener("click", replyToMessageFn);
          });
        }, 500);
      }
    }
  };
}

function replyToMessageFn(e) {
  document.querySelectorAll(".replyIcon").forEach((ele) => {
    ele.classList.remove("replyIconClicked");
  });

  document.querySelectorAll(".myReplyIcon").forEach((ele) => {
    ele.classList.remove("replyIconClicked");
  });

  e.currentTarget.classList.add("replyIconClicked");

  console.log(e.currentTarget);

  let replied_id = e.target.parentElement
    .querySelector(".messageTxt")
    .getAttribute("data-replied_id");

  localStorage.setItem("replied_id", replied_id);
}

function openProspectPage(e) {
  let prospect_link = e.currentTarget.getAttribute("data-link");

  let params = {
    active: true,
    currentWindow: true,
  };
  chrome.tabs.query(params, gotTab);

  function gotTab(tabs) {
    let msg = {
      txt: prospect_link,
    };
    chrome.tabs.sendMessage(tabs[0].id, msg);
  }
}

function activeUserChat(e) {
  localStorage.removeItem("group_id");
  localStorage.removeItem("replied_id");
  localStorage.removeItem("sub_group")

  var receiver_id = e.target.getAttribute("data-receiverId");

  localStorage.setItem("receiver_id", receiver_id);

  openChatDynamicModal();

  // getUserMessages();
}

function openChatDynamicModal() {
  document.getElementById("dynamicModalH1").innerText = "Prospects";

  document.getElementById("subGroupNamePara").style.display = "none";

  localStorage.removeItem("replied_id");

  dynamicModal.style.transform = "scale(1)";
  dynamicModal.style.opacity = 1;

  var user_id = localStorage.getItem("user_id");
  var receiver_id = localStorage.getItem("receiver_id");

  const url = `${globalURl}/chating_prospects/${user_id}/${receiver_id}`;

  let xhr = new XMLHttpRequest();

  xhr.open("GET", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();

  xhr.onreadystatechange = function () {
    //Call a function when the state changes.
    if (xhr.readyState == 4 && xhr.status == 200) {
      let userData = JSON.parse(xhr.responseText);

      if (userData.data) {
        document.querySelector(".dynamicContainer").innerHTML = "";
        userData.data.map((ele) => {
          if (ele.prospect_data) {
            document.querySelector(".dynamicContainer").innerHTML += `
                <div class="prospectContentContainer">
                  <div class="prospectContent prospectChatContent1" data-prospect_id=${
                    ele.prospect_id
                  }>
                              
                    <img src=${ele.prospect_data.image} alt=""/>
      
                    <div>
                      <h1>${ele.prospect_data.name}</h1>
                      <h2>${
                        ele.sender_name != null
                          ? `By ${ele.sender_name} ${
                              ele.database != null ? `from ${ele.database}` : ""
                            }`
                          : ""
                      }</h2>
                    </div>
                    
                    ${
                      ele.notifications != 0 && ele.notifications != null
                        ? `<span>${ele.notifications}</span>`
                        : ""
                    }

                  </div>
                  <i class="fas fa-trash prospectDeleteIcon chatProspectDelete"></i>
                </div>
                  `;
          }
        });

        document.querySelector(".dynamicContainer").innerHTML += `
            <div class="prospectContent1 prospectNullChats">
                <h1>No Prospect Chats</h1>
                ${
                  userData.null_notifications != 0 &&
                  userData.null_notifications != null
                    ? `<span>${userData.null_notifications}</span>`
                    : ""
                }
            </div>
          `;

        document.querySelectorAll(".chatProspectDelete").forEach((ele) => {
          ele.addEventListener("click", chatProspectDelete);
        });

        document
          .querySelectorAll(".prospectChatContent1")
          .forEach((element) => {
            element.addEventListener("click", (e) => showProspectChatMember(e));
          });
      } else {
        document.querySelector(".dynamicContainer").innerHTML = `
              <div class="prospectContent1 prospectNullChats">
                  <h1>No Prospect Chats</h1>
                  ${
                    userData.null_notifications != 0 &&
                    userData.null_notifications != null
                      ? `<span>${userData.null_notifications}</span>`
                      : ""
                  }
              </div>
              `;
      }
      document.querySelectorAll(".prospectNullChats").forEach((ele) => {
        ele.addEventListener("click", showNullMembersChats);
      });
    }
  };
}

function chatProspectDelete(e) {
  document.getElementById("sendMsgBtn").style.display = "block";
  document.getElementById("sendGroupMsgBtn").style.display = "none";
  document.getElementById("updateMsgBtn").style.display = "none";
  document.getElementById("updateGroupMsgBtn").style.display = "none";
  document.getElementById("cancelMsgBtn").style.display = "none";
  document.getElementById("cancelGroupMsgBtn").style.display = "none";
  document.getElementById("sendSubGroupMsgBtn").style.display = "none";
  document.getElementById("updateSubGroupMsgBtn").style.display = "none";
  document.getElementById("cancelSubGroupMsgBtn").style.display = "none";

  let currentProspect = e.currentTarget.parentElement;

  let user_id = localStorage.getItem("user_id");
  let second_user_id = localStorage.getItem("receiver_id");
  let prospect_id = currentProspect
    .querySelector(".prospectContent")
    .getAttribute("data-prospect_id");

  const url = `${globalURl}/delete_chat_prospect`;

  let xhr = new XMLHttpRequest();

  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(
    JSON.stringify({
      user_id,
      second_user_id,
      prospect_id,
    })
  );

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let userData = JSON.parse(xhr.responseText);

      if (userData.status == "Deleted") {
        openChatDynamicModal();
      }
    }
  };
}

function showProspectChatMember(e) {
  localStorage.removeItem("nullGroupChat");
  localStorage.removeItem("dmNullChats");
  localStorage.removeItem("sub_group_id");
  localStorage.removeItem("group_name");
  localStorage.removeItem("editGroupName");

  document.getElementById("nullHeading").style.display = "none";
  document.querySelector(".dynamicContainer").innerHTML = "";
  prospectModalClose();
  dynamicModalClose();

  document.getElementById("nullHeading").style.display = "none";
  document.querySelector(".groupDiv").classList.remove("groupDivClicked");
  document.querySelector(".groupContainer").style.display = "none";
  document.querySelector(".rightBox").style.display = "block";
  document.querySelector(".rightProspectBox").style.display = "none";
  document.querySelector(".rightUpperBox").style.display = "block";
  document.querySelector(".chatMessageContent").innerHTML = "";
  document.querySelector(".chatMessageContent").style.height = "275px";
  document.getElementById("sendMsgBtn").style.display = "block";
  document.getElementById("sendGroupMsgBtn").style.display = "none";
  document.getElementById("sendSubGroupMsgBtn").style.display = "none";
  document.getElementById("msgInp").value = "";

  document.querySelector(".searchBoxContainer").style.display = "none";

  let prospectId = e.currentTarget.getAttribute("data-prospect_id");

  document.getElementById("prospectImage").src = "./Assets/img/user.png";
  document.getElementById("prospectName").innerText = "";
  document.getElementById("companyName").innerText = "";
  document.getElementById("descriptionName").innerText = "";
  document.getElementById("prospectImage").setAttribute("data-link", "");

  document.getElementById("msgInp").value = "";

  var user_id = localStorage.getItem("user_id");
  var receiver_id = localStorage.getItem("receiver_id");

  document.querySelectorAll(".userIcon").forEach((ele) => {
    ele.classList.remove("userClicked");

    if (ele.getAttribute("data-receiverid") == receiver_id) {
      document.querySelector(".leftBox__container").innerHTML = "";
      getChats();
    }
  });

  setTimeout(() => {
    let activeInterval = setInterval(() => {
      if (document.querySelector(".userIcon")) {
        clearInterval(activeInterval);
        document.querySelectorAll(".userIcon").forEach((item) => {
          if (item.getAttribute("data-receiverid") == receiver_id) {
            item.classList.add("userClicked");
            let parentElement = item.parentElement;

            if (parentElement.querySelector(".chatNotificationBox")) {
              parentElement.querySelector(".chatNotificationBox").remove();
            }
          }
        });
      }
    }, 100);
  }, 500);

  const url = `${globalURl}/chat_prospects/${user_id}/${receiver_id}/${prospectId}`;

  let xhr = new XMLHttpRequest();

  xhr.open("GET", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let userMessages = JSON.parse(xhr.responseText);

      document.querySelector(".rightUperRight").innerHTML = "";
      document.querySelector(".rightUpperBox").style.display = "flex";
      document.querySelector(".chatMessageContent").style.display = "block";
      document.querySelector(".chatControlBtn").style.display = "block";

      localStorage.setItem("prospect_id", userMessages.prospect_data.id);

      if (userMessages) {
        if (userMessages.image != null) {
          document.querySelector(".rightUperLeft").style.width = "30px";
          document.querySelector(".rightUperLeft").style.height = "30px";
          document.querySelector(".rightUperLeft").style.border = "none";
        } else {
          document.querySelector(".rightUperLeft").style.width = "25px";
          document.querySelector(".rightUperLeft").style.height = "25px";
          document.querySelector(".rightUperLeft").style.border =
            "1px solid #999";
        }
        document.querySelector(".rightUperLeft").innerHTML = `
          ${
            userMessages.image != null
              ? `<img src=${userMessages.image} />`
              : `<i class='fas fa-user'></i>`
          }
        `;
        document.querySelector(".rightUperRight").innerHTML = `
                  <p id="userEmail">${userMessages.email}</p>
        `;
      }

      let chatMessageContent = document.querySelector(".chatMessageContent");
      chatMessageContent.innerHTML = "";
      if (userMessages.data) {
        chatMessageContent.innerHTML += `
          
          <div class="prospectTopDiv" data-id=${
            userMessages.prospect_data.id
          } data-link=${userMessages.prospect_data.profile_link}>
            <img src=${userMessages.prospect_data.image} alt="model pic"/>
            <div class="prospectContentDiv" style="width: 100%">
              <h1>${userMessages.prospect_data.name}</h1>
              <h2>${
                userMessages.prospect_data.company != null
                  ? userMessages.prospect_data.company
                  : "No company name"
              }</h2>
              <h3 class="dbMessageDM">${
                userMessages.sender_name != null
                  ? `Clipper: ${userMessages.sender_name} ${
                      userMessages.database != null
                        ? `, Database: ${userMessages.database}`
                        : ""
                    }`
                  : ""
              }</h3>
            </div>
          </div>`;

        userMessages.data.map((obj, i) => {
          if (obj.sender_id == user_id) {
            let dbTime = obj.created_at;

            let newDate = new Date();

            let UTCDate = new Date(
              newDate.getUTCFullYear(),
              newDate.getUTCMonth(),
              newDate.getUTCDate(),
              newDate.getUTCHours(),
              newDate.getUTCMinutes(),
              newDate.getUTCSeconds(),
              newDate.getUTCMilliseconds()
            );

            let currentTime = Math.abs((UTCDate.getTime() / 1000).toFixed(0));

            let futureTime = Math.abs(
              (new Date(dbTime).getTime() / 1000).toFixed(0)
            );

            let TimeDifference = currentTime - futureTime;

            let days = Math.floor(TimeDifference / 86400);

            let hours = Math.floor(TimeDifference / 3600) % 24;

            let minutes = Math.floor(TimeDifference / 60) % 60;

            let seconds = Math.floor(TimeDifference % 60);

            let messageTimeString = "";

            if (days == 0) {
              if (hours == 0) {
                if (minutes == 0) {
                  if (seconds == 0) {
                    messageTimeString = `less than a second ago`;
                  } else {
                    messageTimeString =
                      seconds == 1
                        ? `${seconds} second ago`
                        : `${seconds} seconds ago`;
                  }
                } else {
                  messageTimeString =
                    minutes == 1
                      ? `${minutes} minute ago`
                      : `${minutes} minutes ago`;
                }
              } else {
                messageTimeString =
                  hours == 1 ? `${hours} hour ago` : `${hours} hours ago`;
              }
            } else {
              messageTimeString =
                days == 1 ? `${days} day ago` : `${days} days ago`;
            }

            let row = `
            <div style="position: relative; margin-bottom: 30px;">
              <div class='myMessageDiv'>

              <div class="imageNameContainer">
                
              <span class="senderName">${obj.sender_name}</span>
              <img src="${obj.sender_image}" class='messageImage'/>
                  
                  </div>

              <i class="far fa-ellipsis-v menuDMIcon"></i>

              <div class='menuBox' style="display: none">
                <div class='editContainer editDMContainer'>
                  <i class="far fa-edit"></i>
                  <h1>Edit</h1>
                </div>
                <div class="deleteContainer deleteDMContainer">
                  <i class="far fa-trash"></i>
                  <h1>Delete</h1>
                </div>
              </div>

                ${
                  obj.replied_id != null
                    ? `<div class="prospectReplyDiv">
                    <div class="prospectContentDiv" style="${
                      obj.reply_image == null ? "width: 100%;" : ""
                    }">
                      <h1>${
                        obj.reply_msg != null
                          ? `<h1>${obj.reply_msg}</h1>`
                          : '<h1 style="font-style: italic; font-weight: 400; color: #555; width: auto;"><i class="fas fa-ban blockIcon"></i>The message was deleted</h1>'
                      }</h1>
                    </div>
                    ${
                      obj.reply_image != null
                        ? `<img src="${obj.reply_image}" class="replyImage1"/>`
                        : ""
                    }
                  </div>`
                    : ""
                }

                <i class="fas fa-reply myReplyIcon"></i>
                <div style="width: 100%">
                  <p class="messageTxt" data-replied_id=${obj.id}>${
              obj.text
            }</p>
                </div>
                <div class="timestampDiv" style="margin-top: 10px">
                  ${messageTimeString}
                </div>
              </div>
            </div>
            `;
            chatMessageContent.innerHTML += row;

            setTimeout(() => {
              document.querySelectorAll(".menuDMIcon").forEach((ele) => {
                ele?.addEventListener("click", openDmThreeDotMenu);
              });
            }, 100);

            setTimeout(() => {
              document.querySelectorAll(".myReplyIcon").forEach((ele) => {
                ele.addEventListener("click", replyToMessageFn);
              });
            }, 100);
          } else {
            let dbTime = obj.created_at;

            let newDate = new Date();

            let UTCDate = new Date(
              newDate.getUTCFullYear(),
              newDate.getUTCMonth(),
              newDate.getUTCDate(),
              newDate.getUTCHours(),
              newDate.getUTCMinutes(),
              newDate.getUTCSeconds(),
              newDate.getUTCMilliseconds()
            );

            let currentTime = Math.abs((UTCDate.getTime() / 1000).toFixed(0));

            let futureTime = Math.abs(
              (new Date(dbTime).getTime() / 1000).toFixed(0)
            );

            let TimeDifference = currentTime - futureTime;

            let days = Math.floor(TimeDifference / 86400);

            let hours = Math.floor(TimeDifference / 3600) % 24;

            let minutes = Math.floor(TimeDifference / 60) % 60;

            let seconds = Math.floor(TimeDifference % 60);

            let messageTimeString = "";

            if (days == 0) {
              if (hours == 0) {
                if (minutes == 0) {
                  if (seconds == 0) {
                    messageTimeString = `less than a second ago`;
                  } else {
                    messageTimeString =
                      seconds == 1
                        ? `${seconds} second ago`
                        : `${seconds} seconds ago`;
                  }
                } else {
                  messageTimeString =
                    minutes == 1
                      ? `${minutes} minute ago`
                      : `${minutes} minutes ago`;
                }
              } else {
                messageTimeString =
                  hours == 1 ? `${hours} hour ago` : `${hours} hours ago`;
              }
            } else {
              messageTimeString =
                days == 1 ? `${days} day ago` : `${days} days ago`;
            }

            let row = `
            <div style="position: relative; margin-bottom: 30px;">
              <div class='userMessageDiv'>
              
              <div class="imageNameContainer1">
                
              <img src="${obj.sender_image}" class='messageImage'/>
              <span class="senderName">${obj.sender_name}</span>
                  
                  </div>

              ${
                obj.replied_id != null
                  ? `<div class="prospectReplyDiv1">
                  <div class="prospectContentDiv" style="${
                    obj.reply_image == null ? "width: 100%;" : ""
                  }">
                    <h1>${
                      obj.reply_msg != null
                        ? `<h1>${obj.reply_msg}</h1>`
                        : '<h1 style="font-style: italic; font-weight: 400; color: #555; width: auto;"><i class="fas fa-ban blockIcon"></i>The message was deleted</h1>'
                    }</h1>
                  </div>
                  ${
                    obj.reply_image != null
                      ? `<img src="${obj.reply_image}" class="replyImage1"/>`
                      : ""
                  }
                </div>`
                  : ""
              }

                <i class="fas fa-reply replyIcon"></i>
                <div style="width: 100%">
                  <p class="messageTxt" data-replied_id=${obj.id}>${
              obj.text
            }</p>
                </div>
                <div class="timestampUserDiv" style="margin-top: 10px">
                  ${messageTimeString}
                </div>
              </div>
            </div>
            `;
            chatMessageContent.innerHTML += row;
          }

          chatMessageContent.scroll(0, chatMessageContent.scrollHeight);
        });

        let prospectInterval1 = setInterval(() => {
          if (document.querySelector(".prospectTopDiv"))
            clearInterval(prospectInterval1);
          document.querySelectorAll(".prospectTopDiv").forEach((item) => {
            item.addEventListener("click", openProspectPage);
          });
        }, 500);

        let prospectInterval2 = setInterval(() => {
          if (document.querySelector(".prospectDiv1"))
            clearInterval(prospectInterval2);
          document.querySelectorAll(".prospectDiv1").forEach((item) => {
            item.addEventListener("click", openProspectPage);
          });
        }, 500);

        let replyInterval = setInterval(() => {
          if (document.querySelector(".replyIcon"))
            clearInterval(replyInterval);
          document.querySelectorAll(".replyIcon").forEach((item) => {
            item.addEventListener("click", replyToMessageFn);
          });
        }, 500);
      }
    }
  };
}

function showNullMembersChats() {
  localStorage.setItem("dmNullChats", true);
  localStorage.removeItem("sub_group_id");
  localStorage.removeItem("group_name");
  localStorage.removeItem("editGroupName");

  document.getElementById("sendMsgBtn").style.display = "block";
  document.getElementById("sendGroupMsgBtn").style.display = "none";
  document.getElementById("updateMsgBtn").style.display = "none";
  document.getElementById("updateGroupMsgBtn").style.display = "none";
  document.getElementById("cancelMsgBtn").style.display = "none";
  document.getElementById("cancelGroupMsgBtn").style.display = "none";
  document.getElementById("sendSubGroupMsgBtn").style.display = "none";
  document.getElementById("updateSubGroupMsgBtn").style.display = "none";
  document.getElementById("cancelSubGroupMsgBtn").style.display = "none";

  document.getElementById("nullHeading").style.display = "none";
  document.querySelector(".dynamicContainer").innerHTML = "";
  prospectModalClose();
  dynamicModalClose();

  document.getElementById("nullHeading").style.display = "none";
  document.querySelector(".groupDiv").classList.remove("groupDivClicked");
  document.querySelector(".groupContainer").style.display = "none";
  document.querySelector(".rightBox").style.display = "block";
  document.querySelector(".rightProspectBox").style.display = "none";
  document.querySelector(".rightUpperBox").style.display = "block";
  document.querySelector(".chatMessageContent").innerHTML = "";
  document.querySelector(".chatMessageContent").style.height = "275px";
  document.getElementById("sendMsgBtn").style.display = "block";
  document.getElementById("sendGroupMsgBtn").style.display = "none";
  document.getElementById("msgInp").value = "";

  document.querySelector(".searchBoxContainer").style.display = "none";

  var user_id = localStorage.getItem("user_id");
  var receiver_id = localStorage.getItem("receiver_id");

  document.querySelectorAll(".userIcon").forEach((ele) => {
    ele.classList.remove("userClicked");

    if (ele.getAttribute("data-receiverid") == receiver_id) {
      ele.classList.add("userClicked");
    }
  });

  localStorage.removeItem("prospect_id");

  const url = `${globalURl}/chating_null/${user_id}/${receiver_id}`;

  let xhr = new XMLHttpRequest();

  xhr.open("GET", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let userMessages = JSON.parse(xhr.responseText);

      document.querySelector(".rightUperRight").innerHTML = "";
      document.querySelector(".rightUpperBox").style.display = "flex";
      document.querySelector(".chatMessageContent").style.display = "block";
      document.querySelector(".chatControlBtn").style.display = "block";

      if (userMessages) {
        if (userMessages.image != null) {
          document.querySelector(".rightUperLeft").style.width = "30px";
          document.querySelector(".rightUperLeft").style.height = "30px";
          document.querySelector(".rightUperLeft").style.border = "none";
        } else {
          document.querySelector(".rightUperLeft").style.width = "25px";
          document.querySelector(".rightUperLeft").style.height = "25px";
          document.querySelector(".rightUperLeft").style.border =
            "1px solid #999";
        }
        document.querySelector(".rightUperLeft").innerHTML = `
        ${
          userMessages.image != null
            ? `<img src=${userMessages.image} />`
            : `<i class='fas fa-user'></i>`
        }
      `;
        document.querySelector(".rightUperRight").innerHTML = `
                <p id="userEmail">${userMessages.email}</p>
      `;
      }

      let chatMessageContent = document.querySelector(".chatMessageContent");
      chatMessageContent.innerHTML = "";

      userMessages.data.map((obj, i) => {
        if (obj.sender_id == user_id) {
          let dbTime = obj.created_at;

          let newDate = new Date();

          let UTCDate = new Date(
            newDate.getUTCFullYear(),
            newDate.getUTCMonth(),
            newDate.getUTCDate(),
            newDate.getUTCHours(),
            newDate.getUTCMinutes(),
            newDate.getUTCSeconds(),
            newDate.getUTCMilliseconds()
          );

          let currentTime = Math.abs((UTCDate.getTime() / 1000).toFixed(0));

          let futureTime = Math.abs(
            (new Date(dbTime).getTime() / 1000).toFixed(0)
          );

          let TimeDifference = currentTime - futureTime;

          let days = Math.floor(TimeDifference / 86400);

          let hours = Math.floor(TimeDifference / 3600) % 24;

          let minutes = Math.floor(TimeDifference / 60) % 60;

          let seconds = Math.floor(TimeDifference % 60);

          let messageTimeString = "";

          if (days == 0) {
            if (hours == 0) {
              if (minutes == 0) {
                if (seconds == 0) {
                  messageTimeString = `less than a second ago`;
                } else {
                  messageTimeString =
                    seconds == 1
                      ? `${seconds} second ago`
                      : `${seconds} seconds ago`;
                }
              } else {
                messageTimeString =
                  minutes == 1
                    ? `${minutes} minute ago`
                    : `${minutes} minutes ago`;
              }
            } else {
              messageTimeString =
                hours == 1 ? `${hours} hour ago` : `${hours} hours ago`;
            }
          } else {
            messageTimeString =
              days == 1 ? `${days} day ago` : `${days} days ago`;
          }

          let row = `
        <div style="position: relative; margin-bottom: 30px;">
          <div class='myMessageDiv'>
          <div class="imageNameContainer">
                
          <span class="senderName">${obj.sender_name}</span>
          <img src="${obj.sender_image}" class='messageImage'/>
                  
                  </div>

          <i class="far fa-ellipsis-v menuDMIcon"></i>

              <div class='menuBox' style="display: none">
                <div class='editContainer editDMContainer'>
                  <i class="far fa-edit"></i>
                  <h1>Edit</h1>
                </div>
                <div class="deleteContainer deleteDMContainer">
                  <i class="far fa-trash"></i>
                  <h1>Delete</h1>
                </div>
              </div>

            ${
              obj.replied_id != null
                ? `<div class="prospectReplyDiv">
                <div class="prospectContentDiv" style="${
                  obj.reply_image == null ? "width: 100%;" : ""
                }">
                ${
                  obj.reply_msg != null
                    ? `<h1>${obj.reply_msg}</h1>`
                    : '<h1 style="font-style: italic; font-weight: 400; color: #555; width: auto;"><i class="fas fa-ban blockIcon"></i>The message was deleted</h1>'
                }
                </div>
                ${
                  obj.reply_image != null
                    ? `<img src="${obj.reply_image}" class="replyImage1"/>`
                    : ""
                }
              </div>`
                : ""
            }

            <i class="fas fa-reply myReplyIcon"></i>
            <div style="width: 100%">
              <p class="messageTxt" data-replied_id=${obj.id}>${obj.text}</p>
            </div>
            <div class="timestampDiv" style="margin-top: 10px">
              ${messageTimeString}
            </div>
          </div>
        </div>
        `;
          chatMessageContent.innerHTML += row;

          setTimeout(() => {
            document.querySelectorAll(".menuDMIcon").forEach((ele) => {
              ele?.addEventListener("click", openDmThreeDotMenu);
            });
          }, 100);

          setTimeout(() => {
            document.querySelectorAll(".myReplyIcon").forEach((ele) => {
              ele.addEventListener("click", replyToMessageFn);
            });
          }, 100);
        } else {
          let dbTime = obj.created_at;

          let newDate = new Date();

          let UTCDate = new Date(
            newDate.getUTCFullYear(),
            newDate.getUTCMonth(),
            newDate.getUTCDate(),
            newDate.getUTCHours(),
            newDate.getUTCMinutes(),
            newDate.getUTCSeconds(),
            newDate.getUTCMilliseconds()
          );

          let currentTime = Math.abs((UTCDate.getTime() / 1000).toFixed(0));

          let futureTime = Math.abs(
            (new Date(dbTime).getTime() / 1000).toFixed(0)
          );

          let TimeDifference = currentTime - futureTime;

          let days = Math.floor(TimeDifference / 86400);

          let hours = Math.floor(TimeDifference / 3600) % 24;

          let minutes = Math.floor(TimeDifference / 60) % 60;

          let seconds = Math.floor(TimeDifference % 60);

          let messageTimeString = "";

          if (days == 0) {
            if (hours == 0) {
              if (minutes == 0) {
                if (seconds == 0) {
                  messageTimeString = `less than a second ago`;
                } else {
                  messageTimeString =
                    seconds == 1
                      ? `${seconds} second ago`
                      : `${seconds} seconds ago`;
                }
              } else {
                messageTimeString =
                  minutes == 1
                    ? `${minutes} minute ago`
                    : `${minutes} minutes ago`;
              }
            } else {
              messageTimeString =
                hours == 1 ? `${hours} hour ago` : `${hours} hours ago`;
            }
          } else {
            messageTimeString =
              days == 1 ? `${days} day ago` : `${days} days ago`;
          }

          let row = `
        <div style="position: relative; margin-bottom: 30px;">
          <div class='userMessageDiv'>
          
          <div class="imageNameContainer1">
                
          <img src="${obj.sender_image}" class='messageImage'/>
          <span class="senderName">${obj.sender_name}</span>
                  
                  </div>

          ${
            obj.replied_id != null
              ? `<div class="prospectReplyDiv1">
              <div class="prospectContentDiv" style="${
                obj.reply_image == null ? "width: 100%;" : ""
              }">
                <h1>${
                  obj.reply_msg != null
                    ? `<h1>${obj.reply_msg}</h1>`
                    : '<h1 style="font-style: italic; font-weight: 400; color: #555; width: auto;"><i class="fas fa-ban blockIcon"></i>The message was deleted</h1>'
                }</h1>
              </div>
              ${
                obj.reply_image != null
                  ? `<img src="${obj.reply_image}" class="replyImage1"/>`
                  : ""
              }
            </div>`
              : ""
          }

            <i class="fas fa-reply replyIcon"></i>
            <div style="width: 100%">
              <p class="messageTxt" data-replied_id=${obj.id}>${obj.text}</p>
            </div>
            <div class="timestampUserDiv" style="margin-top: 10px">
              ${messageTimeString}
            </div>
          </div>
        </div>
        `;
          chatMessageContent.innerHTML += row;
        }

        chatMessageContent.scroll(0, chatMessageContent.scrollHeight);
      });

      let replyInterval = setInterval(() => {
        if (document.querySelector(".replyIcon")) clearInterval(replyInterval);
        document.querySelectorAll(".replyIcon").forEach((item) => {
          item.addEventListener("click", replyToMessageFn);
        });
      }, 500);
    }
  };
}

function activeClassInject(e) {
  e.currentTarget.classList.toggle("chatContentH1DotActive");
}

function openModal1() {
  modalContainer1.style.transform = "scale(1)";
  modalContainer1.style.opacity = 1;
}

function openModal2() {
  modalContainer2.style.transform = "scale(1)";
  modalContainer2.style.opacity = 1;
  document.querySelector(".startChartBtn1").innerText = 'Create Group'
}
function openModal100() {
  localStorage.setItem("sub_group", true);
  dynamicModalClose();
  modalContainer2.style.transform = "scale(1)";
  modalContainer2.style.opacity = 1;

  document.querySelector(".startChartBtn1").innerText = "Add Sub Group";
  var mainContentContainer = document.querySelector(".mainContentContainer1");

  mainContentContainer.innerHTML = ``;

  var user_id = localStorage.getItem("user_id");
  var group_id = localStorage.getItem("group_id");

  const url = `${globalURl}/group_members/${user_id}/${group_id}`;

  let xhr = new XMLHttpRequest();

  xhr.open("GET", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let userData = JSON.parse(xhr.responseText);

      if (userData.length != 0) {
        userData.map((item, i, arr) => {
          var row = `
            <div class="chatContent" date-linkedId=${item.linked_to_id}>
                              
              <div class="defaultIcon" style='${
                item.image != null
                  ? "border: none; margin-left: 10px"
                  : "border: 1px solid #999"
              }'>
              ${
                item.image != null
                  ? `<img src=${item.image} />`
                  : `<i class='fas fa-user'></i>`
              }
                  
              </div>
  
              <h1 class="userEmail">${item.email}</h1>
  
              <div class="dotCircle"></div>
                  
            </div>`;
          mainContentContainer.innerHTML += row;
        });
      } else {
        mainContentContainer.innerHTML = `
            <div class="chatContent">
  
              <h1 class="userEmail" >Add Members to create group</h1>
                  
            </div>`;
      }
    }
  };
}
function openModal25() {
  var back = localStorage.getItem("backpage");
  if (back) {
    modalContainer2.style.transform = "scale(1)";
    modalContainer2.style.opacity = 1;
    localStorage.removeItem("backpage");

    var mainContentContainer = document.querySelector(".mainContentContainer1");

    mainContentContainer.innerHTML = ``;

    var user_id = localStorage.getItem("user_id");

    const url = `${globalURl}/chats/${user_id}`;

    let xhr = new XMLHttpRequest();

    xhr.open("GET", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();

    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        let userData = JSON.parse(xhr.responseText);

        if (userData.length != 0) {
          userData.map((item, i, arr) => {
            var row = `
            <div class="chatContent" date-linkedId=${item.linked_to_id}>
                              
              <div class="defaultIcon" style='${
                item.image != null
                  ? "border: none; margin-left: 10px"
                  : "border: 1px solid #999"
              }'>
              ${
                item.image != null
                  ? `<img src=${item.image} />`
                  : `<i class='fas fa-user'></i>`
              }
                  
              </div>
  
              <h1 class="userEmail">${item.email}</h1>
  
              <div class="dotCircle"></div>
                  
            </div>`;
            mainContentContainer.innerHTML += row;
          });
        } else {
          mainContentContainer.innerHTML = `
            <div class="chatContent">
  
              <h1 class="userEmail" >Add Members to create group</h1>
                  
            </div>`;
        }
      }
    };

    document
      .getElementById("add_member1")
      .addEventListener("click", addmemberpage);
    document
      .getElementById("add_member2")
      .addEventListener("click", addmemberpage);
  }
}

function closeModal1() {
  modalContainer1.style.transform = "scale(0)";
  modalContainer1.style.opacity = 0;
}

function closeModal2() {
  modalContainer2.style.transform = "scale(0)";
  modalContainer2.style.opacity = 0;
}

if (document.getElementById("home_btn")) {
  document
    .getElementById("home_btn")
    .addEventListener("click", redirectHomePage);
}

function redirectHomePage() {
  document.location.href = "home.html";
}

if (document.getElementById("profile_btn")) {
  document
    .getElementById("profile_btn")
    .addEventListener("click", redirectProfilePage);
}

function redirectProfilePage() {
  var clipper = localStorage.getItem("clipperpageCheck");
  var prospect = localStorage.getItem("prospect_id");
  if (clipper) {
    if (prospect) {
      window.location.href = "popup.html";
    }
  } else {
    window.location.reload();
    document.location.href = "popup.html";
  }
}

if (document.getElementById("sendMsgBtn")) {
  document.getElementById("sendMsgBtn").addEventListener("click", sendMessage);
}

function sendMessage(e) {
  document.querySelectorAll(".menuBox").forEach((ele) => {
    ele.style.display = "none";
  });

  let msgInp = document.getElementById("msgInp");

  var user_id = localStorage.getItem("user_id");
  var receiver_id = localStorage.getItem("receiver_id");
  var replied_id = localStorage.getItem("replied_id");
  var prospect_id = localStorage.getItem("prospect_id");

  if (msgInp.value !== "") {
    if (document.getElementById("updateMsgBtn").style.display == "none") {
      const url = `${globalURl}/send_message`;

      let xhr = new XMLHttpRequest();

      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(
        JSON.stringify({
          user_id,
          receiver_id,
          text: msgInp.value,
          replied_id,
          prospect_id,
        })
      );

      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
          let userMessages = JSON.parse(xhr.responseText);

          let chatMessageContent = document.querySelector(
            ".chatMessageContent"
          );

          if (userMessages.length > 0) {
            userMessages.map((obj, i) => {
              if (obj.sender_id == user_id) {
                let dbTime = obj.created_at;

                let newDate = new Date();

                let UTCDate = new Date(
                  newDate.getUTCFullYear(),
                  newDate.getUTCMonth(),
                  newDate.getUTCDate(),
                  newDate.getUTCHours(),
                  newDate.getUTCMinutes(),
                  newDate.getUTCSeconds(),
                  newDate.getUTCMilliseconds()
                );

                let currentTime = Math.abs(
                  (UTCDate.getTime() / 1000).toFixed(0)
                );

                let futureTime = Math.abs(
                  (new Date(dbTime).getTime() / 1000).toFixed(0)
                );

                let TimeDifference = currentTime - futureTime;

                let days = Math.floor(TimeDifference / 86400);

                let hours = Math.floor(TimeDifference / 3600) % 24;

                let minutes = Math.floor(TimeDifference / 60) % 60;

                let seconds = Math.floor(TimeDifference % 60);

                let messageTimeString = "";

                if (days == 0) {
                  if (hours == 0) {
                    if (minutes == 0) {
                      if (seconds == 0) {
                        messageTimeString = `less than a second ago`;
                      } else {
                        messageTimeString =
                          seconds == 1
                            ? `${seconds} second ago`
                            : `${seconds} seconds ago`;
                      }
                    } else {
                      messageTimeString =
                        minutes == 1
                          ? `${minutes} minute ago`
                          : `${minutes} minutes ago`;
                    }
                  } else {
                    messageTimeString =
                      hours == 1 ? `${hours} hour ago` : `${hours} hours ago`;
                  }
                } else {
                  messageTimeString =
                    days == 1 ? `${days} day ago` : `${days} days ago`;
                }

                let row = `
                <div style="position: relative; margin-bottom: 30px;">
                  <div class='myMessageDiv'>
                  
                  <div class="imageNameContainer">
                
                  <span class="senderName">${obj.sender_name}</span>
                  <img src="${obj.sender_image}" class='messageImage'/>
                  
                  </div>

                  <i class="far fa-ellipsis-v menuDMIcon"></i>
  
                <div class='menuBox' style="display: none">
                  <div class='editContainer editDMContainer'>
                    <i class="far fa-edit"></i>
                    <h1>Edit</h1>
                  </div>
                  <div class="deleteContainer deleteDMContainer">
                    <i class="far fa-trash"></i>
                    <h1>Delete</h1>
                  </div>
                </div>
                  
                  ${
                    obj.replied_id != null
                      ? `<div class="prospectReplyDiv">
                      <div class="prospectContentDiv" style="${
                        obj.reply_image == null ? "width: 100%;" : ""
                      }"> 
                        <h1>${
                          obj.reply_msg != null
                            ? `<h1>${obj.reply_msg}</h1>`
                            : '<h1 style="font-style: italic; font-weight: 400; color: #555; width: auto;"><i class="fas fa-ban blockIcon"></i>The message was deleted</h1>'
                        }</h1>
                      </div>
                      ${
                        obj.reply_image != null
                          ? `<img src="${obj.reply_image}" class="replyImage1"/>`
                          : ""
                      }
                    </div>`
                      : ""
                  }
  
                    <i class="fas fa-reply myReplyIcon"></i>
                    <div style="width: 100%">
                        <p class="messageTxt" data-replied_id=${obj.id}>${
                  obj.text
                }</p>
                    </div>
                <div class="timestampDiv" style="margin-top: 10px">
                  ${messageTimeString}
                </div>
                  </div>
                </div>
              `;
                chatMessageContent.innerHTML += row;

                setTimeout(() => {
                  document.querySelectorAll(".menuDMIcon").forEach((ele) => {
                    ele?.addEventListener("click", openDmThreeDotMenu);
                  });
                }, 100);

                setTimeout(() => {
                  document.querySelectorAll(".myReplyIcon").forEach((ele) => {
                    ele.addEventListener("click", replyToMessageFn);
                  });
                }, 100);
              } else {
                let dbTime = obj.created_at;

                let newDate = new Date();

                let UTCDate = new Date(
                  newDate.getUTCFullYear(),
                  newDate.getUTCMonth(),
                  newDate.getUTCDate(),
                  newDate.getUTCHours(),
                  newDate.getUTCMinutes(),
                  newDate.getUTCSeconds(),
                  newDate.getUTCMilliseconds()
                );

                let currentTime = Math.abs(
                  (UTCDate.getTime() / 1000).toFixed(0)
                );

                let futureTime = Math.abs(
                  (new Date(dbTime).getTime() / 1000).toFixed(0)
                );

                let TimeDifference = currentTime - futureTime;

                let days = Math.floor(TimeDifference / 86400);

                let hours = Math.floor(TimeDifference / 3600) % 24;

                let minutes = Math.floor(TimeDifference / 60) % 60;

                let seconds = Math.floor(TimeDifference % 60);

                let messageTimeString = "";

                if (days == 0) {
                  if (hours == 0) {
                    if (minutes == 0) {
                      if (seconds == 0) {
                        messageTimeString = `less than a second ago`;
                      } else {
                        messageTimeString =
                          seconds == 1
                            ? `${seconds} second ago`
                            : `${seconds} seconds ago`;
                      }
                    } else {
                      messageTimeString =
                        minutes == 1
                          ? `${minutes} minute ago`
                          : `${minutes} minutes ago`;
                    }
                  } else {
                    messageTimeString =
                      hours == 1 ? `${hours} hour ago` : `${hours} hours ago`;
                  }
                } else {
                  messageTimeString =
                    days == 1 ? `${days} day ago` : `${days} days ago`;
                }

                let row = `
                
                <div style="position: relative; margin-bottom: 30px;">
                  <div class='userMessageDiv'>
  
                  <div class="imageNameContainer1">
                
                  <img src="${obj.sender_image}" class='messageImage'/>
                  <span class="senderName">${obj.sender_name}</span>
                  
                  </div>

                  ${
                    obj.replied_id != null
                      ? `<div class="prospectReplyDiv1">
                      <div class="prospectContentDiv" style="${
                        obj.reply_image == null ? "width: 100%;" : ""
                      }">
                        <h1>${
                          obj.reply_msg != null
                            ? `<h1>${obj.reply_msg}</h1>`
                            : '<h1 style="font-style: italic; font-weight: 400; color: #555; width: auto;"><i class="fas fa-ban blockIcon"></i>The message was deleted</h1>'
                        }</h1>
                      </div>
                      ${
                        obj.reply_image != null
                          ? `<img src="${obj.reply_image}" class="replyImage1"/>`
                          : ""
                      }
                    </div>`
                      : ""
                  }
  
                    <i class="fas fa-reply replyIcon"></i>
                  
                  <div style="width: 100%">
                    <p class="messageTxt" data-replied_id=${obj.id}>${
                  obj.text
                }</p>
                  </div>
                  <div class="timestampUserDiv" style="margin-top: 10px">
                    ${messageTimeString}
                  </div>
                  </div>
                </div>
              `;
                chatMessageContent.innerHTML += row;
              }

              chatMessageContent.scroll(0, chatMessageContent.scrollHeight);
            });

            let replyInterval = setInterval(() => {
              if (document.querySelector(".replyIcon"))
                clearInterval(replyInterval);
              document.querySelectorAll(".replyIcon").forEach((item) => {
                item.addEventListener("click", replyToMessageFn);
              });
            }, 500);
          }
          msgInp.value = "";

          replied_id = "";
          localStorage.removeItem("replied_id");

          let replyInterval = setInterval(() => {
            if (document.querySelector(".replyIcon")) {
              clearInterval(replyInterval);
              document.querySelectorAll(".replyIcon").forEach((ele) => {
                ele.classList.remove("replyIconClicked");
              });
            }

            if (document.querySelector(".myReplyIcon")) {
              document.querySelectorAll(".myReplyIcon").forEach((ele) => {
                ele.classList.remove("replyIconClicked");
              });
            }
          });
        }
      };
    } else {
      document.getElementById("sendMsgBtn").style.display = "block";
      document.getElementById("updateMsgBtn").style.display = "none";
      document.getElementById("cancelMsgBtn").style.display = "none";
      document.getElementById("sendGroupMsgBtn").style.display = "none";
      document.getElementById("updateGroupMsgBtn").style.display = "none";
      document.getElementById("cancelGroupMsgBtn").style.display = "none";
      document.getElementById("sendSubGroupMsgBtn").style.display = "none";
      document.getElementById("updateSubGroupMsgBtn").style.display = "none";
      document.getElementById("cancelSubGroupMsgBtn").style.display = "none";

      let message_id = localStorage.getItem("message_id");
      let updatedMessage = document.getElementById("msgInp").value;

      const url = `${globalURl}/edit_single_chat`;

      let xhr = new XMLHttpRequest();

      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(
        JSON.stringify({
          id: message_id,
          text: updatedMessage,
        })
      );

      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
          let response = JSON.parse(xhr.responseText);
          localStorage.removeItem("message_id");
          if (response.status == "Updated") {
            let dmNullChats = localStorage.getItem("dmNullChats");

            let url = "";

            if (dmNullChats) {
              url = `${globalURl}/chating_null/${user_id}/${receiver_id}`;

              let xhr = new XMLHttpRequest();

              xhr.open("GET", url, true);
              xhr.setRequestHeader("Content-Type", "application/json");
              xhr.send();

              xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                  let userMessages = JSON.parse(xhr.responseText);

                  if (userMessages) {
                    document.querySelector(".rightUperLeft").innerHTML = `
                    ${
                      userMessages.image != null
                        ? `<img src=${userMessages.image} />`
                        : `<i class='fas fa-user'></i>`
                    }
                  `;
                    document.querySelector(".rightUperRight").innerHTML = `
                            <p id="userEmail">${userMessages.email}</p>
                  `;
                  }

                  let chatMessageContent = document.querySelector(
                    ".chatMessageContent"
                  );
                  chatMessageContent.innerHTML = "";

                  userMessages.data.map((obj, i) => {
                    if (obj.sender_id == user_id) {
                      let dbTime = obj.created_at;

                      let newDate = new Date();

                      let UTCDate = new Date(
                        newDate.getUTCFullYear(),
                        newDate.getUTCMonth(),
                        newDate.getUTCDate(),
                        newDate.getUTCHours(),
                        newDate.getUTCMinutes(),
                        newDate.getUTCSeconds(),
                        newDate.getUTCMilliseconds()
                      );

                      let currentTime = Math.abs(
                        (UTCDate.getTime() / 1000).toFixed(0)
                      );

                      let futureTime = Math.abs(
                        (new Date(dbTime).getTime() / 1000).toFixed(0)
                      );

                      let TimeDifference = currentTime - futureTime;

                      let days = Math.floor(TimeDifference / 86400);

                      let hours = Math.floor(TimeDifference / 3600) % 24;

                      let minutes = Math.floor(TimeDifference / 60) % 60;

                      let seconds = Math.floor(TimeDifference % 60);

                      let messageTimeString = "";

                      if (days == 0) {
                        if (hours == 0) {
                          if (minutes == 0) {
                            if (seconds == 0) {
                              messageTimeString = `less than a second ago`;
                            } else {
                              messageTimeString =
                                seconds == 1
                                  ? `${seconds} second ago`
                                  : `${seconds} seconds ago`;
                            }
                          } else {
                            messageTimeString =
                              minutes == 1
                                ? `${minutes} minute ago`
                                : `${minutes} minutes ago`;
                          }
                        } else {
                          messageTimeString =
                            hours == 1
                              ? `${hours} hour ago`
                              : `${hours} hours ago`;
                        }
                      } else {
                        messageTimeString =
                          days == 1 ? `${days} day ago` : `${days} days ago`;
                      }

                      let row = `
                    <div style="position: relative; margin-bottom: 30px;">
                      <div class='myMessageDiv'>

                      <div class="imageNameContainer">
                
                      <span class="senderName">${obj.sender_name}</span>
                      <img src="${obj.sender_image}" class='messageImage'/>
                  
                  </div>

                      <i class="far fa-ellipsis-v menuDMIcon"></i>

                          <div class='menuBox' style="display: none">
                            <div class='editContainer editDMContainer'>
                              <i class="far fa-edit"></i>
                              <h1>Edit</h1>
                            </div>
                            <div class="deleteContainer deleteDMContainer">
                              <i class="far fa-trash"></i>
                              <h1>Delete</h1>
                            </div>
                          </div>

                        ${
                          obj.replied_id != null
                            ? `<div class="prospectReplyDiv">
                            <div class="prospectContentDiv" style="${
                              obj.reply_image == null ? "width: 100%;" : ""
                            }">
                            ${
                              obj.reply_msg != null
                                ? `<h1>${obj.reply_msg}</h1>`
                                : '<h1 style="font-style: italic; font-weight: 400; color: #555; width: auto;"><i class="fas fa-ban blockIcon"></i>The message was deleted</h1>'
                            }
                            </div>
                            ${
                              obj.reply_image != null
                                ? `<img src="${obj.reply_image}" class="replyImage1"/>`
                                : ""
                            }
                          </div>`
                            : ""
                        }

                        <i class="fas fa-reply myReplyIcon"></i>
                        <div style="width: 100%">
                          <p class="messageTxt" data-replied_id=${obj.id}>${
                        obj.text
                      }</p>
                        </div>
                        <div class="timestampDiv" style="margin-top: 10px">
                          ${messageTimeString}
                        </div>
                      </div>
                    </div>
                    `;
                      chatMessageContent.innerHTML += row;

                      setTimeout(() => {
                        document
                          .querySelectorAll(".menuDMIcon")
                          .forEach((ele) => {
                            ele?.addEventListener("click", openDmThreeDotMenu);
                          });
                      }, 100);

                      setTimeout(() => {
                        document
                          .querySelectorAll(".myReplyIcon")
                          .forEach((ele) => {
                            ele.addEventListener("click", replyToMessageFn);
                          });
                      }, 100);
                    } else {
                      let dbTime = obj.created_at;

                      let newDate = new Date();

                      let UTCDate = new Date(
                        newDate.getUTCFullYear(),
                        newDate.getUTCMonth(),
                        newDate.getUTCDate(),
                        newDate.getUTCHours(),
                        newDate.getUTCMinutes(),
                        newDate.getUTCSeconds(),
                        newDate.getUTCMilliseconds()
                      );

                      let currentTime = Math.abs(
                        (UTCDate.getTime() / 1000).toFixed(0)
                      );

                      let futureTime = Math.abs(
                        (new Date(dbTime).getTime() / 1000).toFixed(0)
                      );

                      let TimeDifference = currentTime - futureTime;

                      let days = Math.floor(TimeDifference / 86400);

                      let hours = Math.floor(TimeDifference / 3600) % 24;

                      let minutes = Math.floor(TimeDifference / 60) % 60;

                      let seconds = Math.floor(TimeDifference % 60);

                      let messageTimeString = "";

                      if (days == 0) {
                        if (hours == 0) {
                          if (minutes == 0) {
                            if (seconds == 0) {
                              messageTimeString = `less than a second ago`;
                            } else {
                              messageTimeString =
                                seconds == 1
                                  ? `${seconds} second ago`
                                  : `${seconds} seconds ago`;
                            }
                          } else {
                            messageTimeString =
                              minutes == 1
                                ? `${minutes} minute ago`
                                : `${minutes} minutes ago`;
                          }
                        } else {
                          messageTimeString =
                            hours == 1
                              ? `${hours} hour ago`
                              : `${hours} hours ago`;
                        }
                      } else {
                        messageTimeString =
                          days == 1 ? `${days} day ago` : `${days} days ago`;
                      }

                      let row = `
                    <div style="position: relative; margin-bottom: 30px;">
                      <div class='userMessageDiv'>

                      <div class="imageNameContainer1">
                
                      <img src="${obj.sender_image}" class='messageImage'/>
                      <span class="senderName">${obj.sender_name}</span>
                  
                  </div>

                      ${
                        obj.replied_id != null
                          ? `<div class="prospectReplyDiv1">
                          <div class="prospectContentDiv" style="${
                            obj.reply_image == null ? "width: 100%;" : ""
                          }">
                            <h1>${
                              obj.reply_msg != null
                                ? `<h1>${obj.reply_msg}</h1>`
                                : '<h1 style="font-style: italic; font-weight: 400; color: #555; width: auto;"><i class="fas fa-ban blockIcon"></i>The message was deleted</h1>'
                            }</h1>
                          </div>
                          ${
                            obj.reply_image != null
                              ? `<img src="${obj.reply_image}" class="replyImage1"/>`
                              : ""
                          }
                        </div>`
                          : ""
                      }

                        <i class="fas fa-reply replyIcon"></i>
                        <div style="width: 100%">
                          <p class="messageTxt" data-replied_id=${obj.id}>${
                        obj.text
                      }</p>
                        </div>
                        <div class="timestampUserDiv" style="margin-top: 10px">
                          ${messageTimeString}
                        </div>
                      </div>
                    </div>
                    `;
                      chatMessageContent.innerHTML += row;
                    }

                    chatMessageContent.scroll(
                      0,
                      chatMessageContent.scrollHeight
                    );
                  });

                  let replyInterval = setInterval(() => {
                    if (document.querySelector(".replyIcon"))
                      clearInterval(replyInterval);
                    document.querySelectorAll(".replyIcon").forEach((item) => {
                      item.addEventListener("click", replyToMessageFn);
                    });
                  }, 500);
                }
              };
            } else {
              url = `${globalURl}/chat_prospects/${user_id}/${receiver_id}/${prospect_id}`;
              let xhr = new XMLHttpRequest();

              xhr.open("GET", url, true);
              xhr.setRequestHeader("Content-Type", "application/json");
              xhr.send();

              xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                  let userMessages = JSON.parse(xhr.responseText);

                  document.getElementById("sendMsgBtn").style.display = "block";
                  document.getElementById("updateMsgBtn").style.display =
                    "none";
                  document.getElementById("cancelMsgBtn").style.display =
                    "none";
                  document.getElementById("msgInp").value = "";

                  if (userMessages) {
                    document.querySelector(".rightUperLeft").innerHTML = `
                      ${
                        userMessages.image != null
                          ? `<img src=${userMessages.image} />`
                          : `<i class='fas fa-user'></i>`
                      }
                    `;
                    document.querySelector(".rightUperRight").innerHTML = `
                              <p id="userEmail">${userMessages.email}</p>
                    `;
                  }

                  let chatMessageContent = document.querySelector(
                    ".chatMessageContent"
                  );
                  chatMessageContent.innerHTML = "";
                  if (userMessages.data) {
                    chatMessageContent.innerHTML += `
                      
                      <div class="prospectTopDiv" data-id=${
                        userMessages.prospect_data.id
                      } data-link=${userMessages.prospect_data.profile_link}>
                        <img src=${
                          userMessages.prospect_data.image
                        } alt="model pic"/>
                        <div class="prospectContentDiv">
                          <h1>${userMessages.prospect_data.name}</h1>
                          <h2>${
                            userMessages.prospect_data.company != null
                              ? userMessages.prospect_data.company
                              : "No company name"
                          }</h2>
                        </div>
                      </div>`;

                    userMessages.data.map((obj, i) => {
                      if (obj.sender_id == user_id) {
                        let dbTime = obj.created_at;

                        let newDate = new Date();

                        let UTCDate = new Date(
                          newDate.getUTCFullYear(),
                          newDate.getUTCMonth(),
                          newDate.getUTCDate(),
                          newDate.getUTCHours(),
                          newDate.getUTCMinutes(),
                          newDate.getUTCSeconds(),
                          newDate.getUTCMilliseconds()
                        );

                        let currentTime = Math.abs(
                          (UTCDate.getTime() / 1000).toFixed(0)
                        );

                        let futureTime = Math.abs(
                          (new Date(dbTime).getTime() / 1000).toFixed(0)
                        );

                        let TimeDifference = currentTime - futureTime;

                        let days = Math.floor(TimeDifference / 86400);

                        let hours = Math.floor(TimeDifference / 3600) % 24;

                        let minutes = Math.floor(TimeDifference / 60) % 60;

                        let seconds = Math.floor(TimeDifference % 60);

                        let messageTimeString = "";

                        if (days == 0) {
                          if (hours == 0) {
                            if (minutes == 0) {
                              if (seconds == 0) {
                                messageTimeString = `less than a second ago`;
                              } else {
                                messageTimeString =
                                  seconds == 1
                                    ? `${seconds} second ago`
                                    : `${seconds} seconds ago`;
                              }
                            } else {
                              messageTimeString =
                                minutes == 1
                                  ? `${minutes} minute ago`
                                  : `${minutes} minutes ago`;
                            }
                          } else {
                            messageTimeString =
                              hours == 1
                                ? `${hours} hour ago`
                                : `${hours} hours ago`;
                          }
                        } else {
                          messageTimeString =
                            days == 1 ? `${days} day ago` : `${days} days ago`;
                        }

                        let row = `
                        <div style="position: relative; margin-bottom: 30px;">
                          <div class='myMessageDiv'>
                          
                          <div class="imageNameContainer">
                
                          <span class="senderName">${obj.sender_name}</span>
                    <img src="${obj.sender_image}" class='messageImage'/>
                        
                        </div>

                          <i class="far fa-ellipsis-v menuDMIcon"></i>
      
                          <div class='menuBox' style="display: none">
                            <div class='editContainer editDMContainer'>
                              <i class="far fa-edit"></i>
                              <h1>Edit</h1>
                            </div>
                            <div class="deleteContainer deleteDMContainer">
                              <i class="far fa-trash"></i>
                              <h1>Delete</h1>
                            </div>
                          </div>
      
                            ${
                              obj.replied_id != null
                                ? `<div class="prospectReplyDiv">
                                <div class="prospectContentDiv" style="${
                                  obj.reply_image == null ? "width: 100%;" : ""
                                }">
                                  <h1>${
                                    obj.reply_msg != null
                                      ? `<h1>${obj.reply_msg}</h1>`
                                      : '<h1 style="font-style: italic; font-weight: 400; color: #555; width: auto;"><i class="fas fa-ban blockIcon"></i>The message was deleted</h1>'
                                  }</h1>
                                </div>
                                ${
                                  obj.reply_image != null
                                    ? `<img src="${obj.reply_image}" class="replyImage1"/>`
                                    : ""
                                }
                              </div>`
                                : ""
                            }
      
                            <i class="fas fa-reply myReplyIcon"></i>
                            <div style="width: 100%">
                              <p class="messageTxt" data-replied_id=${obj.id}>${
                          obj.text
                        }</p>
                            </div>
                            <div class="timestampDiv" style="margin-top: 10px">
                              ${messageTimeString}
                            </div>
                          </div>
                        </div>
                        `;
                        chatMessageContent.innerHTML += row;

                        setTimeout(() => {
                          document
                            .querySelectorAll(".menuDMIcon")
                            .forEach((ele) => {
                              ele?.addEventListener(
                                "click",
                                openDmThreeDotMenu
                              );
                            });
                        }, 100);

                        setTimeout(() => {
                          document
                            .querySelectorAll(".myReplyIcon")
                            .forEach((ele) => {
                              ele.addEventListener("click", replyToMessageFn);
                            });
                        }, 100);
                      } else {
                        let dbTime = obj.created_at;

                        let newDate = new Date();

                        let UTCDate = new Date(
                          newDate.getUTCFullYear(),
                          newDate.getUTCMonth(),
                          newDate.getUTCDate(),
                          newDate.getUTCHours(),
                          newDate.getUTCMinutes(),
                          newDate.getUTCSeconds(),
                          newDate.getUTCMilliseconds()
                        );

                        let currentTime = Math.abs(
                          (UTCDate.getTime() / 1000).toFixed(0)
                        );

                        let futureTime = Math.abs(
                          (new Date(dbTime).getTime() / 1000).toFixed(0)
                        );

                        let TimeDifference = currentTime - futureTime;

                        let days = Math.floor(TimeDifference / 86400);

                        let hours = Math.floor(TimeDifference / 3600) % 24;

                        let minutes = Math.floor(TimeDifference / 60) % 60;

                        let seconds = Math.floor(TimeDifference % 60);

                        let messageTimeString = "";

                        if (days == 0) {
                          if (hours == 0) {
                            if (minutes == 0) {
                              if (seconds == 0) {
                                messageTimeString = `less than a second ago`;
                              } else {
                                messageTimeString =
                                  seconds == 1
                                    ? `${seconds} second ago`
                                    : `${seconds} seconds ago`;
                              }
                            } else {
                              messageTimeString =
                                minutes == 1
                                  ? `${minutes} minute ago`
                                  : `${minutes} minutes ago`;
                            }
                          } else {
                            messageTimeString =
                              hours == 1
                                ? `${hours} hour ago`
                                : `${hours} hours ago`;
                          }
                        } else {
                          messageTimeString =
                            days == 1 ? `${days} day ago` : `${days} days ago`;
                        }

                        let row = `
                        <div style="position: relative; margin-bottom: 30px;">
                          <div class='userMessageDiv'>

                          <div class="imageNameContainer1">
                
                          <img src="${obj.sender_image}" class='messageImage'/>
                          <span class="senderName">${obj.sender_name}</span>
                          
                          </div>

                          ${
                            obj.replied_id != null
                              ? `<div class="prospectReplyDiv1">
                              <div class="prospectContentDiv" style="${
                                obj.reply_image == null ? "width: 100%;" : ""
                              }">
                                <h1>${
                                  obj.reply_msg != null
                                    ? `<h1>${obj.reply_msg}</h1>`
                                    : '<h1 style="font-style: italic; font-weight: 400; color: #555; width: auto;"><i class="fas fa-ban blockIcon"></i>The message was deleted</h1>'
                                }</h1>
                              </div>
                              ${
                                obj.reply_image != null
                                  ? `<img src="${obj.reply_image}" class="replyImage1"/>`
                                  : ""
                              }
                            </div>`
                              : ""
                          }
      
                            <i class="fas fa-reply replyIcon"></i>
                            <div style="width: 100%">
                              <p class="messageTxt" data-replied_id=${obj.id}>${
                          obj.text
                        }</p>
                            </div>
                            <div class="timestampUserDiv" style="margin-top: 10px">
                              ${messageTimeString}
                            </div>
                          </div>
                        </div>
                        `;
                        chatMessageContent.innerHTML += row;
                      }

                      chatMessageContent.scroll(
                        0,
                        chatMessageContent.scrollHeight
                      );
                    });

                    let prospectInterval1 = setInterval(() => {
                      if (document.querySelector(".prospectTopDiv"))
                        clearInterval(prospectInterval1);
                      document
                        .querySelectorAll(".prospectTopDiv")
                        .forEach((item) => {
                          item.addEventListener("click", openProspectPage);
                        });
                    }, 500);

                    let prospectInterval2 = setInterval(() => {
                      if (document.querySelector(".prospectDiv1"))
                        clearInterval(prospectInterval2);
                      document
                        .querySelectorAll(".prospectDiv1")
                        .forEach((item) => {
                          item.addEventListener("click", openProspectPage);
                        });
                    }, 500);

                    let replyInterval = setInterval(() => {
                      if (document.querySelector(".replyIcon"))
                        clearInterval(replyInterval);
                      document
                        .querySelectorAll(".replyIcon")
                        .forEach((item) => {
                          item.addEventListener("click", replyToMessageFn);
                        });
                    }, 500);
                  }
                }
              };
            }
          }
        }
      };
    }
  }
}

function openDmThreeDotMenu(e) {
  let currentMenuBox = e.currentTarget.parentElement.parentElement;

  setTimeout(() => {
    if (currentMenuBox.querySelector(".menuBox").style.display == "none") {
      document.querySelectorAll(".menuBox").forEach((ele) => {
        ele.style.display = "none";
      });
      currentMenuBox.querySelector(".menuBox").style.display = "block";
    } else {
      currentMenuBox.querySelector(".menuBox").style.display = "none";
    }
  }, 100);

  currentMenuBox
    .querySelector(".editContainer")
    .addEventListener("click", editDmMessage);
  currentMenuBox
    .querySelector(".deleteContainer")
    .addEventListener("click", deleteDmMessage);
}

function editDmMessage(e) {
  document.querySelectorAll(".menuBox").forEach((ele) => {
    ele.style.display = "none";
  });

  let currentMessage = e.currentTarget.parentElement.parentElement;

  let message_id = currentMessage
    .querySelector(".messageTxt")
    .getAttribute("data-replied_id");
  let messageText = currentMessage.querySelector(".messageTxt").innerText;

  localStorage.setItem("message_id", message_id);

  document.getElementById("msgInp").value = messageText;

  document.getElementById("sendMsgBtn").style.display = "none";
  document.getElementById("updateMsgBtn").style.display = "block";
  document.getElementById("cancelMsgBtn").style.display = "block";
}

document.getElementById("cancelMsgBtn").addEventListener("click", () => {
  document.getElementById("sendMsgBtn").style.display = "block";
  document.getElementById("updateMsgBtn").style.display = "none";
  document.getElementById("cancelMsgBtn").style.display = "none";
  document.getElementById("msgInp").value = "";
  localStorage.removeItem("message_id");
});

document.getElementById("updateMsgBtn").addEventListener("click", sendMessage);

function deleteDmMessage(e) {
  document.querySelectorAll(".menuBox").forEach((ele) => {
    ele.style.display = "none";
  });

  let currentMessage = e.currentTarget.parentElement.parentElement;
  let message_id = currentMessage
    .querySelector(".messageTxt")
    .getAttribute("data-replied_id");

  let user_id = localStorage.getItem("user_id");
  let receiver_id = localStorage.getItem("receiver_id");
  let prospectId = localStorage.getItem("prospect_id");

  const url = `${globalURl}/delete_single_chat/${message_id}`;

  let xhr = new XMLHttpRequest();

  xhr.open("GET", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let userData = JSON.parse(xhr.responseText);

      if (userData.status == "Deleted") {
        const url = `${globalURl}/chat_prospects/${user_id}/${receiver_id}/${prospectId}`;

        let xhr = new XMLHttpRequest();

        xhr.open("GET", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send();

        xhr.onreadystatechange = function () {
          if (xhr.readyState == 4 && xhr.status == 200) {
            let userMessages = JSON.parse(xhr.responseText);

            if (userMessages) {
              document.querySelector(".rightUperLeft").innerHTML = `
                ${
                  userMessages.image != null
                    ? `<img src=${userMessages.image} />`
                    : `<i class='fas fa-user'></i>`
                }
              `;
              document.querySelector(".rightUperRight").innerHTML = `
                        <p id="userEmail">${userMessages.email}</p>
              `;
            }

            let chatMessageContent = document.querySelector(
              ".chatMessageContent"
            );
            chatMessageContent.innerHTML = "";
            if (userMessages.data) {
              chatMessageContent.innerHTML += `
                
                <div class="prospectTopDiv" data-id=${
                  userMessages.prospect_data.id
                } data-link=${userMessages.prospect_data.profile_link}>
                  <img src=${userMessages.prospect_data.image} alt="model pic"/>
                  <div class="prospectContentDiv">
                    <h1>${userMessages.prospect_data.name}</h1>
                    <h2>${
                      userMessages.prospect_data.company != null
                        ? userMessages.prospect_data.company
                        : "No company name"
                    }</h2>
                  </div>
                </div>`;

              userMessages.data.map((obj, i) => {
                if (obj.sender_id == user_id) {
                  let dbTime = obj.created_at;

                  let newDate = new Date();

                  let UTCDate = new Date(
                    newDate.getUTCFullYear(),
                    newDate.getUTCMonth(),
                    newDate.getUTCDate(),
                    newDate.getUTCHours(),
                    newDate.getUTCMinutes(),
                    newDate.getUTCSeconds(),
                    newDate.getUTCMilliseconds()
                  );

                  let currentTime = Math.abs(
                    (UTCDate.getTime() / 1000).toFixed(0)
                  );

                  let futureTime = Math.abs(
                    (new Date(dbTime).getTime() / 1000).toFixed(0)
                  );

                  let TimeDifference = currentTime - futureTime;

                  let days = Math.floor(TimeDifference / 86400);

                  let hours = Math.floor(TimeDifference / 3600) % 24;

                  let minutes = Math.floor(TimeDifference / 60) % 60;

                  let seconds = Math.floor(TimeDifference % 60);

                  let messageTimeString = "";

                  if (days == 0) {
                    if (hours == 0) {
                      if (minutes == 0) {
                        if (seconds == 0) {
                          messageTimeString = `less than a second ago`;
                        } else {
                          messageTimeString =
                            seconds == 1
                              ? `${seconds} second ago`
                              : `${seconds} seconds ago`;
                        }
                      } else {
                        messageTimeString =
                          minutes == 1
                            ? `${minutes} minute ago`
                            : `${minutes} minutes ago`;
                      }
                    } else {
                      messageTimeString =
                        hours == 1 ? `${hours} hour ago` : `${hours} hours ago`;
                    }
                  } else {
                    messageTimeString =
                      days == 1 ? `${days} day ago` : `${days} days ago`;
                  }

                  let row = `
                  <div style="position: relative; margin-bottom: 30px;">
                    <div class='myMessageDiv'>

                    <div class="imageNameContainer">
                
                    <span class="senderName">${obj.sender_name}</span>
                    <img src="${obj.sender_image}" class='messageImage'/>
                  
                  </div>

                    <i class="far fa-ellipsis-v menuDMIcon"></i>

                    <div class='menuBox' style="display: none">
                      <div class='editContainer editDMContainer'>
                        <i class="far fa-edit"></i>
                        <h1>Edit</h1>
                      </div>
                      <div class="deleteContainer deleteDMContainer">
                        <i class="far fa-trash"></i>
                        <h1>Delete</h1>
                      </div>
                    </div>

                      ${
                        obj.replied_id != null
                          ? `<div class="prospectReplyDiv">
                          <div class="prospectContentDiv" style="${
                            obj.reply_image == null ? "width: 100%;" : ""
                          }">
                            <h1>${
                              obj.reply_msg != null
                                ? `<h1>${obj.reply_msg}</h1>`
                                : '<h1 style="font-style: italic; font-weight: 400; color: #555; width: auto;"><i class="fas fa-ban blockIcon"></i>The message was deleted</h1>'
                            }</h1>
                          </div>
                          ${
                            obj.reply_image != null
                              ? `<img src="${obj.reply_image}" class="replyImage1"/>`
                              : ""
                          }
                        </div>`
                          : ""
                      }

                      <i class="fas fa-reply myReplyIcon"></i>
                      <div style="width: 100%">
                        <p class="messageTxt" data-replied_id=${obj.id}>${
                    obj.text
                  }</p>
                      </div>
                      <div class="timestampDiv" style="margin-top: 10px">
                        ${messageTimeString}
                      </div>
                    </div>
                  </div>
                  `;
                  chatMessageContent.innerHTML += row;

                  setTimeout(() => {
                    document.querySelectorAll(".menuDMIcon").forEach((ele) => {
                      ele?.addEventListener("click", openDmThreeDotMenu);
                    });
                  }, 100);

                  setTimeout(() => {
                    document.querySelectorAll(".myReplyIcon").forEach((ele) => {
                      ele.addEventListener("click", replyToMessageFn);
                    });
                  }, 100);
                } else {
                  let dbTime = obj.created_at;

                  let newDate = new Date();

                  let UTCDate = new Date(
                    newDate.getUTCFullYear(),
                    newDate.getUTCMonth(),
                    newDate.getUTCDate(),
                    newDate.getUTCHours(),
                    newDate.getUTCMinutes(),
                    newDate.getUTCSeconds(),
                    newDate.getUTCMilliseconds()
                  );

                  let currentTime = Math.abs(
                    (UTCDate.getTime() / 1000).toFixed(0)
                  );

                  let futureTime = Math.abs(
                    (new Date(dbTime).getTime() / 1000).toFixed(0)
                  );

                  let TimeDifference = currentTime - futureTime;

                  let days = Math.floor(TimeDifference / 86400);

                  let hours = Math.floor(TimeDifference / 3600) % 24;

                  let minutes = Math.floor(TimeDifference / 60) % 60;

                  let seconds = Math.floor(TimeDifference % 60);

                  let messageTimeString = "";

                  if (days == 0) {
                    if (hours == 0) {
                      if (minutes == 0) {
                        if (seconds == 0) {
                          messageTimeString = `less than a second ago`;
                        } else {
                          messageTimeString =
                            seconds == 1
                              ? `${seconds} second ago`
                              : `${seconds} seconds ago`;
                        }
                      } else {
                        messageTimeString =
                          minutes == 1
                            ? `${minutes} minute ago`
                            : `${minutes} minutes ago`;
                      }
                    } else {
                      messageTimeString =
                        hours == 1 ? `${hours} hour ago` : `${hours} hours ago`;
                    }
                  } else {
                    messageTimeString =
                      days == 1 ? `${days} day ago` : `${days} days ago`;
                  }

                  let row = `
                  <div style="position: relative; margin-bottom: 30px;">
                    <div class='userMessageDiv'>

                    <div class="imageNameContainer1">
                
                    <img src="${obj.sender_image}" class='messageImage'/>
                    <span class="senderName">${obj.sender_name}</span>
                  
                  </div>

                    ${
                      obj.replied_id != null
                        ? `<div class="prospectReplyDiv1">
                        <div class="prospectContentDiv" style="${
                          obj.reply_image == null ? "width: 100%;" : ""
                        }">
                          <h1>${
                            obj.reply_msg != null
                              ? `<h1>${obj.reply_msg}</h1>`
                              : '<h1 style="font-style: italic; font-weight: 400; color: #555; width: auto;"><i class="fas fa-ban blockIcon"></i>The message was deleted</h1>'
                          }</h1>
                        </div>
                        ${
                          obj.reply_image != null
                            ? `<img src="${obj.reply_image}" class="replyImage1"/>`
                            : ""
                        }
                      </div>`
                        : ""
                    }

                      <i class="fas fa-reply replyIcon"></i>
                      <div style="width: 100%">
                        <p class="messageTxt" data-replied_id=${obj.id}>${
                    obj.text
                  }</p>
                      </div>
                      <div class="timestampUserDiv" style="margin-top: 10px">
                        ${messageTimeString}
                      </div>
                    </div>
                  </div>
                  `;
                  chatMessageContent.innerHTML += row;
                }

                chatMessageContent.scroll(0, chatMessageContent.scrollHeight);
              });

              let prospectInterval1 = setInterval(() => {
                if (document.querySelector(".prospectTopDiv"))
                  clearInterval(prospectInterval1);
                document.querySelectorAll(".prospectTopDiv").forEach((item) => {
                  item.addEventListener("click", openProspectPage);
                });
              }, 500);

              let prospectInterval2 = setInterval(() => {
                if (document.querySelector(".prospectDiv1"))
                  clearInterval(prospectInterval2);
                document.querySelectorAll(".prospectDiv1").forEach((item) => {
                  item.addEventListener("click", openProspectPage);
                });
              }, 500);

              let replyInterval = setInterval(() => {
                if (document.querySelector(".replyIcon"))
                  clearInterval(replyInterval);
                document.querySelectorAll(".replyIcon").forEach((item) => {
                  item.addEventListener("click", replyToMessageFn);
                });
              }, 500);
            }
          }
        };
      }
    }
  };
}

if (document.querySelector(".addUser")) {
  document.querySelector(".addUser").addEventListener("click", () => {
    localStorage.removeItem("sub_group");
    openModal2();

    var mainContentContainer = document.querySelector(".mainContentContainer1");

    mainContentContainer.innerHTML = ``;

    var user_id = localStorage.getItem("user_id");

    const url = `${globalURl}/chats/${user_id}`;

    let xhr = new XMLHttpRequest();

    xhr.open("GET", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();

    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        let userData = JSON.parse(xhr.responseText);

        if (userData.length != 0) {
          userData.map((item, i, arr) => {
            var row = `
            <div class="chatContent" date-linkedId=${item.linked_to_id}>
                              
              <div class="defaultIcon" style='${
                item.image != null
                  ? "border: none; margin-left: 10px"
                  : "border: 1px solid #999"
              }'>
              ${
                item.image != null
                  ? `<img src=${item.image} />`
                  : `<i class='fas fa-user'></i>`
              }
                  
              </div>
  
              <h1 class="userEmail">${item.email}</h1>
  
              <div class="dotCircle"></div>
                  
            </div>`;
            mainContentContainer.innerHTML += row;
          });
        } else {
          mainContentContainer.innerHTML = `
            <div class="chatContent">
  
              <h1 class="userEmail" >Add Members to create group</h1>
                  
            </div>`;
        }
      }
    };
  });
  document
    .getElementById("add_member1")
    .addEventListener("click", addmemberpage);
  document
    .getElementById("add_member2")
    .addEventListener("click", addmemberpage);
}

if (document.querySelector(".startChartBtn1")) {
  document
    .querySelector(".startChartBtn1")
    .addEventListener("click", openNameModal);
}

let nameModal = document.getElementById("nameModal");

if (document.getElementById("editBox")) {
  document.getElementById("editBox").addEventListener("click", () => {
    localStorage.setItem("editGroupName", true);
    openNameModal();
  });
}

function openNameModal() {
  let userArray = [];

  document.querySelectorAll(".chatContentH1DotActive").forEach((item) => {
    userArray.push(Number(item.getAttribute("date-linkedId")));
  });
  sub_group = localStorage.getItem("sub_group");
  if (sub_group) {
    document.querySelector(".createGroupBtn").style.display = "block";
    document.querySelector(".updateGroupBtn").style.display = "none";
    document.querySelector(".createGroupBtn").innerText = "Create Subgroup";

    if (userArray.length > 0) {
      nameModal.style.transform = "scale(1)";
      nameModal.style.opacity = 1;
    } else {
      var myToast = Toastify({
        text: "At least Select 1 Members",
        duration: 2000,
      });

      myToast.showToast();
    }
  } else {
    let editGroupName = localStorage.getItem("editGroupName");
    let group_name = localStorage.getItem("group_name");

    if (editGroupName) {
      localStorage.removeItem("editGroupName");

      nameModal.style.transform = "scale(1)";
      nameModal.style.opacity = 1;

      document.getElementById("groupName").value = group_name;

      document.querySelector(".createGroupBtn").style.display = "none";
      document.querySelector(".updateGroupBtn").style.display = "block";
      document.querySelector(".createGroupBtn").innerText = "Create Group";
    } else {
      document.querySelector(".createGroupBtn").style.display = "block";
      document.querySelector(".updateGroupBtn").style.display = "none";
      if (userArray.length > 1) {
        nameModal.style.transform = "scale(1)";
        nameModal.style.opacity = 1;
        document.querySelector(".createGroupBtn").innerText = "Create Group";
      } else {
        var myToast = Toastify({
          text: "At least Select 2 Members",
          duration: 2000,
        });

        myToast.showToast();
      }
    }
  }
}

if (document.querySelector(".updateGroupBtn")) {
  document
    .querySelector(".updateGroupBtn")
    .addEventListener("click", updateGroupName);
}

function updateGroupName() {
  let group_name = document.getElementById("groupName").value;
  let group_id = localStorage.getItem("group_id");

  if (group_name != "") {
    const url = `${globalURl}/edit_group_name`;

    let xhr = new XMLHttpRequest();

    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(
      JSON.stringify({
        id: group_id,
        name: group_name,
      })
    );

    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        let userData = JSON.parse(xhr.responseText);

        if (userData.status == "Updated") {
          localStorage.setItem("group_name", group_name);

          var myToast = Toastify({
            text: "Group name changed successfully",
            duration: 2000,
          });

          myToast.showToast();

          nameModal.style.transform = "scale(0)";
          nameModal.style.opacity = 0;
          document.getElementById(
            "groupNamePara"
          ).innerHTML = `<span style='color: #084DD1;'>Group Name: </span>${
            userData.name.length > 10
              ? `${userData.name.slice()} ...`
              : userData.name
          }`;
          document.getElementById("groupName").value = "";
        }
      }
    };
  } else {
    var myToast = Toastify({
      text: "Group must have a name",
      duration: 2000,
    });

    myToast.showToast();
  }
}

if (document.getElementById("deleteBox")) {
  document
    .getElementById("deleteBox")
    .addEventListener("click", groupDeleteion);
}

function groupDeleteion(e) {
  let group_id = "";

  if (localStorage.getItem("group_id")) {
    group_id = localStorage.getItem("group_id");
  } else {
    group_id = e.currentTarget.parentElement
      .querySelector(".groupBox")
      .getAttribute("data-group_id");
  }

  const url = `${globalURl}/delete_group/${group_id}`;

  let xhr = new XMLHttpRequest();

  xhr.open("GET", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();

  // document.querySelector(".imgContainer").innerHTML = "";

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let userData = JSON.parse(xhr.responseText);

      if ((userData.status = "Deleted")) {
        document.getElementById("settingModal").style.transform = "scale(0)";
        document.getElementById("settingModal").style.opacity = "0";
        var myToast = Toastify({
          text: "Group deleted successfully",
          duration: 2000,
        });

        myToast.showToast();

        fetchGroupInfo();
      }
    }
  };
}

if (document.getElementById("nameModalCloseBtn")) {
  document.getElementById("nameModalCloseBtn").addEventListener("click", () => {
    nameModal.style.transform = "scale(0)";
    nameModal.style.opacity = 0;
  });
}

if (document.querySelector(".createGroupBtn")) {
  document
    .querySelector(".createGroupBtn")
    .addEventListener("click", sendGroupInfo);
}

function sendGroupInfo() {
  let userArray = [];

  document.querySelectorAll(".chatContentH1DotActive").forEach((item) => {
    userArray.push(Number(item.getAttribute("date-linkedId")));
  });
  sub_group = localStorage.getItem("sub_group");
  if (sub_group) {
    if (userArray.length >= 1) {
      let groupName = document.getElementById("groupName").value;

      if (groupName != "") {
        nameModal.style.transform = "scale(0)";
        nameModal.style.opacity = 0;

        localStorage.removeItem("replied_id");

        document.getElementById("nullHeading").style.display = "none";

        document.querySelector(".groupDiv").classList.remove("groupDivClicked");

        document.querySelectorAll(".userIcon").forEach((ele) => {
          ele.classList.remove("userClicked");
        });

        document.getElementById("sendMsgBtn").style.display = "none";
        document.getElementById("sendGroupMsgBtn").style.display = "none";
        document.getElementById("sendSubGroupMsgBtn").style.display = "block";

        document.querySelector(".rightUperRight").innerHTML = "";

        var user_id = localStorage.getItem("user_id");
        var group_id = localStorage.getItem("group_id");

        const url = `${globalURl}/create_sub_group`;

        let xhr = new XMLHttpRequest();

        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(
          JSON.stringify({
            user_id,
            members: userArray,
            groupName,
            group_id,
          })
        );

        xhr.onreadystatechange = function () {
          if (xhr.readyState == 4 && xhr.status == 200) {
            let userMessages = JSON.parse(xhr.responseText);
            groupUsersArr = [];

            userMessages.data?.map((obj) => {
              groupUsersArr.push(obj.email);
            });

            localStorage.removeItem("sub_group")

            localStorage.setItem("group_id", userMessages.group_id);
            localStorage.setItem("group_name", userMessages.group_name);
            closeModal2();

            document.getElementById("prospectImage").src =
              "./Assets/img/user.png";
            document.getElementById("prospectName").innerText =
              "No Prospect Added";
            document.getElementById("companyName").innerText = "";
            document.getElementById("descriptionName").innerText = "";
            document.getElementById("dbNameMessage").innerText = "";
            document.getElementById("dbNameMessagesecond").innerText = "";

            document
              .getElementById("prospectImage")
              .setAttribute("data-link", "");
            document.getElementById(
              "groupNamePara"
            ).innerHTML = `<span style='color: #084DD1;'>Group Name: </span>${
              userMessages.group_name?.length > 10
                ? `${userMessages.group_name.slice()} ...`
                : userMessages.group_name
            }`;

            document.getElementById('subGroupNamePara').style.display = 'block';

            document.getElementById(
              "subGroupNamePara"
            ).innerHTML = `<span style='color: #084DD1;'>Sub Group Name: </span>${
              userMessages.sub_group_name?.length > 10
                ? `${userMessages.sub_group_name.slice()} ...`
                : userMessages.sub_group_name
            }`;

            document.querySelector(".rightBox").style.display = "block";
            document.querySelector(".groupContainer").style.display = "none";
            document.querySelector(".chatMessageContent").style.display =
              "block";
            document.querySelector(".chatControlBtn").style.display = "block";

            document.querySelector(".rightUpperBox").style.display = "none";
            document.querySelector(".rightProspectBox").style.display = "flex";
            document.querySelector(".chatMessageContent").style.height =
              "240px";

            if (userMessages.admin == true) {
              document.getElementById("deleteBox").style.display = "flex";
            } else {
              document.getElementById("deleteBox").style.display = "none";
            }

            let chatMessageContent = document.querySelector(
              ".chatMessageContent"
            );

            chatMessageContent.innerHTML = "";

            document.querySelector(".showBtnContainer").innerHTML = "";
            document.querySelector(".showBtnContainer").innerHTML = `
            <button id="showMembers">Members</button>
            <button id="showSubGroupProspectBox">Prospects</button>
            <button id="showSubGroupDirectBox">Group Chat</button>
            `;

            localStorage.setItem('sub_group_id', userMessages.sub_group_id);

            if (userMessages.data) {
              userMessages.data.slice(0, 4).map((obj, i) => {
                document.querySelector(".dynamicContainer").innerHTML += `
                <div class="chatContent">
                            
                  <img src="./Assets/img/user.png" alt="">
    
                  <h1>${obj.email}</h1>
    
                </div>
                  `;
              });

              document.getElementById("groupName").value = "";
            }

            setTimeout(() => {
              document
                .getElementById("showMembers")
                .addEventListener("click", dynamicModalOpenM);
              document
                .getElementById("showSubGroupProspectBox")
                .addEventListener("click", openSubGroupMembersModal);
              document
                .getElementById("showSubGroupDirectBox")
                .addEventListener("click", nullSubGroupChats);
            }, 100);
          }
        };
      } else {
        var myToast = Toastify({
          text: "Please add Sub group name",
          duration: 2000,
        });

        myToast.showToast();
      }
    }
  } else {
    if (userArray.length > 1) {
      let groupName = document.getElementById("groupName").value;

      if (groupName != "") {
        nameModal.style.transform = "scale(0)";
        nameModal.style.opacity = 0;

        localStorage.removeItem("replied_id");

        document.getElementById("nullHeading").style.display = "none";

        document.querySelector(".groupDiv").classList.remove("groupDivClicked");

        document.querySelectorAll(".userIcon").forEach((ele) => {
          ele.classList.remove("userClicked");
        });

        document.getElementById("sendMsgBtn").style.display = "none";
        document.getElementById("sendGroupMsgBtn").style.display = "block";
        document.getElementById("sendSubGroupMsgBtn").style.display = "none";

        document.querySelector(".rightUperRight").innerHTML = "";

        var user_id = localStorage.getItem("user_id");

        const url = `${globalURl}/create_group`;

        let xhr = new XMLHttpRequest();

        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(
          JSON.stringify({
            user_id,
            members: userArray,
            groupName,
          })
        );

        xhr.onreadystatechange = function () {
          if (xhr.readyState == 4 && xhr.status == 200) {
            let userMessages = JSON.parse(xhr.responseText);
            groupUsersArr = [];

            userMessages.data?.map((obj) => {
              groupUsersArr.push(obj.email);
            });

            localStorage.setItem("group_id", userMessages.group_id);
            localStorage.setItem("group_name", userMessages.group_name);
            closeModal2();

            document.getElementById("prospectImage").src =
              "./Assets/img/user.png";
            document.getElementById("prospectName").innerText =
              "No Prospect Added";
            document.getElementById("companyName").innerText = "";
            document.getElementById("descriptionName").innerText = "";
            document.getElementById("dbNameMessage").innerText = "";
            document.getElementById("dbNameMessagesecond").innerText = "";

            document
              .getElementById("prospectImage")
              .setAttribute("data-link", "");
            document.getElementById(
              "groupNamePara"
            ).innerHTML = `<span style='color: #084DD1;'>Group Name: </span>${
              userMessages.group_name.length > 10
                ? `${userMessages.group_name.slice()} ...`
                : userMessages.group_name
            }`;

            document.querySelector(".rightBox").style.display = "block";
            document.querySelector(".groupContainer").style.display = "none";
            document.querySelector(".chatMessageContent").style.display =
              "block";
            document.querySelector(".chatControlBtn").style.display = "block";

            document.querySelector(".rightUpperBox").style.display = "none";
            document.querySelector(".rightProspectBox").style.display = "flex";
            document.querySelector(".chatMessageContent").style.height =
              "255px";

            document.querySelector(".showBtnContainer").innerHTML = "";
            document.querySelector(".showBtnContainer").innerHTML = `
              <button id="showMembers">Members</button>
              <button id="showprospectBox">Prospects</button>
              <button id="showDirectBox">Group Chat</button>
              `;

            if (userMessages.admin == true) {
              document.getElementById("deleteBox").style.display = "flex";
            } else {
              document.getElementById("deleteBox").style.display = "none";
            }

            let chatMessageContent = document.querySelector(
              ".chatMessageContent"
            );

            if (userMessages.data) {
              chatMessageContent.innerHTML = "";
              userMessages.data.slice(0, 4).map((obj, i) => {
                document.querySelector(".dynamicContainer").innerHTML += `
              <div class="chatContent">
                          
                <img src="./Assets/img/user.png" alt="">
  
                <h1>${obj.email}</h1>
  
              </div>
                `;
              });

              document.getElementById("groupName").value = "";
            }

            setTimeout(() => {
              document
                .getElementById("showMembers")
                .addEventListener("click", dynamicModalOpenM);
              document
                .getElementById("showprospectBox")
                .addEventListener("click", dynamicModalOpenP);
              document
                .getElementById("showDirectBox")
                .addEventListener("click", showNullChats);
            }, 100);
          }
        };
      } else {
        var myToast = Toastify({
          text: "Please add group name",
          duration: 2000,
        });

        myToast.showToast();
      }
    }
  }
}

// Group Message Button

if (document.getElementById("msgInp")) {
  document.getElementById("msgInp").addEventListener("keyup", checkForm);
}

function checkForm(e) {
  if (e.keyCode == 13) {
    if (document.getElementById("sendMsgBtn").style.display != "none") {
      sendMessage();
    }
    if (document.getElementById("sendGroupMsgBtn").style.display != "none") {
      sendGroupMessage();
    }
    if (document.getElementById("sendSubGroupMsgBtn").style.display != "none") {
      send_sub_group_message();
    }
  }
}

if (document.getElementById("sendGroupMsgBtn")) {
  document
    .getElementById("sendGroupMsgBtn")
    .addEventListener("click", (e) => sendGroupMessage(e));
}

function sendGroupMessage(e) {
  document.querySelectorAll(".menuBox").forEach((ele) => {
    ele.style.display = "none";
  });

  let msgInp = document.getElementById("msgInp");

  var user_id = localStorage.getItem("user_id");
  var group_id = localStorage.getItem("group_id");
  var prospect_id = localStorage.getItem("prospect_id");
  var replied_id = localStorage.getItem("replied_id");

  if (msgInp.value !== "") {
    if (document.getElementById("updateGroupMsgBtn").style.display == "none") {
      const url = `${globalURl}/send_group_message`;

      let xhr = new XMLHttpRequest();

      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(
        JSON.stringify({
          user_id,
          group_id,
          prospect_id,
          text: msgInp.value,
          replied_id,
        })
      );

      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
          let userMessages = JSON.parse(xhr.responseText);

          let chatMessageContent = document.querySelector(
            ".chatMessageContent"
          );

          if (userMessages.data.length > 0) {
            document.getElementById("sendGroupMsgBtn").style.display = "block";
            document.getElementById("updateGroupMsgBtn").style.display = "none";
            document.getElementById("cancelGroupMsgBtn").style.display = "none";
            document.getElementById("msgInp").value = "";

            userMessages.data.map((obj, i) => {
              if (obj.sender_id == user_id) {
                let dbTime = obj.created_at;

                let newDate = new Date();

                let UTCDate = new Date(
                  newDate.getUTCFullYear(),
                  newDate.getUTCMonth(),
                  newDate.getUTCDate(),
                  newDate.getUTCHours(),
                  newDate.getUTCMinutes(),
                  newDate.getUTCSeconds(),
                  newDate.getUTCMilliseconds()
                );

                let currentTime = Math.abs(
                  (UTCDate.getTime() / 1000).toFixed(0)
                );

                let futureTime = Math.abs(
                  (new Date(dbTime).getTime() / 1000).toFixed(0)
                );

                let TimeDifference = currentTime - futureTime;

                let days = Math.floor(TimeDifference / 86400);

                let hours = Math.floor(TimeDifference / 3600) % 24;

                let minutes = Math.floor(TimeDifference / 60) % 60;

                let seconds = Math.floor(TimeDifference % 60);

                let messageTimeString = "";

                if (days == 0) {
                  if (hours == 0) {
                    if (minutes == 0) {
                      if (seconds == 0) {
                        messageTimeString = `less than a second ago`;
                      } else {
                        messageTimeString =
                          seconds == 1
                            ? `${seconds} second ago`
                            : `${seconds} seconds ago`;
                      }
                    } else {
                      messageTimeString =
                        minutes == 1
                          ? `${minutes} minute ago`
                          : `${minutes} minutes ago`;
                    }
                  } else {
                    messageTimeString =
                      hours == 1 ? `${hours} hour ago` : `${hours} hours ago`;
                  }
                } else {
                  messageTimeString =
                    days == 1 ? `${days} day ago` : `${days} days ago`;
                }

                let row = `
                <div class='senderMsgContainer'>
                    
                <div class='myMessageDiv'>
                
                <div class="imageNameContainer">
                
                    <span class="senderName">${obj.username}</span>
                    <img src="${obj.image}" class='messageImage'/>
                  
                  </div>
                  <i class="far fa-ellipsis-v menuGroupIcon"></i>
  
                    <div class='menuBox' style="display: none">
                      <div class='editContainer editGroupContainer'>
                        <i class="far fa-edit"></i>
                        <h1>Edit</h1>
                      </div>
                      <div class="deleteContainer deleteGroupContainer">
                        <i class="far fa-trash"></i>
                        <h1>Delete</h1>
                      </div>
                    </div>
                      ${
                        obj.replied_id != null
                          ? `<div class="prospectReplyDiv">
                          <div class="prospectContentDiv">
                            <h1>${
                              obj.reply_msg != null
                                ? `<h1>${obj.reply_msg}</h1>`
                                : '<h1 style="font-style: italic; font-weight: 400; color: #555; width: auto;"><i class="fas fa-ban blockIcon"></i>The message was deleted</h1>'
                            }</h1>
                          </div>
                          ${
                            obj.reply_image != null
                              ? `<img src="${obj.reply_image}" class="replyImage1"/>`
                              : ""
                          }
                        </div>`
                          : ""
                      }
  
                      <i class="fas fa-reply myReplyIcon"></i>
  
                      <p class="messageTxt" data-replied_id=${obj.id}>${
                  obj.text
                }</p>
                      <div class="timestampDiv">
                        ${messageTimeString}
                      </div>
                    </div>
  
                </div>
                `;
                chatMessageContent.innerHTML += row;

                setTimeout(() => {
                  document.querySelectorAll(".menuGroupIcon").forEach((ele) => {
                    ele?.addEventListener("click", openGroupThreeDotMenu);
                  });
                }, 100);

                setTimeout(() => {
                  document.querySelectorAll(".myReplyIcon").forEach((ele) => {
                    ele.addEventListener("click", replyToMessageFn);
                  });
                }, 100);
              } else {
                let dbTime = obj.created_at;

                let newDate = new Date();

                let UTCDate = new Date(
                  newDate.getUTCFullYear(),
                  newDate.getUTCMonth(),
                  newDate.getUTCDate(),
                  newDate.getUTCHours(),
                  newDate.getUTCMinutes(),
                  newDate.getUTCSeconds(),
                  newDate.getUTCMilliseconds()
                );

                let currentTime = Math.abs(
                  (UTCDate.getTime() / 1000).toFixed(0)
                );

                let futureTime = Math.abs(
                  (new Date(dbTime).getTime() / 1000).toFixed(0)
                );

                let TimeDifference = currentTime - futureTime;

                let days = Math.floor(TimeDifference / 86400);

                let hours = Math.floor(TimeDifference / 3600) % 24;

                let minutes = Math.floor(TimeDifference / 60) % 60;

                let seconds = Math.floor(TimeDifference % 60);

                let messageTimeString = "";

                if (days == 0) {
                  if (hours == 0) {
                    if (minutes == 0) {
                      if (seconds == 0) {
                        messageTimeString = `less than a second ago`;
                      } else {
                        messageTimeString =
                          seconds == 1
                            ? `${seconds} second ago`
                            : `${seconds} seconds ago`;
                      }
                    } else {
                      messageTimeString =
                        minutes == 1
                          ? `${minutes} minute ago`
                          : `${minutes} minutes ago`;
                    }
                  } else {
                    messageTimeString =
                      hours == 1 ? `${hours} hour ago` : `${hours} hours ago`;
                  }
                } else {
                  messageTimeString =
                    days == 1 ? `${days} day ago` : `${days} days ago`;
                }

                let row = `
                  <div class="groupUserMsgContainer">
                  
                  
                  <div class='userMessageDiv'>
                  
                  <div class="imageNameContainer1">
                  <img src="${obj.image}" class='messageImage'/>
                      <span class="groupUserName">${obj.username}</span>
                    </div>
  
                    ${
                      obj.replied_id != null
                        ? `<div class="prospectReplyDiv1">
                        <div class="prospectContentDiv" style="${
                          obj.reply_image == null ? "width: 100%;" : ""
                        }">
                          <h1>${
                            obj.reply_msg != null
                              ? `<h1>${obj.reply_msg}</h1>`
                              : '<h1 style="font-style: italic; font-weight: 400; color: #555; width: auto;"><i class="fas fa-ban blockIcon"></i>The message was deleted</h1>'
                          }</h1>
                          </div>
                          ${
                            obj.reply_image != null
                              ? `<img src="${obj.reply_image}" class="replyImage1"/>`
                              : ""
                          }
                      </div>`
                        : ""
                    }
  
                      <i class="fas fa-reply replyIcon"></i>
                      
                      <p class="messageTxt" data-replied_id=${obj.id}>${
                  obj.text
                }</p>
                  
                <div class="timestampUserDiv">
                  ${messageTimeString}
                </div>
  
                    </div>
                    
                  </div>
                `;
                chatMessageContent.innerHTML += row;

                setTimeout(() => {
                  document.querySelectorAll(".replyIcon").forEach((ele) => {
                    ele.addEventListener("click", replyToMessageFn);
                  });
                }, 100);
              }

              chatMessageContent.scroll(0, chatMessageContent.scrollHeight);
            });
          }
          msgInp.value = "";

          replied_id = "";
          localStorage.removeItem("replied_id");

          let replyInterval = setInterval(() => {
            if (document.querySelector(".replyIcon")) {
              clearInterval(replyInterval);
              document.querySelectorAll(".replyIcon").forEach((ele) => {
                ele.classList.remove("replyIconClicked");
              });
            }
            if (document.querySelector(".myReplyIcon")) {
              clearInterval(replyInterval);
              document.querySelectorAll(".myReplyIcon").forEach((ele) => {
                ele.classList.remove("replyIconClicked");
              });
            }
          });
        }
      };
    } else {
      document.getElementById("sendMsgBtn").style.display = "none";
      document.getElementById("updateMsgBtn").style.display = "none";
      document.getElementById("cancelMsgBtn").style.display = "none";
      document.getElementById("sendGroupMsgBtn").style.display = "block";
      document.getElementById("updateGroupMsgBtn").style.display = "none";
      document.getElementById("cancelGroupMsgBtn").style.display = "none";
      document.getElementById("sendSubGroupMsgBtn").style.display = "none";
      document.getElementById("updateSubGroupMsgBtn").style.display = "none";
      document.getElementById("cancelSubGroupMsgBtn").style.display = "none";

      let message_id = localStorage.getItem("message_id");
      let updatedMessage = document.getElementById("msgInp").value;

      const url = `${globalURl}/edit_single_group_chat`;

      let xhr = new XMLHttpRequest();

      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(
        JSON.stringify({
          id: message_id,
          text: updatedMessage,
        })
      );

      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
          let response = JSON.parse(xhr.responseText);
          localStorage.removeItem("message_id");
          if (response.status == "Updated") {
            document.getElementById("msgInp").value = "";

            let nullGroupChat = localStorage.getItem("nullGroupChat");

            let url = "";

            if (nullGroupChat) {
              url = `${globalURl}/null_chats/${group_id}/${user_id}`;
            } else {
              url = `${globalURl}/chat_filter/${group_id}/${prospect_id}/${user_id}`;
            }

            let xhr = new XMLHttpRequest();

            xhr.open("GET", url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send();

            xhr.onreadystatechange = function () {
              if (xhr.readyState == 4 && xhr.status == 200) {
                let userData = JSON?.parse(xhr.responseText);

                if (userData.group_name) {
                  localStorage.setItem("group_name", userData.group_name);
                }

                if (userData.admin == true) {
                  document.getElementById("deleteBox").style.display = "flex";
                } else {
                  document.getElementById("deleteBox").style.display = "none";
                }

                if (userData.data) {
                  let chatMessageContent = document.querySelector(
                    ".chatMessageContent"
                  );
                  chatMessageContent.innerHTML = "";

                  userData.data.map((obj, i) => {
                    if (obj.text != null) {
                      if (obj.sender_id == user_id) {
                        let dbTime = obj.created_at;

                        let newDate = new Date();

                        let UTCDate = new Date(
                          newDate.getUTCFullYear(),
                          newDate.getUTCMonth(),
                          newDate.getUTCDate(),
                          newDate.getUTCHours(),
                          newDate.getUTCMinutes(),
                          newDate.getUTCSeconds(),
                          newDate.getUTCMilliseconds()
                        );

                        let currentTime = Math.abs(
                          (UTCDate.getTime() / 1000).toFixed(0)
                        );

                        let futureTime = Math.abs(
                          (new Date(dbTime).getTime() / 1000).toFixed(0)
                        );

                        let TimeDifference = currentTime - futureTime;

                        let days = Math.floor(TimeDifference / 86400);

                        let hours = Math.floor(TimeDifference / 3600) % 24;

                        let minutes = Math.floor(TimeDifference / 60) % 60;

                        let seconds = Math.floor(TimeDifference % 60);

                        let messageTimeString = "";

                        if (days == 0) {
                          if (hours == 0) {
                            if (minutes == 0) {
                              if (seconds == 0) {
                                messageTimeString = `less than a second ago`;
                              } else {
                                messageTimeString =
                                  seconds == 1
                                    ? `${seconds} second ago`
                                    : `${seconds} seconds ago`;
                              }
                            } else {
                              messageTimeString =
                                minutes == 1
                                  ? `${minutes} minute ago`
                                  : `${minutes} minutes ago`;
                            }
                          } else {
                            messageTimeString =
                              hours == 1
                                ? `${hours} hour ago`
                                : `${hours} hours ago`;
                          }
                        } else {
                          messageTimeString =
                            days == 1 ? `${days} day ago` : `${days} days ago`;
                        }

                        let row = `
                          <div class='senderMsgContainer'>
                          
                          <div class='myMessageDiv'>
                          
                          <div class="imageNameContainer">
                          
                              <span class="senderName">${obj.username}</span>
                              <img src="${obj.image}" class='messageImage'/>
                            
                            </div>
                            <i class="far fa-ellipsis-v menuGroupIcon"></i>
  
                          <div class='menuBox' style="display: none">
                            <div class='editContainer editGroupContainer'>
                              <i class="far fa-edit"></i>
                              <h1>Edit</h1>
                            </div>
                            <div class="deleteContainer deleteGroupContainer">
                              <i class="far fa-trash"></i>
                              <h1>Delete</h1>
                            </div>
                          </div>
                                ${
                                  obj.replied_id != null
                                    ? `<div class="prospectReplyDiv">
                                    <div class="prospectContentDiv" style="${
                                      obj.reply_image == null
                                        ? "width: 100%;"
                                        : ""
                                    }">
                                      <h1>${
                                        obj.reply_msg != null
                                          ? `<h1>${obj.reply_msg}</h1>`
                                          : '<h1 style="font-style: italic; font-weight: 400; color: #555; width: auto;"><i class="fas fa-ban blockIcon"></i>The message was deleted</h1>'
                                      }</h1>
                                    </div>
                                    ${
                                      obj.reply_image != null
                                        ? `<img src="${obj.reply_image}" class="replyImage1"/>`
                                        : ""
                                    }
                                  </div>`
                                    : ""
                                }
  
                                <i class="fas fa-reply myReplyIcon"></i>
  
                                <p class="messageTxt" data-replied_id=${
                                  obj.id
                                }>${obj.text}</p>
                                <div class="timestampDiv">
                                  ${messageTimeString}
                                </div>
                              </div>
  
                          </div>
                        `;
                        chatMessageContent.innerHTML += row;

                        setTimeout(() => {
                          document
                            .querySelectorAll(".menuGroupIcon")
                            .forEach((ele) => {
                              ele?.addEventListener(
                                "click",
                                openGroupThreeDotMenu
                              );
                            });
                        }, 100);

                        setTimeout(() => {
                          document
                            .querySelectorAll(".myReplyIcon")
                            .forEach((ele) => {
                              ele?.addEventListener("click", replyToMessageFn);
                            });
                        }, 100);
                      } else {
                        let dbTime = obj.created_at;

                        let newDate = new Date();

                        let UTCDate = new Date(
                          newDate.getUTCFullYear(),
                          newDate.getUTCMonth(),
                          newDate.getUTCDate(),
                          newDate.getUTCHours(),
                          newDate.getUTCMinutes(),
                          newDate.getUTCSeconds(),
                          newDate.getUTCMilliseconds()
                        );

                        let currentTime = Math.abs(
                          (UTCDate.getTime() / 1000).toFixed(0)
                        );

                        let futureTime = Math.abs(
                          (new Date(dbTime).getTime() / 1000).toFixed(0)
                        );

                        let TimeDifference = currentTime - futureTime;

                        let days = Math.floor(TimeDifference / 86400);

                        let hours = Math.floor(TimeDifference / 3600) % 24;

                        let minutes = Math.floor(TimeDifference / 60) % 60;

                        let seconds = Math.floor(TimeDifference % 60);

                        let messageTimeString = "";

                        if (days == 0) {
                          if (hours == 0) {
                            if (minutes == 0) {
                              if (seconds == 0) {
                                messageTimeString = `less than a second ago`;
                              } else {
                                messageTimeString =
                                  seconds == 1
                                    ? `${seconds} second ago`
                                    : `${seconds} seconds ago`;
                              }
                            } else {
                              messageTimeString =
                                minutes == 1
                                  ? `${minutes} minute ago`
                                  : `${minutes} minutes ago`;
                            }
                          } else {
                            messageTimeString =
                              hours == 1
                                ? `${hours} hour ago`
                                : `${hours} hours ago`;
                          }
                        } else {
                          messageTimeString =
                            days == 1 ? `${days} day ago` : `${days} days ago`;
                        }

                        let row = `
                          <div class="groupUserMsgContainer">
                          
                          
                          <div class='userMessageDiv'>
                          <div class="imageNameContainer1">
                          <img src="${obj.image}" class='messageImage'/>
                            <span class="groupUserName">${obj.username}</span>
                          </div>
                          
                            ${
                              obj.replied_id != null
                                ? `<div class="prospectReplyDiv1">
                                <div class="prospectContentDiv" style="${
                                  obj.reply_image == null ? "width: 100%;" : ""
                                }">
                                  <h1>${
                                    obj.reply_msg != null
                                      ? `<h1>${obj.reply_msg}</h1>`
                                      : '<h1 style="font-style: italic; font-weight: 400; color: #555; width: auto;"><i class="fas fa-ban blockIcon"></i>The message was deleted</h1>'
                                  }</h1>
                                </div>
                                ${
                                  obj.reply_image != null
                                    ? `<img src="${obj.reply_image}" class="replyImage1"/>`
                                    : ""
                                }
                              </div>`
                                : ""
                            }
                            
                              <i class="fas fa-reply replyIcon"></i>
                              
                              <p class="messageTxt" data-replied_id=${obj.id}>${
                          obj.text
                        }</p>
                        
                              <div class="timestampUserDiv">
                                ${messageTimeString}
                              </div>
                            </div>
  
                          </div>
                        `;
                        chatMessageContent.innerHTML += row;

                        setTimeout(() => {
                          document
                            .querySelectorAll(".replyIcon")
                            .forEach((ele) => {
                              ele.addEventListener("click", replyToMessageFn);
                            });
                        }, 100);
                      }

                      chatMessageContent.scroll(
                        0,
                        chatMessageContent.scrollHeight
                      );
                    }
                  });
                }
              }
            };
          }
        }
      };
    }
  }
}

// Modal 3 (Setting)

if (document.querySelector(".settingIcon")) {
  document
    .querySelector(".settingIcon")
    .addEventListener("click", openSettingModal);
}

var settingModal = document.getElementById("settingModal");

function openSettingModal() {
  settingModal.style.transform = "scale(1)";
  settingModal.style.opacity = 1;
}

document
  .getElementById("settingModalCloseBtn")
  .addEventListener("click", prospectModalClose);

function prospectModalClose() {
  settingModal.style.transform = "scale(0)";
  settingModal.style.opacity = 0;
}

// Modal 4 (dynamic modal)

if (document.getElementById("membersBox")) {
  document
    .getElementById("membersBox")
    .addEventListener("click", dynamicModalOpenM);
}

if (document.getElementById("prospectBox")) {
  document
    .getElementById("prospectBox")
    .addEventListener("click", dynamicModalOpenP);
}

if (document.getElementById("showprospectDiv")) {
  document
    .getElementById("showprospectDiv")
    .addEventListener("click", dynamicModalOpenP);
}

var dynamicModal = document.getElementById("dynamicModal");

function dynamicModalOpenM() {
  document.getElementById("dynamicModalH1").innerText = "Members";

  document.querySelector(".dynamicContainer").innerHTML = "";

  dynamicModal.style.transform = "scale(1)";
  dynamicModal.style.opacity = 1;

  groupUsersArr.map((ele) => {
    document.querySelector(".dynamicContainer").innerHTML += `
        <div class="chatContent">
                    
          <i class="fas fa-users"></i>

          <h1>${ele}</h1>

        </div>
        `;
  });
}

function dynamicModalOpenP() {
  document.querySelector(".dynamicContainer").innerHTML = "";

  document.getElementById("dynamicModalH1").innerText = "Prospects";

  localStorage.removeItem("replied_id");

  dynamicModal.style.transform = "scale(1)";
  dynamicModal.style.opacity = 1;

  var group_id = localStorage.getItem("group_id");
  var user_id = localStorage.getItem("user_id");

  const url = `${globalURl}/get_group_prospects/${group_id}/${user_id}`;

  let xhr = new XMLHttpRequest();

  xhr.open("GET", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let userData = JSON.parse(xhr.responseText);

      if (userData.data) {
        userData.data.map((ele) => {
          if (ele.prospect_data) {
            document.querySelector(".dynamicContainer").innerHTML += `
  
                  <div class="prospectContentContainer">
                    <div class="prospectContent" data-prospect_id=${
                      ele.prospect_id
                    }>
                                
                      <img src=${ele.prospect_data.image} alt=""/>
              
                      <div>
                        <h1>${ele.prospect_data.name}</h1>
                        <h2>${
                          ele.sender_name != null
                            ? `By ${ele.sender_name} ${
                                ele.database != null
                                  ? `from ${ele.database}`
                                  : ""
                              }`
                            : ""
                        }
                        </h2>
                      </div>
              
                      ${
                        ele.notifications != 0 && ele.notifications != null
                          ? `<span>${ele.notifications}</span>`
                          : ""
                      }
  
                    </div>
                    <i class="fas fa-trash prospectDeleteIcon groupProspectDelete"></i>
                    </div>
                    `;
          }
        });

        document.querySelector(".dynamicContainer").innerHTML += `
              <div class="prospectContent1">
                  <h1>No Prospect Chats</h1>
                  ${
                    userData.non_prospect_notifications != 0 &&
                    userData.non_prospect_notifications != null
                      ? `<span>${userData.non_prospect_notifications}</span>`
                      : ""
                  }
              </div>
            `;

        document.querySelectorAll(".groupProspectDelete").forEach((ele) => {
          ele.addEventListener("click", groupProspectDelete);
        });

        document.querySelectorAll(".prospectContent").forEach((element) => {
          element.addEventListener("click", showProspectChat);
        });
      } else {
        document.querySelector(".dynamicContainer").innerHTML = `
                <div class="prospectContent1">
                    <h1>No Prospect Chats</h1>
                    ${
                      userData.non_prospect_notifications != 0 &&
                      userData.non_prospect_notifications != null
                        ? `<span>${userData.non_prospect_notifications}</span>`
                        : ""
                    }
                </div>
                `;
      }
      document.querySelectorAll(".prospectContent1").forEach((ele) => {
        ele.addEventListener("click", () => {
          dynamicModalClose();
          showNullChats();
        });
      });
    }
  };
}

function groupProspectDelete(e) {
  let currentProspect = e.currentTarget.parentElement;

  let group_id = localStorage.getItem("group_id");
  let prospect_id = currentProspect
    .querySelector(".prospectContent")
    .getAttribute("data-prospect_id");

  const url = `${globalURl}/delete_group_prospect`;

  let xhr = new XMLHttpRequest();

  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(
    JSON.stringify({
      prospect_id,
      group_id,
    })
  );

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let userData = JSON.parse(xhr.responseText);

      if (userData.status == "Deleted") {
        dynamicModalOpenP();
      }
    }
  };
}

document
  .getElementById("dynamicModalCloseBtn")
  .addEventListener("click", dynamicModalClose);

function dynamicModalClose() {
  dynamicModal.style.transform = "scale(0)";
  dynamicModal.style.opacity = 0;

  document.getElementById("nullHeading").style.display = "flex";

  if (document.querySelector(".rightProspectBox").style.display == "flex") {
    document.getElementById("nullHeading").style.display = "none";
  }
  if (document.querySelector(".rightUpperBox").style.display == "flex") {
    document.getElementById("nullHeading").style.display = "none";
  }

  document.querySelectorAll(".userIcon").forEach((ele) => {
    ele.classList.remove("userClicked");
  });
}

function showProspectChat(e) {
  localStorage.removeItem("nullGroupChat");
  localStorage.removeItem("group_name");
  localStorage.removeItem("editGroupName");

  document.querySelector(".dynamicContainer").innerHTML = "";
  prospectModalClose();
  dynamicModalClose();

  document.getElementById("nullHeading").style.display = "none";

  let prospectId = e.currentTarget.getAttribute("data-prospect_id");

  document.getElementById("prospectImage").src = "./Assets/img/user.png";
  document.getElementById("prospectName").innerText = "";
  document.getElementById("companyName").innerText = "";
  document.getElementById("descriptionName").innerText = "";
  document.getElementById("prospectImage").setAttribute("data-link", "");

  document.querySelector(".groupDiv").classList.remove("groupDivClicked");

  document.getElementById("msgInp").value = "";

  var user_id = localStorage.getItem("user_id");
  var group_id = localStorage.getItem("group_id");

  const url = `${globalURl}/chat_filter/${group_id}/${prospectId}/${user_id}`;

  let xhr = new XMLHttpRequest();

  xhr.open("GET", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let userData = JSON.parse(xhr.responseText);

      groupUsersArr = userData.users;

      document.querySelector(".rightUperRight").style.height = "60px";
      document.querySelector(".rightBox").style.display = "block";
      document.querySelector(".groupContainer").style.display = "none";
      document.querySelector(".rightUperRight").innerHTML = "";
      document.querySelector(".rightUpperBox").style.display = "none";
      document.querySelector(".chatMessageContent").style.display = "block";
      document.querySelector(".chatControlBtn").style.display = "block";
      document.getElementById("sendMsgBtn").style.display = "none";
      document.getElementById("sendGroupMsgBtn").style.display = "block";
      document.getElementById("sendSubGroupMsgBtn").style.display = "none";
      document.querySelector(".rightProspectBox").style.display = "flex";

      document.querySelector(".chatMessageContent").style.height = "240px";

      let chatMessageContent = document.querySelector(".chatMessageContent");
      chatMessageContent.innerHTML = "";

      document.getElementById("prospectImage").src =
        userData.prospect_data.image;
      document
        .getElementById("prospectImage")
        .setAttribute("data-link", userData.prospect_data.profile_link);
      document.getElementById("prospectName").innerText =
        userData.prospect_data.name;
      if (userData.prospect_data.company) {
        document.getElementById(
          "companyName"
        ).innerText = `(${userData.prospect_data.company})`;
      }
      document.getElementById("descriptionName").innerText =
        userData.prospect_data.description.slice(0, 45) + "...";
      document.getElementById(
        "groupNamePara"
      ).innerHTML = `<span style='color: #084DD1;'>Group Name: </span>${
        userData.group_name.length > 10
          ? `${userData.group_name.slice()} ...`
          : userData.group_name
      }`;
      document.getElementById("dbNameMessage").innerText = `${
        userData.sender_name != null ? `Clipper: ${userData.sender_name}` : ""
      }`;

      document.getElementById("dbNameMessagesecond").innerText = `${
        userData.database != null ? `Database: ${userData.database}` : ""
      }`;

      localStorage.setItem("isProspectCollabClicked1", true);
      localStorage.setItem(
        "prospectCollabData1",
        JSON.stringify(userData.prospect_data)
      );
      localStorage.setItem("prospect_id1", userData.prospect_data.id);
      localStorage.setItem("prospect_id", userData.prospect_data.id);

      if (userData.group_name) {
        localStorage.setItem("group_name", userData.group_name);
      }

      if (userData.admin == true) {
        document.getElementById("deleteBox").style.display = "flex";
      } else {
        document.getElementById("deleteBox").style.display = "none";
      }

      document.querySelector(".showBtnContainer").innerHTML = "";
      document.querySelector(".showBtnContainer").innerHTML = `
      <button id="showMembers">Members</button>
      <button id="showprospectBox">Prospects</button>
      <button id="showDirectBox">Group Chat</button>
      `;

      if (userData.data) {
        userData.data.map((obj, i) => {
          if (obj.text != null) {
            if (obj.sender_id == user_id) {
              let dbTime = obj.created_at;

              let newDate = new Date();

              let UTCDate = new Date(
                newDate.getUTCFullYear(),
                newDate.getUTCMonth(),
                newDate.getUTCDate(),
                newDate.getUTCHours(),
                newDate.getUTCMinutes(),
                newDate.getUTCSeconds(),
                newDate.getUTCMilliseconds()
              );

              let currentTime = Math.abs((UTCDate.getTime() / 1000).toFixed(0));

              let futureTime = Math.abs(
                (new Date(dbTime).getTime() / 1000).toFixed(0)
              );

              let TimeDifference = currentTime - futureTime;

              let days = Math.floor(TimeDifference / 86400);

              let hours = Math.floor(TimeDifference / 3600) % 24;

              let minutes = Math.floor(TimeDifference / 60) % 60;

              let seconds = Math.floor(TimeDifference % 60);

              let messageTimeString = "";

              if (days == 0) {
                if (hours == 0) {
                  if (minutes == 0) {
                    if (seconds == 0) {
                      messageTimeString = `less than a second ago`;
                    } else {
                      messageTimeString =
                        seconds == 1
                          ? `${seconds} second ago`
                          : `${seconds} seconds ago`;
                    }
                  } else {
                    messageTimeString =
                      minutes == 1
                        ? `${minutes} minute ago`
                        : `${minutes} minutes ago`;
                  }
                } else {
                  messageTimeString =
                    hours == 1 ? `${hours} hour ago` : `${hours} hours ago`;
                }
              } else {
                messageTimeString =
                  days == 1 ? `${days} day ago` : `${days} days ago`;
              }

              let row = `
                  <div class='senderMsgContainer'>
                  
                  <div class='myMessageDiv'>
                  
                  <div class="imageNameContainer">
                  
                      <span class="senderName">${obj.username}</span>
                      <img src="${obj.image}" class='messageImage'/>
                    
                    </div>
                    <i class="far fa-ellipsis-v menuGroupIcon"></i>

                  <div class='menuBox' style="display: none">
                    <div class='editContainer editGroupContainer'>
                      <i class="far fa-edit"></i>
                      <h1>Edit</h1>
                    </div>
                    <div class="deleteContainer deleteGroupContainer">
                      <i class="far fa-trash"></i>
                      <h1>Delete</h1>
                    </div>
                  </div>
                        ${
                          obj.replied_id != null
                            ? `<div class="prospectReplyDiv">
                            <div class="prospectContentDiv" style="${
                              obj.reply_image == null ? "width: 100%;" : ""
                            }">
                              <h1>${
                                obj.reply_msg != null
                                  ? `<h1>${obj.reply_msg}</h1>`
                                  : '<h1 style="font-style: italic; font-weight: 400; color: #555; width: auto;"><i class="fas fa-ban blockIcon"></i>The message was deleted</h1>'
                              }</h1>
                            </div>
                            ${
                              obj.reply_image != null
                                ? `<img src="${obj.reply_image}" class="replyImage1"/>`
                                : ""
                            }
                          </div>`
                            : ""
                        }

                        <i class="fas fa-reply myReplyIcon"></i>

                        <p class="messageTxt" data-replied_id=${obj.id}>${
                obj.text
              }</p>
                        <div class="timestampDiv">
                          ${messageTimeString}
                        </div>
                      </div>

                  </div>
                `;
              chatMessageContent.innerHTML += row;

              setTimeout(() => {
                document.querySelectorAll(".menuGroupIcon").forEach((ele) => {
                  ele?.addEventListener("click", openGroupThreeDotMenu);
                });
              }, 100);

              setTimeout(() => {
                document.querySelectorAll(".myReplyIcon").forEach((ele) => {
                  ele?.addEventListener("click", replyToMessageFn);
                });
              }, 100);
            } else {
              let dbTime = obj.created_at;

              let newDate = new Date();

              let UTCDate = new Date(
                newDate.getUTCFullYear(),
                newDate.getUTCMonth(),
                newDate.getUTCDate(),
                newDate.getUTCHours(),
                newDate.getUTCMinutes(),
                newDate.getUTCSeconds(),
                newDate.getUTCMilliseconds()
              );

              let currentTime = Math.abs((UTCDate.getTime() / 1000).toFixed(0));

              let futureTime = Math.abs(
                (new Date(dbTime).getTime() / 1000).toFixed(0)
              );

              let TimeDifference = currentTime - futureTime;

              let days = Math.floor(TimeDifference / 86400);

              let hours = Math.floor(TimeDifference / 3600) % 24;

              let minutes = Math.floor(TimeDifference / 60) % 60;

              let seconds = Math.floor(TimeDifference % 60);

              let messageTimeString = "";

              if (days == 0) {
                if (hours == 0) {
                  if (minutes == 0) {
                    if (seconds == 0) {
                      messageTimeString = `less than a second ago`;
                    } else {
                      messageTimeString =
                        seconds == 1
                          ? `${seconds} second ago`
                          : `${seconds} seconds ago`;
                    }
                  } else {
                    messageTimeString =
                      minutes == 1
                        ? `${minutes} minute ago`
                        : `${minutes} minutes ago`;
                  }
                } else {
                  messageTimeString =
                    hours == 1 ? `${hours} hour ago` : `${hours} hours ago`;
                }
              } else {
                messageTimeString =
                  days == 1 ? `${days} day ago` : `${days} days ago`;
              }

              let row = `
                  <div class="groupUserMsgContainer">
                  
                  
                  <div class='userMessageDiv'>
                  <div class="imageNameContainer1">
                  <img src="${obj.image}" class='messageImage'/>
                    <span class="groupUserName">${obj.username}</span>
                  </div>
                  
                    ${
                      obj.replied_id != null
                        ? `<div class="prospectReplyDiv1">
                        <div class="prospectContentDiv" style="${
                          obj.reply_image == null ? "width: 100%;" : ""
                        }">

                          <h1>${
                            obj.reply_msg != null
                              ? `<h1>${obj.reply_msg}</h1>`
                              : '<h1 style="font-style: italic; font-weight: 400; color: #555; width: auto;"><i class="fas fa-ban blockIcon"></i>The message was deleted</h1>'
                          }</h1>
                        </div>
                        ${
                          obj.reply_image != null
                            ? `<img src="${obj.reply_image}" class="replyImage1"/>`
                            : ""
                        }
                      </div>`
                        : ""
                    }
                    
                      <i class="fas fa-reply replyIcon"></i>
                      
                      <p class="messageTxt" data-replied_id=${obj.id}>${
                obj.text
              }</p>
                
                      <div class="timestampUserDiv">
                        ${messageTimeString}
                      </div>
                    </div>

                  </div>
                `;
              chatMessageContent.innerHTML += row;

              setTimeout(() => {
                document.querySelectorAll(".replyIcon").forEach((ele) => {
                  ele.addEventListener("click", replyToMessageFn);
                });
              }, 100);
            }

            chatMessageContent.scroll(0, chatMessageContent.scrollHeight);
          }
        });

        setTimeout(() => {
          document
            .getElementById("showMembers")
            .addEventListener("click", dynamicModalOpenM);
          document
            .getElementById("showprospectBox")
            .addEventListener("click", dynamicModalOpenP);
          document
            .getElementById("showDirectBox")
            .addEventListener("click", showNullChats);
        }, 100);
      }
    }
  };
}

if (document.getElementById("DMBox")) {
  document.getElementById("DMBox").addEventListener("click", showNullChats);
}

function openGroupThreeDotMenu(e) {
  let currentMenuBox = e.currentTarget.parentElement.parentElement;

  setTimeout(() => {
    if (currentMenuBox.querySelector(".menuBox").style.display == "none") {
      document.querySelectorAll(".menuBox").forEach((ele) => {
        ele.style.display = "none";
      });
      currentMenuBox.querySelector(".menuBox").style.display = "block";
    } else {
      currentMenuBox.querySelector(".menuBox").style.display = "none";
    }
  }, 100);

  currentMenuBox
    .querySelector(".editContainer")
    .addEventListener("click", editGroupMessage);
  currentMenuBox
    .querySelector(".deleteContainer")
    .addEventListener("click", deleteGroupMessage);
}

function editGroupMessage(e) {
  document.querySelectorAll(".menuBox").forEach((ele) => {
    ele.style.display = "none";
  });

  let currentMessage = e.currentTarget.parentElement.parentElement;

  let message_id = currentMessage
    .querySelector(".messageTxt")
    .getAttribute("data-replied_id");
  let messageText = currentMessage.querySelector(".messageTxt").innerText;

  localStorage.setItem("message_id", message_id);

  document.getElementById("msgInp").value = messageText;

  document.getElementById("sendGroupMsgBtn").style.display = "none";
  document.getElementById("updateGroupMsgBtn").style.display = "block";
  document.getElementById("cancelGroupMsgBtn").style.display = "block";
}

document.getElementById("cancelGroupMsgBtn").addEventListener("click", () => {
  document.getElementById("sendGroupMsgBtn").style.display = "block";
  document.getElementById("updateGroupMsgBtn").style.display = "none";
  document.getElementById("cancelGroupMsgBtn").style.display = "none";
  document.getElementById("msgInp").value = "";
  localStorage.removeItem("message_id");
});

document
  .getElementById("updateGroupMsgBtn")
  .addEventListener("click", sendGroupMessage);

function deleteGroupMessage(e) {
  document.querySelectorAll(".menuBox").forEach((ele) => {
    ele.style.display = "none";
  });

  let currentMessage = e.currentTarget.parentElement.parentElement;

  let message_id = currentMessage
    .querySelector(".messageTxt")
    .getAttribute("data-replied_id");

  const url = `${globalURl}/delete_single_group_chat/${message_id}`;

  let xhr = new XMLHttpRequest();

  xhr.open("GET", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let userData = JSON.parse(xhr.responseText);

      if (userData.status == "Deleted") {
        var user_id = localStorage.getItem("user_id");
        var group_id = localStorage.getItem("group_id");
        var prospectId = localStorage.getItem("prospect_id");

        let nullGroupChat = localStorage.getItem("nullGroupChat");

        let url = "";

        if (nullGroupChat) {
          url = `${globalURl}/null_chats/${group_id}/${user_id}`;
        } else {
          url = `${globalURl}/chat_filter/${group_id}/${prospectId}/${user_id}`;
        }

        let xhr = new XMLHttpRequest();

        xhr.open("GET", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send();

        xhr.onreadystatechange = function () {
          if (xhr.readyState == 4 && xhr.status == 200) {
            let userData = JSON.parse(xhr.responseText);

            if (userData.group_name) {
              localStorage.setItem("group_name", userData.group_name);
            }

            if (userData.admin == true) {
              document.getElementById("deleteBox").style.display = "flex";
            } else {
              document.getElementById("deleteBox").style.display = "none";
            }

            if (userData.data) {
              let chatMessageContent = document.querySelector(
                ".chatMessageContent"
              );
              chatMessageContent.innerHTML = "";

              userData.data.map((obj, i) => {
                if (obj.text != null) {
                  if (obj.sender_id == user_id) {
                    let dbTime = obj.created_at;

                    let newDate = new Date();

                    let UTCDate = new Date(
                      newDate.getUTCFullYear(),
                      newDate.getUTCMonth(),
                      newDate.getUTCDate(),
                      newDate.getUTCHours(),
                      newDate.getUTCMinutes(),
                      newDate.getUTCSeconds(),
                      newDate.getUTCMilliseconds()
                    );

                    let currentTime = Math.abs(
                      (UTCDate.getTime() / 1000).toFixed(0)
                    );

                    let futureTime = Math.abs(
                      (new Date(dbTime).getTime() / 1000).toFixed(0)
                    );

                    let TimeDifference = currentTime - futureTime;

                    let days = Math.floor(TimeDifference / 86400);

                    let hours = Math.floor(TimeDifference / 3600) % 24;

                    let minutes = Math.floor(TimeDifference / 60) % 60;

                    let seconds = Math.floor(TimeDifference % 60);

                    let messageTimeString = "";

                    if (days == 0) {
                      if (hours == 0) {
                        if (minutes == 0) {
                          if (seconds == 0) {
                            messageTimeString = `less than a second ago`;
                          } else {
                            messageTimeString =
                              seconds == 1
                                ? `${seconds} second ago`
                                : `${seconds} seconds ago`;
                          }
                        } else {
                          messageTimeString =
                            minutes == 1
                              ? `${minutes} minute ago`
                              : `${minutes} minutes ago`;
                        }
                      } else {
                        messageTimeString =
                          hours == 1
                            ? `${hours} hour ago`
                            : `${hours} hours ago`;
                      }
                    } else {
                      messageTimeString =
                        days == 1 ? `${days} day ago` : `${days} days ago`;
                    }

                    let row = `
                        <div class='senderMsgContainer'>
                        
                        <div class='myMessageDiv'>
                        
                        <div class="imageNameContainer">
                        
                            <span class="senderName">${obj.username}</span>
                            <img src="${obj.image}" class='messageImage'/>
                          
                          </div>
                          <i class="far fa-ellipsis-v menuGroupIcon"></i>

                        <div class='menuBox' style="display: none">
                          <div class='editContainer editGroupContainer'>
                            <i class="far fa-edit"></i>
                            <h1>Edit</h1>
                          </div>
                          <div class="deleteContainer deleteGroupContainer">
                            <i class="far fa-trash"></i>
                            <h1>Delete</h1>
                          </div>
                        </div>
                              ${
                                obj.replied_id != null
                                  ? `<div class="prospectReplyDiv">
                                  <div class="prospectContentDiv" style="${
                                    obj.reply_image == null
                                      ? "width: 100%;"
                                      : ""
                                  }">

                                    <h1>${
                                      obj.reply_msg != null
                                        ? `<h1>${obj.reply_msg}</h1>`
                                        : '<h1 style="font-style: italic; font-weight: 400; color: #555; width: auto;"><i class="fas fa-ban blockIcon"></i>The message was deleted</h1>'
                                    }</h1>
                                  </div>
                                  ${
                                    obj.reply_image != null
                                      ? `<img src="${obj.reply_image}" class="replyImage1"/>`
                                      : ""
                                  }
                                </div>`
                                  : ""
                              }

                              <i class="fas fa-reply myReplyIcon"></i>

                              <p class="messageTxt" data-replied_id=${obj.id}>${
                      obj.text
                    }</p>
                              <div class="timestampDiv">
                                ${messageTimeString}
                              </div>
                            </div>

                        </div>
                      `;
                    chatMessageContent.innerHTML += row;

                    setTimeout(() => {
                      document
                        .querySelectorAll(".menuGroupIcon")
                        .forEach((ele) => {
                          ele?.addEventListener("click", openGroupThreeDotMenu);
                        });
                    }, 100);

                    setTimeout(() => {
                      document
                        .querySelectorAll(".myReplyIcon")
                        .forEach((ele) => {
                          ele?.addEventListener("click", replyToMessageFn);
                        });
                    }, 100);
                  } else {
                    let dbTime = obj.created_at;

                    let newDate = new Date();

                    let UTCDate = new Date(
                      newDate.getUTCFullYear(),
                      newDate.getUTCMonth(),
                      newDate.getUTCDate(),
                      newDate.getUTCHours(),
                      newDate.getUTCMinutes(),
                      newDate.getUTCSeconds(),
                      newDate.getUTCMilliseconds()
                    );

                    let currentTime = Math.abs(
                      (UTCDate.getTime() / 1000).toFixed(0)
                    );

                    let futureTime = Math.abs(
                      (new Date(dbTime).getTime() / 1000).toFixed(0)
                    );

                    let TimeDifference = currentTime - futureTime;

                    let days = Math.floor(TimeDifference / 86400);

                    let hours = Math.floor(TimeDifference / 3600) % 24;

                    let minutes = Math.floor(TimeDifference / 60) % 60;

                    let seconds = Math.floor(TimeDifference % 60);

                    let messageTimeString = "";

                    if (days == 0) {
                      if (hours == 0) {
                        if (minutes == 0) {
                          if (seconds == 0) {
                            messageTimeString = `less than a second ago`;
                          } else {
                            messageTimeString =
                              seconds == 1
                                ? `${seconds} second ago`
                                : `${seconds} seconds ago`;
                          }
                        } else {
                          messageTimeString =
                            minutes == 1
                              ? `${minutes} minute ago`
                              : `${minutes} minutes ago`;
                        }
                      } else {
                        messageTimeString =
                          hours == 1
                            ? `${hours} hour ago`
                            : `${hours} hours ago`;
                      }
                    } else {
                      messageTimeString =
                        days == 1 ? `${days} day ago` : `${days} days ago`;
                    }

                    let row = `
                        <div class="groupUserMsgContainer">
                        
                        
                        <div class='userMessageDiv'>
                        <div class="imageNameContainer1">
                        <img src="${obj.image}" class='messageImage'/>
                          <span class="groupUserName">${obj.username}</span>
                        </div>
                        
                          ${
                            obj.replied_id != null
                              ? `<div class="prospectReplyDiv1">
                              <div class="prospectContentDiv" style="${
                                obj.reply_image == null ? "width: 100%;" : ""
                              }">
                                <h1>${
                                  obj.reply_msg != null
                                    ? `<h1>${obj.reply_msg}</h1>`
                                    : '<h1 style="font-style: italic; font-weight: 400; color: #555; width: auto;"><i class="fas fa-ban blockIcon"></i>The message was deleted</h1>'
                                }</h1>
                              </div>
                              ${
                                obj.reply_image != null
                                  ? `<img src="${obj.reply_image}" class="replyImage1"/>`
                                  : ""
                              }
                            </div>`
                              : ""
                          }
                          
                            <i class="fas fa-reply replyIcon"></i>
                            
                            <p class="messageTxt" data-replied_id=${obj.id}>${
                      obj.text
                    }</p>
                      
                            <div class="timestampUserDiv">
                              ${messageTimeString}
                            </div>
                          </div>

                        </div>
                      `;
                    chatMessageContent.innerHTML += row;

                    setTimeout(() => {
                      document.querySelectorAll(".replyIcon").forEach((ele) => {
                        ele.addEventListener("click", replyToMessageFn);
                      });
                    }, 100);
                  }

                  chatMessageContent.scroll(0, chatMessageContent.scrollHeight);
                }
              });
            }
          }
        };
      }
    }
  };
}

function showNullChats() {
  localStorage.setItem("nullGroupChat", true);
  localStorage.removeItem("group_name");
  localStorage.removeItem("editGroupName");

  prospectModalClose();
  dynamicModalClose();

  localStorage.removeItem("prospect_id");

  document.getElementById("nullHeading").style.display = "none";

  document.getElementById("prospectImage").src = "./Assets/img/user.png";
  document.getElementById("prospectName").innerText = "No Prospect Added";
  document.getElementById("companyName").innerText = "";
  document.getElementById("descriptionName").innerText = "";
  document.getElementById("dbNameMessage").innerText = "";
  document.getElementById("dbNameMessagesecond").innerText = "";
  document.getElementById("prospectImage").setAttribute("data-link", "");

  document.querySelector(".groupDiv").classList.remove("groupDivClicked");

  document.getElementById("msgInp").value = "";

  var user_id = localStorage.getItem("user_id");
  var group_id = localStorage.getItem("group_id");

  const url = `${globalURl}/null_chats/${group_id}/${user_id}`;

  let xhr = new XMLHttpRequest();

  xhr.open("GET", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let userData = JSON.parse(xhr.responseText);

      groupUsersArr = userData.users;

      document.querySelector(".rightUperRight").style.height = "60px";
      document.querySelector(".rightBox").style.display = "block";
      document.querySelector(".groupContainer").style.display = "none";
      document.querySelector(".rightUperRight").innerHTML = "";
      document.querySelector(".rightUpperBox").style.display = "none";
      document.querySelector(".chatMessageContent").style.display = "block";
      document.querySelector(".chatControlBtn").style.display = "block";
      document.getElementById("sendMsgBtn").style.display = "none";
      document.getElementById("sendGroupMsgBtn").style.display = "block";
      document.getElementById("sendSubGroupMsgBtn").style.display = "none";
      document.querySelector(".rightProspectBox").style.display = "flex";

      document.querySelector(".chatMessageContent").style.height = "255px";

      document.getElementById(
        "groupNamePara"
      ).innerHTML = `<span style='color: #084DD1;'>Group Name: </span>${
        userData.group_name.length > 10
          ? `${userData.group_name.slice()} ...`
          : userData.group_name
      }`;
      document.getElementById("dbNameMessage").innerText = `${
        userData.sender_name != null
          ? `Clipper: ${userData.sender_name} ${
              userData.database != null ? ` Database: ${userData.database}` : ""
            }`
          : ""
      }`;

      let chatMessageContent = document.querySelector(".chatMessageContent");
      chatMessageContent.innerHTML = "";

      if (userData.group_name) {
        localStorage.setItem("group_name", userData.group_name);
      }

      if (userData.admin == true) {
        document.getElementById("deleteBox").style.display = "flex";
      } else {
        document.getElementById("deleteBox").style.display = "none";
      }

      document.querySelector(".showBtnContainer").innerHTML = "";
      document.querySelector(".showBtnContainer").innerHTML = `
      <button id="showMembers">Members</button>
      <button id="showprospectBox">Prospects</button>
      <button id="showDirectBox">Group Chat</button>
      `;

      if (userData.data) {
        userData.data.map((obj, i) => {
          if (obj.text != null) {
            if (obj.sender_id == user_id) {
              let dbTime = obj.created_at;

              let newDate = new Date();

              let UTCDate = new Date(
                newDate.getUTCFullYear(),
                newDate.getUTCMonth(),
                newDate.getUTCDate(),
                newDate.getUTCHours(),
                newDate.getUTCMinutes(),
                newDate.getUTCSeconds(),
                newDate.getUTCMilliseconds()
              );

              let currentTime = Math.abs((UTCDate.getTime() / 1000).toFixed(0));

              let futureTime = Math.abs(
                (new Date(dbTime).getTime() / 1000).toFixed(0)
              );

              let TimeDifference = currentTime - futureTime;

              let days = Math.floor(TimeDifference / 86400);

              let hours = Math.floor(TimeDifference / 3600) % 24;

              let minutes = Math.floor(TimeDifference / 60) % 60;

              let seconds = Math.floor(TimeDifference % 60);

              let messageTimeString = "";

              if (days == 0) {
                if (hours == 0) {
                  if (minutes == 0) {
                    if (seconds == 0) {
                      messageTimeString = `less than a second ago`;
                    } else {
                      messageTimeString =
                        seconds == 1
                          ? `${seconds} second ago`
                          : `${seconds} seconds ago`;
                    }
                  } else {
                    messageTimeString =
                      minutes == 1
                        ? `${minutes} minute ago`
                        : `${minutes} minutes ago`;
                  }
                } else {
                  messageTimeString =
                    hours == 1 ? `${hours} hour ago` : `${hours} hours ago`;
                }
              } else {
                messageTimeString =
                  days == 1 ? `${days} day ago` : `${days} days ago`;
              }

              let row = `
              <div class='senderMsgContainer'>
                  
              <div class='myMessageDiv'>
              
              <div class="imageNameContainer">
              
                  <span class="senderName">${obj.username}</span>
                  <img src="${obj.image}" class='messageImage'/>
                
                </div>
                <i class="far fa-ellipsis-v menuGroupIcon"></i>

              <div class='menuBox' style="display: none">
                <div class='editContainer editGroupContainer'>
                  <i class="far fa-edit"></i>
                  <h1>Edit</h1>
                </div>
                <div class="deleteContainer deleteGroupContainer">
                  <i class="far fa-trash"></i>
                  <h1>Delete</h1>
                </div>
              </div>
                    ${
                      obj.replied_id != null
                        ? `<div class="prospectReplyDiv">
                        <div class="prospectContentDiv" style="${
                          obj.reply_image == null ? "width: 100%;" : ""
                        }">

                          <h1>${
                            obj.reply_msg != null
                              ? `<h1>${obj.reply_msg}</h1>`
                              : '<h1 style="font-style: italic; font-weight: 400; color: #555; width: auto;"><i class="fas fa-ban blockIcon"></i>The message was deleted</h1>'
                          }</h1>
                        </div>
                        ${
                          obj.reply_image != null
                            ? `<img src="${obj.reply_image}" class="replyImage1"/>`
                            : ""
                        }
                      </div>`
                        : ""
                    }

                    <i class="fas fa-reply myReplyIcon"></i>

                    <p class="messageTxt" data-replied_id=${obj.id}>${
                obj.text
              }</p>
                    <div class="timestampDiv">
                      ${messageTimeString}
                    </div>
                  </div>

              </div>
                `;
              chatMessageContent.innerHTML += row;

              setTimeout(() => {
                document.querySelectorAll(".menuGroupIcon").forEach((ele) => {
                  ele?.addEventListener("click", openGroupThreeDotMenu);
                });
              }, 100);

              setTimeout(() => {
                document.querySelectorAll(".myReplyIcon").forEach((ele) => {
                  ele.addEventListener("click", replyToMessageFn);
                });
              }, 100);
            } else {
              let dbTime = obj.created_at;

              let newDate = new Date();

              let UTCDate = new Date(
                newDate.getUTCFullYear(),
                newDate.getUTCMonth(),
                newDate.getUTCDate(),
                newDate.getUTCHours(),
                newDate.getUTCMinutes(),
                newDate.getUTCSeconds(),
                newDate.getUTCMilliseconds()
              );

              let currentTime = Math.abs((UTCDate.getTime() / 1000).toFixed(0));

              let futureTime = Math.abs(
                (new Date(dbTime).getTime() / 1000).toFixed(0)
              );

              let TimeDifference = currentTime - futureTime;

              let days = Math.floor(TimeDifference / 86400);

              let hours = Math.floor(TimeDifference / 3600) % 24;

              let minutes = Math.floor(TimeDifference / 60) % 60;

              let seconds = Math.floor(TimeDifference % 60);

              let messageTimeString = "";

              if (days == 0) {
                if (hours == 0) {
                  if (minutes == 0) {
                    if (seconds == 0) {
                      messageTimeString = `less than a second ago`;
                    } else {
                      messageTimeString =
                        seconds == 1
                          ? `${seconds} second ago`
                          : `${seconds} seconds ago`;
                    }
                  } else {
                    messageTimeString =
                      minutes == 1
                        ? `${minutes} minute ago`
                        : `${minutes} minutes ago`;
                  }
                } else {
                  messageTimeString =
                    hours == 1 ? `${hours} hour ago` : `${hours} hours ago`;
                }
              } else {
                messageTimeString =
                  days == 1 ? `${days} day ago` : `${days} days ago`;
              }

              let row = `
                  <div class="groupUserMsgContainer">
                  
                  
                  <div class='userMessageDiv'>
                  
                  <div class="imageNameContainer1">
                  <img src="${obj.image}" class='messageImage'/>
                    <span class="groupUserName">${obj.username}</span>
                  </div>

                    ${
                      obj.replied_id != null
                        ? `<div class="prospectReplyDiv1">
                        <div class="prospectContentDiv" style="${
                          obj.reply_image == null ? "width: 100%;" : ""
                        }">
                          <h1>${
                            obj.reply_msg != null
                              ? `<h1>${obj.reply_msg}</h1>`
                              : '<h1 style="font-style: italic; font-weight: 400; color: #555; width: auto;"><i class="fas fa-ban blockIcon"></i>The message was deleted</h1>'
                          }</h1>
                        </div>
                        ${
                          obj.reply_image != null
                            ? `<img src="${obj.reply_image}" class="replyImage1"/>`
                            : ""
                        }
                      </div>`
                        : ""
                    }

                      <i class="fas fa-reply replyIcon"></i>

                      <p class="messageTxt" data-replied_id=${obj.id}>${
                obj.text
              }</p>
              
              <div class="timestampUserDiv">
                ${messageTimeString}
              </div>
                    </div>
                    
                  
                  </div>
                `;
              chatMessageContent.innerHTML += row;

              setTimeout(() => {
                document.querySelectorAll(".replyIcon").forEach((ele) => {
                  ele.addEventListener("click", replyToMessageFn);
                });
              }, 100);
            }

            chatMessageContent.scroll(0, chatMessageContent.scrollHeight);
          }
        });
      }

      setTimeout(() => {
        document
          .getElementById("showMembers")
          .addEventListener("click", dynamicModalOpenM);
        document
          .getElementById("showprospectBox")
          .addEventListener("click", dynamicModalOpenP);
        document
          .getElementById("showDirectBox")
          .addEventListener("click", showNullChats);
      }, 100);
    }
  };
}

function addmemberpage() {
  localStorage.setItem("backpage", true);
  document.location.href = "share.html";
}

if (document.getElementById("img__logo")) {
  document.getElementById("img__logo").addEventListener("click", () => {
    window.location.href = "home.html";
  });
}

// if (document.getElementById("prospectName")) {
//   document.getElementById("prospectName").addEventListener("click", () => {
//     if (
//       document.getElementById("prospectName").innerText != "No Prospect Added"
//     ) {
//       let prospect_link = document
//         .querySelector("#prospectImage")
//         .getAttribute("data-link");

//       let params = {
//         active: true,
//         currentWindow: true,
//       };
//       chrome.tabs.query(params, gotTab);

//       function gotTab(tabs) {
//         let msg = {
//           txt: prospect_link,
//         };
//         chrome.tabs.sendMessage(tabs[0].id, msg);

//         localStorage.removeItem("isProspectCollabClicked1");
//         localStorage.removeItem("prospectCollabData1");
//         localStorage.removeItem("prospect_id1");
//       }
//     }
//   });
// }

if (document.getElementById("prospectImage")) {
  document.getElementById("prospectImage").addEventListener("click", () => {
    if (
      document.getElementById("prospectName").innerText != "No Prospect Added"
    ) {
      let prospect_link = document
        .querySelector("#prospectImage")
        .getAttribute("data-link");

      let params = {
        active: true,
        currentWindow: true,
      };
      chrome.tabs.query(params, gotTab);

      function gotTab(tabs) {
        let msg = {
          txt: prospect_link,
        };
        chrome.tabs.sendMessage(tabs[0].id, msg);

        localStorage.removeItem("isProspectCollabClicked1");
        localStorage.removeItem("prospectCollabData1");
        localStorage.removeItem("prospect_id1");
      }
    }
  });
}

if (document.getElementById("search_box")) {
  document.getElementById("search_box").addEventListener("keyup", searchData);
}

function searchData(e) {
  let inpValue = e.target.value;

  let user_id = localStorage.getItem("user_id");

  if (inpValue) {
    document.querySelector(".searchBoxContainer").style.display = "block";

    let url = `${globalURl}/addMemberComment/${user_id}/${inpValue}`;

    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();

    xhr.onreadystatechange = function () {
      //Call a function when the state changes.
      if (xhr.readyState == 4 && xhr.status == 200) {
        const userData = JSON.parse(xhr.responseText);

        let colorArr = [
          "row1TimeSpecial1",
          "row1TimeSpecial2",
          "row1TimeSpecial3",
        ];

        if (userData.length > 0) {
          document.querySelector(".userContainer").innerHTML = "";
          userData.map((item, i) => {
            document.querySelector(".userContainer").innerHTML += `
              <p class='searchUser ${
                colorArr[Math.floor(Math.random() * (2 - 0 + 1) + 0)]
              }' data-linked_to_id=${item.linked_to_id}>${item.mutual}</p>
              `;
          });
        } else {
          document.querySelector(".userContainer").innerHTML = `
            <div class="userTitle" style="color: red; ">No User Found</div>
          `;
        }
        document.querySelectorAll(".searchUser").forEach((ele) => {
          ele.addEventListener("click", showProspectData);
        });
      }
    };

    document.querySelector(".prospectContainer").innerHTML = `
      <div class='loader'></div>
    `;

    setTimeout(() => {
      let url1 = `${globalURl}/search_calender/${user_id}/${inpValue}`;
      var xhr1 = new XMLHttpRequest();
      xhr1.open("GET", url1, true);
      xhr1.setRequestHeader("Content-Type", "application/json");
      xhr1.send();

      xhr1.onreadystatechange = function () {
        //Call a function when the state changes.
        if (xhr1.readyState == 4 && xhr1.status == 200) {
          const userData1 = JSON.parse(xhr1.responseText);
          if (userData1.data.length > 0) {
            let colorArr = [
              "row1TimeSpecial1",
              "row1TimeSpecial2",
              "row1TimeSpecial3",
            ];
            document.querySelector(".prospectContainer").innerHTML = "";
            userData1.data.map((item1, i) => {
              document.querySelector(".prospectContainer").innerHTML += `
                      <p class='searchProspect ${
                        colorArr[Math.floor(Math.random() * (2 - 0 + 1) + 0)]
                      }' data-id=${item1.id}>${item1.name}</p>
                      `;
            });
            document.querySelectorAll(".searchProspect").forEach((ele) => {
              ele.addEventListener("click", goToCliperPage);
            });
          } else {
            document.querySelector(".prospectContainer").innerHTML = `
                    <div class="userTitle" style="color: red; ">No Prospect Found</div>
                  `;
          }
        }
      };
    }, 1000);
  } else {
    document.querySelector(".searchBoxContainer").style.display = "none";
  }
}

function showProspectData(e) {
  localStorage.removeItem("replied_id");
  document.querySelector(".searchBoxContainer").style.display = "none";

  let receiver_id = e.target.getAttribute("data-linked_to_id");
  localStorage.setItem("receiver_id", receiver_id);

  document.querySelectorAll(".userIcon").forEach((ele) => {
    ele.classList.remove("userClicked");
    if (ele.getAttribute("data-receiverId") == receiver_id) {
      ele.classList.add("userClicked");
      document.getElementById("search_box").value = "";
      document.querySelector(".rightProspectBox").style.display = "none";
      document.querySelector(".chatMessageContent").style.height = "280px";
      getUserMessages();
    }
  });
}

function goToCliperPage(e) {
  let prospect_id = e.target.getAttribute("data-id");
  let user_id = localStorage.getItem("user_id");

  const url = `${globalURl}/get_prospectData/${prospect_id}/${user_id}`;

  let xhr = new XMLHttpRequest();

  xhr.open("GET", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let userData = JSON.parse(xhr.responseText);

      if (userData.data) {
        localStorage.setItem("prospectData", JSON.stringify(userData.data));
        let link = userData.data.profile_link;

        let params = {
          active: true,
          currentWindow: true,
        };
        chrome.tabs.query(params, gotTab);

        function gotTab(tabs) {
          let msg = {
            txt: link,
          };
          chrome.tabs.sendMessage(tabs[0].id, msg);
          localStorage.setItem("modalProspectId", prospect_id);
          localStorage.setItem("modalProspectLink", link);
          localStorage.setItem("isImageClicked", true);
          window.location.replace("popup.html");
        }
      }
    }
  };
}

function groupleaveion(e) {
  let group_id = "";

  if (localStorage.getItem("group_id")) {
    group_id = localStorage.getItem("group_id");
  } else {
    group_id = e.currentTarget.parentElement
      .querySelector(".groupBox")
      .getAttribute("data-group_id");
  }
  user_id = localStorage.getItem("user_id");

  const url = `${globalURl}/leave_group/${group_id}/${user_id}`;

  let xhr = new XMLHttpRequest();

  xhr.open("GET", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();

  // document.querySelector(".imgContainer").innerHTML = "";

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let userData = JSON.parse(xhr.responseText);

      if ((userData.status = "Deleted")) {
        document.getElementById("settingModal").style.transform = "scale(0)";
        document.getElementById("settingModal").style.opacity = "0";
        var myToast = Toastify({
          text: "Group left successfully",
          duration: 2000,
        });

        myToast.showToast();

        fetchGroupInfo();
      }
    }
  };
}

if (document.querySelector(".viewSubGroupBtn")) {
  document
    .querySelector(".viewSubGroupBtn")
    .addEventListener("click", openSubGroupModal);
}

if (document.getElementById("subGroupModalCloseBtn")) {
  document
    .getElementById("subGroupModalCloseBtn")
    .addEventListener("click", closeSubGroupModal);
}

function openSubGroupModal() {
  localStorage.removeItem("sub_group");

  document.getElementById("subGroupModal").style.transform = "scale(1)";
  document.getElementById("subGroupModal").style.opacity = 1;

  var user_id = localStorage.getItem("user_id");
  var group_id = localStorage.getItem("group_id");

  const url = `${globalURl}/get_sub_groups/${group_id}/${user_id}`;

  let xhr = new XMLHttpRequest();

  xhr.open("GET", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();

  xhr.onreadystatechange = function () {
    //Call a function when the state changes.
    if (xhr.readyState == 4 && xhr.status == 200) {
      let userData = JSON.parse(xhr.responseText);

      if (userData.length > 0) {
        document.querySelector(".subGroupContainer").innerHTML = "";
        userData.map((item) => {
          document.querySelector(".subGroupContainer").innerHTML += `
                <div style="position: relative;margin-left: 10px;">

                <div class="subGroupBox" data-sub-group_id=${item.sub_group_id}>
                <span class="tooltiptext"><span style="color:red">Name: </span>${
                  item.name
                }
                </span>

                ${item.members
                  .slice(0, 4)
                  .map((ele) => {
                    return `<img src="${ele}" class="userIconDemo" data-receiverid="32">`;
                  })
                  .join("")}
                  
                  </div>
                  <div class="groupName">${
                    item.name.length > 10
                      ? `${item.name.slice(0, 10)} ...`
                      : item.name
                  }</div>
                  ${
                    item.admin != false
                      ? `<div class="deleteGroupBox"><i class="fas fa-trash groupDeleteIcon"></i></div>`
                      : ""
                  }
                  <div class="leaveGroupBox"><i class="fas fa-user-minus"></i></div>
                </div>
            `;
        });
        document.querySelectorAll(".subGroupBox").forEach((ele) => {
          ele.addEventListener("click", () => {
            localStorage.setItem(
              "sub_group_id",
              ele.getAttribute("data-sub-group_id")
            );
            openSubGroupMembersModal();
          });
        });

        // document.querySelectorAll(".deleteGroupBox").forEach((ele) => {
        //   ele.addEventListener("click", groupDeleteion);
        // });
        // document.querySelectorAll(".leaveGroupBox").forEach((ele) => {
        //   ele.addEventListener("click", groupleaveion);
        // });
      } else {
        document.querySelector(".subGroupContainer").innerHTML =
          "<h1 class='groupNullHeading'>No sub groups to show</h1>";
      }
    }
  };
}

function closeSubGroupModal() {
  document.getElementById("subGroupModal").style.transform = "scale(0)";
  document.getElementById("subGroupModal").style.opacity = 0;
}

function openSubGroupMembersModal() {
  document.getElementById("subGroupMembersModal").style.transform = "scale(1)";
  document.getElementById("subGroupMembersModal").style.opacity = 1;

  var group_id = localStorage.getItem("group_id");
  var user_id = localStorage.getItem("user_id");
  var sub_group_id = localStorage.getItem("sub_group_id");

  const url = `${globalURl}/get_sub_group_prospects/${group_id}/${sub_group_id}/${user_id}`;

  let xhr = new XMLHttpRequest();

  xhr.open("GET", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let userData = JSON.parse(xhr.responseText);

      if (userData.data?.length > 0) {
        document.querySelector(".subGroupMembersModalContainer").innerHTML = "";
        userData.data.map((ele) => {
          if (ele.prospect_data) {
            document.querySelector(
              ".subGroupMembersModalContainer"
            ).innerHTML += `
  
                  <div class="prospectContentContainer">
                    <div class="prospectContent subGroupProspect" data-prospect_id=${
                      ele.prospect_id
                    }>
                                
                      <img src=${ele.prospect_data.image} alt=""/>
              
                      <div>
                        <h1>${ele.prospect_data.name}</h1>
                        <h2>${
                          ele.sender_name != null
                            ? `By ${ele.sender_name} ${
                                ele.database != null
                                  ? `from ${ele.database}`
                                  : ""
                              }`
                            : ""
                        }
                        </h2>
                      </div>
              
                      ${
                        ele.notifications != 0 && ele.notifications != null
                          ? `<span>${ele.notifications}</span>`
                          : ""
                      }
  
                    </div>
                    <i class="fas fa-trash prospectDeleteIcon subGroupProspectDelete"></i>
                    </div>
                    `;
          }
        });

        document.querySelector(".subGroupMembersModalContainer").innerHTML += `
              <div class="prospectContent1 subGroupProspectContent1">
                  <h1>No Prospect Chats</h1>
                  ${
                    userData.non_prospect_notifications != 0 &&
                    userData.non_prospect_notifications != null
                      ? `<span>${userData.non_prospect_notifications}</span>`
                      : ""
                  }
              </div>
            `;

        document.querySelectorAll(".subGroupProspectDelete").forEach((ele) => {
          ele.addEventListener("click", subGroupProspectDelete);
        });

        document.querySelectorAll(".subGroupProspect").forEach((element) => {
          element.addEventListener("click", showSubGroupProspectChat);
        });
      } else {
        document.querySelector(".subGroupMembersModalContainer").innerHTML = "";
        document.querySelector(".subGroupMembersModalContainer").innerHTML = `
                <div class="prospectContent1 subGroupProspectContent1">
                    <h1>No Prospect Chats</h1>
                    ${
                      userData.non_prospect_notifications != 0 &&
                      userData.non_prospect_notifications != null
                        ? `<span>${userData.non_prospect_notifications}</span>`
                        : ""
                    }
                </div>
                `;
      }
      document.querySelectorAll(".subGroupProspectContent1").forEach((ele) => {
        ele.addEventListener("click", () => {
          nullSubGroupChats();
        });
      });
    }
  };
}

function showSubGroupProspectChat(e) {
  localStorage.removeItem("nullGroupChat");
  localStorage.removeItem("group_name");
  localStorage.removeItem("editGroupName");

  document.querySelector(".dynamicContainer").innerHTML = "";

  prospectModalClose();
  dynamicModalClose();
  closeSubGroupModal();

  document.getElementById("subGroupMembersModal").style.transform = "scale(0)";
  document.getElementById("subGroupMembersModal").style.opacity = 0;

  document.getElementById("nullHeading").style.display = "none";

  let prospectId = e.currentTarget.getAttribute("data-prospect_id");

  document.getElementById("prospectImage").src = "./Assets/img/user.png";
  document.getElementById("prospectName").innerText = "";
  document.getElementById("companyName").innerText = "";
  document.getElementById("descriptionName").innerText = "";
  document.getElementById("prospectImage").setAttribute("data-link", "");

  document.querySelector(".groupDiv").classList.remove("groupDivClicked");

  document.getElementById("msgInp").value = "";

  var user_id = localStorage.getItem("user_id");
  var group_id = localStorage.getItem("group_id");
  var sub_group_id = localStorage.getItem("sub_group_id");

  const url = `${globalURl}/sub_group_chat_filter/${group_id}/${sub_group_id}/${prospectId}/${user_id}`;

  let xhr = new XMLHttpRequest();

  xhr.open("GET", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let userData = JSON.parse(xhr.responseText);

      groupUsersArr = userData.users;

      document.querySelector(".rightUperRight").style.height = "60px";
      document.querySelector(".rightBox").style.display = "block";
      document.querySelector(".groupContainer").style.display = "none";
      document.querySelector(".rightUperRight").innerHTML = "";
      document.querySelector(".rightUpperBox").style.display = "none";
      document.querySelector(".chatMessageContent").style.display = "block";
      document.querySelector(".chatControlBtn").style.display = "block";
      document.getElementById("sendMsgBtn").style.display = "none";
      document.getElementById("sendGroupMsgBtn").style.display = "none";
      document.getElementById("sendSubGroupMsgBtn").style.display = "block";
      document.querySelector(".rightProspectBox").style.display = "flex";

      document.querySelector(".chatMessageContent").style.height = "240px";

      let chatMessageContent = document.querySelector(".chatMessageContent");

      document.getElementById("prospectImage").src =
        userData.prospect_data.image;
      document
        .getElementById("prospectImage")
        .setAttribute("data-link", userData.prospect_data.profile_link);
      document.getElementById("prospectName").innerText =
        userData.prospect_data.name;
      if (userData.prospect_data.company) {
        document.getElementById(
          "companyName"
        ).innerText = `(${userData.prospect_data.company})`;
      }
      document.getElementById("descriptionName").innerText =
        userData.prospect_data.description.slice(0, 45) + "...";
      document.getElementById(
        "groupNamePara"
      ).innerHTML = `<span style='color: #084DD1;'>Group Name: </span>${
        userData.group_name.length > 10
          ? `${userData.group_name.slice()} ...`
          : userData.group_name
      }`;
      document.getElementById("dbNameMessage").innerText = `${
        userData.sender_name != null ? `Clipper: ${userData.sender_name}` : ""
      }`;

      document.getElementById("dbNameMessagesecond").innerText = `${
        userData.database != null ? `Database: ${userData.database}` : ""
      }`;

      localStorage.setItem("isProspectCollabClicked1", true);
      localStorage.setItem(
        "prospectCollabData1",
        JSON.stringify(userData.prospect_data)
      );
      localStorage.setItem("prospect_id1", userData.prospect_data.id);
      localStorage.setItem("prospect_id", userData.prospect_data.id);

      if (userData.group_name) {
        localStorage.setItem("group_name", userData.group_name);
      }

      if (userData.admin == true) {
        document.getElementById("deleteBox").style.display = "flex";
      } else {
        document.getElementById("deleteBox").style.display = "none";
      }

      document.querySelector(".showBtnContainer").innerHTML = "";
      document.querySelector(".showBtnContainer").innerHTML = `
      <button id="showMembers">Members</button>
      <button id="showSubGroupProspectBox">Prospects</button>
      <button id="showSubGroupDirectBox">Group Chat</button>
      `;

      if (userData.data) {
        chatMessageContent.innerHTML = "";
        userData.data.map((obj, i) => {
          if (obj.text != null) {
            if (obj.sender_id == user_id) {
              let dbTime = obj.created_at;

              let newDate = new Date();

              let UTCDate = new Date(
                newDate.getUTCFullYear(),
                newDate.getUTCMonth(),
                newDate.getUTCDate(),
                newDate.getUTCHours(),
                newDate.getUTCMinutes(),
                newDate.getUTCSeconds(),
                newDate.getUTCMilliseconds()
              );

              let currentTime = Math.abs((UTCDate.getTime() / 1000).toFixed(0));

              let futureTime = Math.abs(
                (new Date(dbTime).getTime() / 1000).toFixed(0)
              );

              let TimeDifference = currentTime - futureTime;

              let days = Math.floor(TimeDifference / 86400);

              let hours = Math.floor(TimeDifference / 3600) % 24;

              let minutes = Math.floor(TimeDifference / 60) % 60;

              let seconds = Math.floor(TimeDifference % 60);

              let messageTimeString = "";

              if (days == 0) {
                if (hours == 0) {
                  if (minutes == 0) {
                    if (seconds == 0) {
                      messageTimeString = `less than a second ago`;
                    } else {
                      messageTimeString =
                        seconds == 1
                          ? `${seconds} second ago`
                          : `${seconds} seconds ago`;
                    }
                  } else {
                    messageTimeString =
                      minutes == 1
                        ? `${minutes} minute ago`
                        : `${minutes} minutes ago`;
                  }
                } else {
                  messageTimeString =
                    hours == 1 ? `${hours} hour ago` : `${hours} hours ago`;
                }
              } else {
                messageTimeString =
                  days == 1 ? `${days} day ago` : `${days} days ago`;
              }

              let row = `
                  <div class='senderMsgContainer'>
                  
                  <div class='myMessageDiv'>
                  
                  <div class="imageNameContainer">
                  
                      <span class="senderName">${obj.username}</span>
                      <img src="${obj.image}" class='messageImage'/>
                    
                    </div>
                    <i class="far fa-ellipsis-v menuGroupIcon"></i>

                  <div class='menuBox' style="display: none">
                    <div class='editContainer editGroupContainer'>
                      <i class="far fa-edit"></i>
                      <h1>Edit</h1>
                    </div>
                    <div class="deleteContainer deleteGroupContainer">
                      <i class="far fa-trash"></i>
                      <h1>Delete</h1>
                    </div>
                  </div>
                        ${
                          obj.replied_id != null
                            ? `<div class="prospectReplyDiv">
                            <div class="prospectContentDiv" style="${
                              obj.reply_image == null ? "width: 100%;" : ""
                            }">
                              <h1>${
                                obj.reply_msg != null
                                  ? `<h1>${obj.reply_msg}</h1>`
                                  : '<h1 style="font-style: italic; font-weight: 400; color: #555; width: auto;"><i class="fas fa-ban blockIcon"></i>The message was deleted</h1>'
                              }</h1>
                            </div>
                            ${
                              obj.reply_image != null
                                ? `<img src="${obj.reply_image}" class="replyImage1"/>`
                                : ""
                            }
                          </div>`
                            : ""
                        }

                        <i class="fas fa-reply myReplyIcon"></i>

                        <p class="messageTxt" data-replied_id=${obj.id}>${
                obj.text
              }</p>
                        <div class="timestampDiv">
                          ${messageTimeString}
                        </div>
                      </div>

                  </div>
                `;
              chatMessageContent.innerHTML += row;

              setTimeout(() => {
                document.querySelectorAll(".menuGroupIcon").forEach((ele) => {
                  ele?.addEventListener("click", openGroupThreeDotMenu);
                });
              }, 100);

              setTimeout(() => {
                document.querySelectorAll(".myReplyIcon").forEach((ele) => {
                  ele?.addEventListener("click", replyToMessageFn);
                });
              }, 100);
            } else {
              let dbTime = obj.created_at;

              let newDate = new Date();

              let UTCDate = new Date(
                newDate.getUTCFullYear(),
                newDate.getUTCMonth(),
                newDate.getUTCDate(),
                newDate.getUTCHours(),
                newDate.getUTCMinutes(),
                newDate.getUTCSeconds(),
                newDate.getUTCMilliseconds()
              );

              let currentTime = Math.abs((UTCDate.getTime() / 1000).toFixed(0));

              let futureTime = Math.abs(
                (new Date(dbTime).getTime() / 1000).toFixed(0)
              );

              let TimeDifference = currentTime - futureTime;

              let days = Math.floor(TimeDifference / 86400);

              let hours = Math.floor(TimeDifference / 3600) % 24;

              let minutes = Math.floor(TimeDifference / 60) % 60;

              let seconds = Math.floor(TimeDifference % 60);

              let messageTimeString = "";

              if (days == 0) {
                if (hours == 0) {
                  if (minutes == 0) {
                    if (seconds == 0) {
                      messageTimeString = `less than a second ago`;
                    } else {
                      messageTimeString =
                        seconds == 1
                          ? `${seconds} second ago`
                          : `${seconds} seconds ago`;
                    }
                  } else {
                    messageTimeString =
                      minutes == 1
                        ? `${minutes} minute ago`
                        : `${minutes} minutes ago`;
                  }
                } else {
                  messageTimeString =
                    hours == 1 ? `${hours} hour ago` : `${hours} hours ago`;
                }
              } else {
                messageTimeString =
                  days == 1 ? `${days} day ago` : `${days} days ago`;
              }

              let row = `
                  <div class="groupUserMsgContainer">
                  
                  
                  <div class='userMessageDiv'>
                  <div class="imageNameContainer1">
                  <img src="${obj.image}" class='messageImage'/>
                    <span class="groupUserName">${obj.username}</span>
                  </div>
                  
                    ${
                      obj.replied_id != null
                        ? `<div class="prospectReplyDiv1">
                        <div class="prospectContentDiv" style="${
                          obj.reply_image == null ? "width: 100%;" : ""
                        }">

                          <h1>${
                            obj.reply_msg != null
                              ? `<h1>${obj.reply_msg}</h1>`
                              : '<h1 style="font-style: italic; font-weight: 400; color: #555; width: auto;"><i class="fas fa-ban blockIcon"></i>The message was deleted</h1>'
                          }</h1>
                        </div>
                        ${
                          obj.reply_image != null
                            ? `<img src="${obj.reply_image}" class="replyImage1"/>`
                            : ""
                        }
                      </div>`
                        : ""
                    }
                    
                      <i class="fas fa-reply replyIcon"></i>
                      
                      <p class="messageTxt" data-replied_id=${obj.id}>${
                obj.text
              }</p>
                
                      <div class="timestampUserDiv">
                        ${messageTimeString}
                      </div>
                    </div>

                  </div>
                `;
              chatMessageContent.innerHTML += row;

              setTimeout(() => {
                document.querySelectorAll(".replyIcon").forEach((ele) => {
                  ele.addEventListener("click", replyToMessageFn);
                });
              }, 100);
            }

            chatMessageContent.scroll(0, chatMessageContent.scrollHeight);
          }
        });
      }

      setTimeout(() => {
        document
          .getElementById("showMembers")
          .addEventListener("click", dynamicModalOpenM);
        document
          .getElementById("showSubGroupProspectBox")
          .addEventListener("click", openSubGroupMembersModal);
        document
          .getElementById("showSubGroupDirectBox")
          .addEventListener("click", nullSubGroupChats);
      }, 100);
    }
  };
}

function nullSubGroupChats() {
  localStorage.removeItem("nullGroupChat");
  localStorage.removeItem("group_name");
  localStorage.removeItem("editGroupName");

  prospectModalClose();
  dynamicModalClose();
  closeSubGroupModal();

  document.getElementById("subGroupMembersModal").style.transform = "scale(0)";
  document.getElementById("subGroupMembersModal").style.opacity = 0;

  localStorage.removeItem("prospect_id");

  document.getElementById("nullHeading").style.display = "none";

  document.getElementById("prospectImage").src = "./Assets/img/user.png";
  document.getElementById("prospectName").innerText = "No Prospect Added";
  document.getElementById("companyName").innerText = "";
  document.getElementById("descriptionName").innerText = "";
  document.getElementById("dbNameMessage").innerText = "";
  document.getElementById("dbNameMessagesecond").innerText = "";
  document.getElementById("prospectImage").setAttribute("data-link", "");

  document.querySelector(".groupDiv").classList.remove("groupDivClicked");

  document.getElementById("msgInp").value = "";

  var sub_group_id = localStorage.getItem("sub_group_id");
  var user_id = localStorage.getItem("user_id");
  var group_id = localStorage.getItem("group_id");

  const url = `${globalURl}/get_sub_group_messages/${group_id}/${sub_group_id}/${user_id}`;

  let xhr = new XMLHttpRequest();

  xhr.open("GET", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let userData = JSON?.parse(xhr.responseText);

      document.querySelector(".rightUperRight").style.height = "60px";
      document.querySelector(".rightBox").style.display = "block";
      document.querySelector(".groupContainer").style.display = "none";
      document.querySelector(".rightUperRight").innerHTML = "";
      document.querySelector(".rightUpperBox").style.display = "none";
      document.querySelector(".chatMessageContent").style.display = "block";
      document.querySelector(".chatControlBtn").style.display = "block";
      document.getElementById("sendMsgBtn").style.display = "none";
      document.getElementById("sendGroupMsgBtn").style.display = "none";
      document.getElementById("sendSubGroupMsgBtn").style.display = "block";
      document.querySelector(".rightProspectBox").style.display = "flex";

      document.querySelector(".chatMessageContent").style.height = "255px";

      groupUsersArr = userData.users;

      document.getElementById(
        "groupNamePara"
      ).innerHTML = `<span style='color: #084DD1;'>Group Name: </span>${
        userData.group_name?.length > 10
          ? `${userData.group_name.slice()} ...`
          : userData.group_name
      } `;

      document.getElementById("subGroupNamePara").style.display = "block";

      document.getElementById(
        "subGroupNamePara"
      ).innerHTML = `<span style='color: #084DD1;'>Sub Group Name: </span>${
        userData.sub_group_name?.length > 10
          ? `${userData.sub_group_name.slice()} ...`
          : userData.sub_group_name
      }`;

      document.querySelector(".showBtnContainer").innerHTML = "";
      document.querySelector(".showBtnContainer").innerHTML = `
      <button id="showMembers">Members</button>
      <button id="showSubGroupProspectBox">Prospects</button>
      <button id="showSubGroupDirectBox">Group Chat</button>
      `;

      if (userData.data) {
        let chatMessageContent = document.querySelector(".chatMessageContent");
        chatMessageContent.innerHTML = "";
        userData.data.map((obj, i) => {
          if (obj.text != null) {
            if (obj.sender_id == user_id) {
              let dbTime = obj.created_at;

              let newDate = new Date();

              let UTCDate = new Date(
                newDate.getUTCFullYear(),
                newDate.getUTCMonth(),
                newDate.getUTCDate(),
                newDate.getUTCHours(),
                newDate.getUTCMinutes(),
                newDate.getUTCSeconds(),
                newDate.getUTCMilliseconds()
              );

              let currentTime = Math.abs((UTCDate.getTime() / 1000).toFixed(0));

              let futureTime = Math.abs(
                (new Date(dbTime).getTime() / 1000).toFixed(0)
              );

              let TimeDifference = currentTime - futureTime;

              let days = Math.floor(TimeDifference / 86400);

              let hours = Math.floor(TimeDifference / 3600) % 24;

              let minutes = Math.floor(TimeDifference / 60) % 60;

              let seconds = Math.floor(TimeDifference % 60);

              let messageTimeString = "";

              if (days == 0) {
                if (hours == 0) {
                  if (minutes == 0) {
                    if (seconds == 0) {
                      messageTimeString = `less than a second ago`;
                    } else {
                      messageTimeString =
                        seconds == 1
                          ? `${seconds} second ago`
                          : `${seconds} seconds ago`;
                    }
                  } else {
                    messageTimeString =
                      minutes == 1
                        ? `${minutes} minute ago`
                        : `${minutes} minutes ago`;
                  }
                } else {
                  messageTimeString =
                    hours == 1 ? `${hours} hour ago` : `${hours} hours ago`;
                }
              } else {
                messageTimeString =
                  days == 1 ? `${days} day ago` : `${days} days ago`;
              }

              let row = `
              <div class='senderMsgContainer'>
                  
              <div class='myMessageDiv'>
              
              <div class="imageNameContainer">
              
                  <span class="senderName">${obj.username}</span>
                  <img src="${obj.image}" class='messageImage'/>
                
                </div>
                <i class="far fa-ellipsis-v menuGroupIcon"></i>

              <div class='menuBox' style="display: none">
                <div class='editContainer editGroupContainer'>
                  <i class="far fa-edit"></i>
                  <h1>Edit</h1>
                </div>
                <div class="deleteContainer deleteGroupContainer">
                  <i class="far fa-trash"></i>
                  <h1>Delete</h1>
                </div>
              </div>
                    ${
                      obj.replied_id != null
                        ? `<div class="prospectReplyDiv">
                        <div class="prospectContentDiv" style="${
                          obj.reply_image == null ? "width: 100%;" : ""
                        }">

                          <h1>${
                            obj.reply_msg != null
                              ? `<h1>${obj.reply_msg}</h1>`
                              : '<h1 style="font-style: italic; font-weight: 400; color: #555; width: auto;"><i class="fas fa-ban blockIcon"></i>The message was deleted</h1>'
                          }</h1>
                        </div>
                        ${
                          obj.reply_image != null
                            ? `<img src="${obj.reply_image}" class="replyImage1"/>`
                            : ""
                        }
                      </div>`
                        : ""
                    }

                    <i class="fas fa-reply myReplyIcon"></i>

                    <p class="messageTxt" data-replied_id=${obj.id}>${
                obj.text
              }</p>
                    <div class="timestampDiv">
                      ${messageTimeString}
                    </div>
                  </div>

              </div>
                `;
              chatMessageContent.innerHTML += row;

              setTimeout(() => {
                document.querySelectorAll(".menuGroupIcon").forEach((ele) => {
                  ele?.addEventListener("click", openGroupThreeDotMenu);
                });
              }, 100);

              setTimeout(() => {
                document.querySelectorAll(".myReplyIcon").forEach((ele) => {
                  ele.addEventListener("click", replyToMessageFn);
                });
              }, 100);
            } else {
              let dbTime = obj.created_at;

              let newDate = new Date();

              let UTCDate = new Date(
                newDate.getUTCFullYear(),
                newDate.getUTCMonth(),
                newDate.getUTCDate(),
                newDate.getUTCHours(),
                newDate.getUTCMinutes(),
                newDate.getUTCSeconds(),
                newDate.getUTCMilliseconds()
              );

              let currentTime = Math.abs((UTCDate.getTime() / 1000).toFixed(0));

              let futureTime = Math.abs(
                (new Date(dbTime).getTime() / 1000).toFixed(0)
              );

              let TimeDifference = currentTime - futureTime;

              let days = Math.floor(TimeDifference / 86400);

              let hours = Math.floor(TimeDifference / 3600) % 24;

              let minutes = Math.floor(TimeDifference / 60) % 60;

              let seconds = Math.floor(TimeDifference % 60);

              let messageTimeString = "";

              if (days == 0) {
                if (hours == 0) {
                  if (minutes == 0) {
                    if (seconds == 0) {
                      messageTimeString = `less than a second ago`;
                    } else {
                      messageTimeString =
                        seconds == 1
                          ? `${seconds} second ago`
                          : `${seconds} seconds ago`;
                    }
                  } else {
                    messageTimeString =
                      minutes == 1
                        ? `${minutes} minute ago`
                        : `${minutes} minutes ago`;
                  }
                } else {
                  messageTimeString =
                    hours == 1 ? `${hours} hour ago` : `${hours} hours ago`;
                }
              } else {
                messageTimeString =
                  days == 1 ? `${days} day ago` : `${days} days ago`;
              }

              let row = `
                  <div class="groupUserMsgContainer">
                  
                  
                  <div class='userMessageDiv'>
                  
                  <div class="imageNameContainer1">
                  <img src="${obj.image}" class='messageImage'/>
                    <span class="groupUserName">${obj.username}</span>
                  </div>

                    ${
                      obj.replied_id != null
                        ? `<div class="prospectReplyDiv1">
                        <div class="prospectContentDiv" style="${
                          obj.reply_image == null ? "width: 100%;" : ""
                        }">
                          <h1>${
                            obj.reply_msg != null
                              ? `<h1>${obj.reply_msg}</h1>`
                              : '<h1 style="font-style: italic; font-weight: 400; color: #555; width: auto;"><i class="fas fa-ban blockIcon"></i>The message was deleted</h1>'
                          }</h1>
                        </div>
                        ${
                          obj.reply_image != null
                            ? `<img src="${obj.reply_image}" class="replyImage1"/>`
                            : ""
                        }
                      </div>`
                        : ""
                    }

                      <i class="fas fa-reply replyIcon"></i>

                      <p class="messageTxt" data-replied_id=${obj.id}>${
                obj.text
              }</p>
              
              <div class="timestampUserDiv">
                ${messageTimeString}
              </div>
                    </div>
                    
                  
                  </div>
                `;
              chatMessageContent.innerHTML += row;

              setTimeout(() => {
                document.querySelectorAll(".replyIcon").forEach((ele) => {
                  ele.addEventListener("click", replyToMessageFn);
                });
              }, 100);
            }

            chatMessageContent.scroll(0, chatMessageContent.scrollHeight);
          }
        });
      }

      setTimeout(() => {
        document
          .getElementById("showMembers")
          .addEventListener("click", dynamicModalOpenM);
        document
          .getElementById("showSubGroupProspectBox")
          .addEventListener("click", openSubGroupMembersModal);
        document
          .getElementById("showSubGroupDirectBox")
          .addEventListener("click", nullSubGroupChats);
      }, 100);
    }
  };
}

function subGroupProspectDelete() {}

if (document.getElementById("subGroupMembersModalCloseBtn")) {
  document
    .getElementById("subGroupMembersModalCloseBtn")
    .addEventListener("click", closeSubGroupMembersModal);
}

function closeSubGroupMembersModal() {
  document.getElementById("subGroupMembersModal").style.transform = "scale(0)";
  document.getElementById("subGroupMembersModal").style.opacity = 0;
}

if (document.getElementById("sendSubGroupMsgBtn")) {
  document
    .getElementById("sendSubGroupMsgBtn")
    .addEventListener("click", send_sub_group_message);
}

function send_sub_group_message() {
  document.querySelectorAll(".menuBox").forEach((ele) => {
    ele.style.display = "none";
  });

  let msgInp = document.getElementById("msgInp");

  if (msgInp.value !== "") {
    if (
      document.getElementById("updateSubGroupMsgBtn").style.display == "none"
    ) {
      var user_id = localStorage.getItem("user_id");
      var group_id = localStorage.getItem("group_id");
      var prospect_id = localStorage.getItem("prospect_id");
      var replied_id = localStorage.getItem("replied_id");
      var sub_group_id = localStorage.getItem("sub_group_id");

      const url = `${globalURl}/send_subgroup_message`;

      let xhr = new XMLHttpRequest();

      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(
        JSON.stringify({
          user_id,
          group_id,
          prospect_id,
          sub_group_id,
          text: msgInp.value,
          replied_id,
        })
      );

      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
          let userMessages = JSON.parse(xhr.responseText);

          let chatMessageContent = document.querySelector(
            ".chatMessageContent"
          );

          if (userMessages.data.length > 0) {
            document.getElementById("sendMsgBtn").style.display = "none";
            document.getElementById("sendGroupMsgBtn").style.display = "none";
            document.getElementById("sendSubGroupMsgBtn").style.display =
              "block";
            document.getElementById("updateSubGroupMsgBtn").style.display =
              "none";
            document.getElementById("cancelSubGroupMsgBtn").style.display =
              "none";
            document.getElementById("msgInp").value = "";

            userMessages.data.map((obj, i) => {
              if (obj.sender_id == user_id) {
                let dbTime = obj.created_at;

                let newDate = new Date();

                let UTCDate = new Date(
                  newDate.getUTCFullYear(),
                  newDate.getUTCMonth(),
                  newDate.getUTCDate(),
                  newDate.getUTCHours(),
                  newDate.getUTCMinutes(),
                  newDate.getUTCSeconds(),
                  newDate.getUTCMilliseconds()
                );

                let currentTime = Math.abs(
                  (UTCDate.getTime() / 1000).toFixed(0)
                );

                let futureTime = Math.abs(
                  (new Date(dbTime).getTime() / 1000).toFixed(0)
                );

                let TimeDifference = currentTime - futureTime;

                let days = Math.floor(TimeDifference / 86400);

                let hours = Math.floor(TimeDifference / 3600) % 24;

                let minutes = Math.floor(TimeDifference / 60) % 60;

                let seconds = Math.floor(TimeDifference % 60);

                let messageTimeString = "";

                if (days == 0) {
                  if (hours == 0) {
                    if (minutes == 0) {
                      if (seconds == 0) {
                        messageTimeString = `less than a second ago`;
                      } else {
                        messageTimeString =
                          seconds == 1
                            ? `${seconds} second ago`
                            : `${seconds} seconds ago`;
                      }
                    } else {
                      messageTimeString =
                        minutes == 1
                          ? `${minutes} minute ago`
                          : `${minutes} minutes ago`;
                    }
                  } else {
                    messageTimeString =
                      hours == 1 ? `${hours} hour ago` : `${hours} hours ago`;
                  }
                } else {
                  messageTimeString =
                    days == 1 ? `${days} day ago` : `${days} days ago`;
                }

                let row = `
                <div class='senderMsgContainer'>
                    
                <div class='myMessageDiv'>
                
                <div class="imageNameContainer">
                
                    <span class="senderName">${obj.username}</span>
                    <img src="${obj.image}" class='messageImage'/>
                  
                  </div>
                  <i class="far fa-ellipsis-v menuGroupIcon"></i>
  
                    <div class='menuBox' style="display: none">
                      <div class='editContainer editGroupContainer'>
                        <i class="far fa-edit"></i>
                        <h1>Edit</h1>
                      </div>
                      <div class="deleteContainer deleteGroupContainer">
                        <i class="far fa-trash"></i>
                        <h1>Delete</h1>
                      </div>
                    </div>
                      ${
                        obj.replied_id != null
                          ? `<div class="prospectReplyDiv">
                          <div class="prospectContentDiv">
                            <h1>${
                              obj.reply_msg != null
                                ? `<h1>${obj.reply_msg}</h1>`
                                : '<h1 style="font-style: italic; font-weight: 400; color: #555; width: auto;"><i class="fas fa-ban blockIcon"></i>The message was deleted</h1>'
                            }</h1>
                          </div>
                          ${
                            obj.reply_image != null
                              ? `<img src="${obj.reply_image}" class="replyImage1"/>`
                              : ""
                          }
                        </div>`
                          : ""
                      }
  
                      <i class="fas fa-reply myReplyIcon"></i>
  
                      <p class="messageTxt" data-replied_id=${obj.id}>${
                  obj.text
                }</p>
                      <div class="timestampDiv">
                        ${messageTimeString}
                      </div>
                    </div>
  
                </div>
                `;
                chatMessageContent.innerHTML += row;

                setTimeout(() => {
                  document.querySelectorAll(".menuGroupIcon").forEach((ele) => {
                    ele?.addEventListener("click", openGroupThreeDotMenu);
                  });
                }, 100);

                setTimeout(() => {
                  document.querySelectorAll(".myReplyIcon").forEach((ele) => {
                    ele.addEventListener("click", replyToMessageFn);
                  });
                }, 100);
              } else {
                let dbTime = '';
                let newDate = '';
                let UTCDate = ''
                let currentTime = ''
                let futureTime = ''
                let TimeDifference = ''
                let days = ''
                let hours = ''
                let minutes = ''
                let seconds = ''
                let messageTimeString = "";
                
                newDate = new Date();

                dbTime = obj.created_at;
                
                UTCDate = new Date(
                  newDate.getUTCFullYear(),
                  newDate.getUTCMonth(),
                  newDate.getUTCDate(),
                  newDate.getUTCHours(),
                  newDate.getUTCMinutes(),
                  newDate.getUTCSeconds(),
                  newDate.getUTCMilliseconds()
                );

                currentTime = Math.abs(
                  (UTCDate.getTime() / 1000).toFixed(0)
                );

                futureTime = Math.abs(
                  (new Date(dbTime).getTime() / 1000).toFixed(0)
                );

                TimeDifference = currentTime - futureTime;

                days = Math.floor(TimeDifference / 86400);

                hours = Math.floor(TimeDifference / 3600) % 24;

                minutes = Math.floor(TimeDifference / 60) % 60;

                seconds = Math.floor(TimeDifference % 60);

                if (days == 0) {
                  if (hours == 0) {
                    if (minutes == 0) {
                      if (seconds == 0) {
                        messageTimeString = `less than a second ago`;
                      } else {
                        messageTimeString =
                          seconds == 1
                            ? `${seconds} second ago`
                            : `${seconds} seconds ago`;
                      }
                    } else {
                      messageTimeString =
                        minutes == 1
                          ? `${minutes} minute ago`
                          : `${minutes} minutes ago`;
                    }
                  } else {
                    messageTimeString =
                      hours == 1 ? `${hours} hour ago` : `${hours} hours ago`;
                  }
                } else {
                  messageTimeString =
                    days == 1 ? `${days} day ago` : `${days} days ago`;
                }

                let row = `
                  <div class="groupUserMsgContainer">
                  
                  
                  <div class='userMessageDiv'>
                  
                  <div class="imageNameContainer1">
                  <img src="${obj.image}" class='messageImage'/>
                      <span class="groupUserName">${obj.username}</span>
                    </div>
  
                    ${
                      obj.replied_id != null
                        ? `<div class="prospectReplyDiv1">
                        <div class="prospectContentDiv" style="${
                          obj.reply_image == null ? "width: 100%;" : ""
                        }">
                          <h1>${
                            obj.reply_msg != null
                              ? `<h1>${obj.reply_msg}</h1>`
                              : '<h1 style="font-style: italic; font-weight: 400; color: #555; width: auto;"><i class="fas fa-ban blockIcon"></i>The message was deleted</h1>'
                          }</h1>
                          </div>
                          ${
                            obj.reply_image != null
                              ? `<img src="${obj.reply_image}" class="replyImage1"/>`
                              : ""
                          }
                      </div>`
                        : ""
                    }
  
                      <i class="fas fa-reply replyIcon"></i>
                      
                      <p class="messageTxt" data-replied_id=${obj.id}>${
                  obj.text
                }</p>
                  
                <div class="timestampUserDiv">
                  ${messageTimeString}
                </div>
  
                    </div>
                    
                  </div>
                `;
                chatMessageContent.innerHTML += row;

                setTimeout(() => {
                  document.querySelectorAll(".replyIcon").forEach((ele) => {
                    ele.addEventListener("click", replyToMessageFn);
                  });
                }, 100);
              }

              chatMessageContent.scroll(0, chatMessageContent.scrollHeight);
            });
          }
          msgInp.value = "";

          replied_id = "";
          localStorage.removeItem("replied_id");

          let replyInterval = setInterval(() => {
            if (document.querySelector(".replyIcon")) {
              clearInterval(replyInterval);
              document.querySelectorAll(".replyIcon").forEach((ele) => {
                ele.classList.remove("replyIconClicked");
              });
            }
            if (document.querySelector(".myReplyIcon")) {
              clearInterval(replyInterval);
              document.querySelectorAll(".myReplyIcon").forEach((ele) => {
                ele.classList.remove("replyIconClicked");
              });
            }
          });
        }
      };
    }
    // else {
    //   document.getElementById("sendMsgBtn").style.display = "none";
    //   document.getElementById("updateMsgBtn").style.display = "none";
    //   document.getElementById("cancelMsgBtn").style.display = "none";
    //   document.getElementById("sendGroupMsgBtn").style.display = "block";
    //   document.getElementById("updateGroupMsgBtn").style.display = "none";
    //   document.getElementById("cancelGroupMsgBtn").style.display = "none";
    //   document.getElementById("sendSubGroupMsgBtn").style.display = "none";
    //   document.getElementById("updateSubGroupMsgBtn").style.display = "none";
    //   document.getElementById("cancelSubGroupMsgBtn").style.display = "none";

    //   let message_id = localStorage.getItem("message_id");
    //   let updatedMessage = document.getElementById("msgInp").value;

    //   const url = `${globalURl}/edit_single_group_chat`;

    //   let xhr = new XMLHttpRequest();

    //   xhr.open("POST", url, true);
    //   xhr.setRequestHeader("Content-Type", "application/json");
    //   xhr.send(
    //     JSON.stringify({
    //       id: message_id,
    //       text: updatedMessage,
    //     })
    //   );

    //   xhr.onreadystatechange = function () {
    //     if (xhr.readyState == 4 && xhr.status == 200) {
    //       let response = JSON.parse(xhr.responseText);
    //       localStorage.removeItem("message_id");
    //       if (response.status == "Updated") {
    //         document.getElementById("msgInp").value = "";

    //         let nullGroupChat = localStorage.getItem("nullGroupChat");

    //         let url = "";

    //         if (nullGroupChat) {
    //           url = `${globalURl}/null_chats/${group_id}/${user_id}`;
    //         } else {
    //           url = `${globalURl}/chat_filter/${group_id}/${prospect_id}/${user_id}`;
    //         }

    //         let xhr = new XMLHttpRequest();

    //         xhr.open("GET", url, true);
    //         xhr.setRequestHeader("Content-Type", "application/json");
    //         xhr.send();

    //         xhr.onreadystatechange = function () {
    //           if (xhr.readyState == 4 && xhr.status == 200) {
    //             let userData = JSON?.parse(xhr.responseText);

    //             if (userData.group_name) {
    //               localStorage.setItem("group_name", userData.group_name);
    //             }

    //             if (userData.admin == true) {
    //               document.getElementById("deleteBox").style.display = "flex";
    //             } else {
    //               document.getElementById("deleteBox").style.display = "none";
    //             }

    //             if (userData.data) {
    //               let chatMessageContent = document.querySelector(
    //                 ".chatMessageContent"
    //               );
    //               chatMessageContent.innerHTML = "";

    //               userData.data.map((obj, i) => {
    //                 if (obj.text != null) {
    //                   if (obj.sender_id == user_id) {
    //                     let getHours = new Date().getUTCHours();
    //                     let getMinutes = new Date().getUTCMinutes();

    //                     let dbTime = obj.created_at.slice(11, 19);

    //                     let currentTime = `${
    //                       getHours < 10 ? "0" + getHours : "" + getHours
    //                     }:${
    //                       getMinutes < 10 ? "0" + getMinutes : "" + getMinutes
    //                     }`;

    //                     // let currentTime = new Date().toTimeString().slice(0, 5);

    //                     let messageTimeNumber = Number(
    //                       calculateTime(dbTime, currentTime).slice(0, 2)
    //                     );

    //                     let messageTimeString = "";

    //                     let modeOfNumber = "";

    //                     if (messageTimeNumber < 10) {
    //                       messageTimeNumber = Number(
    //                         calculateTime(dbTime, currentTime).slice(1, 2)
    //                       );

    //                       if (messageTimeNumber < 1) {
    //                         messageTimeString = `less than hour ago`;
    //                       } else {
    //                         messageTimeString = `${messageTimeNumber} hours ago`;
    //                       }
    //                     } else {
    //                       messageTimeNumber = Number(
    //                         calculateTime(dbTime, currentTime).slice(0, 2)
    //                       );

    //                       modeOfNumber = messageTimeNumber;

    //                       modeOfNumber = Math.floor(modeOfNumber / 24);

    //                       if (modeOfNumber < 1) {
    //                         messageTimeString = `${messageTimeNumber} hours ago`;
    //                       } else {
    //                         messageTimeString = `${modeOfNumber} days ago`;
    //                       }
    //                     }

    //                     let row = `
    //                       <div class='senderMsgContainer'>

    //                       <div class='myMessageDiv'>

    //                       <div class="imageNameContainer">

    //                           <span class="senderName">${obj.username}</span>
    //                           <img src="${obj.image}" class='messageImage'/>

    //                         </div>
    //                         <i class="far fa-ellipsis-v menuGroupIcon"></i>

    //                       <div class='menuBox' style="display: none">
    //                         <div class='editContainer editGroupContainer'>
    //                           <i class="far fa-edit"></i>
    //                           <h1>Edit</h1>
    //                         </div>
    //                         <div class="deleteContainer deleteGroupContainer">
    //                           <i class="far fa-trash"></i>
    //                           <h1>Delete</h1>
    //                         </div>
    //                       </div>
    //                             ${
    //                               obj.replied_id != null
    //                                 ? `<div class="prospectReplyDiv">
    //                                 <div class="prospectContentDiv" style="${
    //                                   obj.reply_image == null
    //                                     ? "width: 100%;"
    //                                     : ""
    //                                 }">
    //                                   <h1>${
    //                                     obj.reply_msg != null
    //                                       ? `<h1>${obj.reply_msg}</h1>`
    //                                       : '<h1 style="font-style: italic; font-weight: 400; color: #555; width: auto;"><i class="fas fa-ban blockIcon"></i>The message was deleted</h1>'
    //                                   }</h1>
    //                                 </div>
    //                                 ${
    //                                   obj.reply_image != null
    //                                     ? `<img src="${obj.reply_image}" class="replyImage1"/>`
    //                                     : ""
    //                                 }
    //                               </div>`
    //                                 : ""
    //                             }

    //                             <i class="fas fa-reply myReplyIcon"></i>

    //                             <p class="messageTxt" data-replied_id=${
    //                               obj.id
    //                             }>${obj.text}</p>
    //                             <div class="timestampDiv">
    //                               ${messageTimeString}
    //                             </div>
    //                           </div>

    //                       </div>
    //                     `;
    //                     chatMessageContent.innerHTML += row;

    //                     setTimeout(() => {
    //                       document
    //                         .querySelectorAll(".menuGroupIcon")
    //                         .forEach((ele) => {
    //                           ele?.addEventListener(
    //                             "click",
    //                             openGroupThreeDotMenu
    //                           );
    //                         });
    //                     }, 100);

    //                     setTimeout(() => {
    //                       document
    //                         .querySelectorAll(".myReplyIcon")
    //                         .forEach((ele) => {
    //                           ele?.addEventListener("click", replyToMessageFn);
    //                         });
    //                     }, 100);
    //                   } else {
    //                     let getHours = new Date().getUTCHours();
    //                     let getMinutes = new Date().getUTCMinutes();

    //                     let dbTime = obj.created_at.slice(11, 19);

    //                     let currentTime = `${
    //                       getHours < 10 ? "0" + getHours : "" + getHours
    //                     }:${
    //                       getMinutes < 10 ? "0" + getMinutes : "" + getMinutes
    //                     }`;

    //                     // let currentTime = new Date().toTimeString().slice(0, 5);

    //                     let messageTimeNumber = Number(
    //                       calculateTime(dbTime, currentTime).slice(0, 2)
    //                     );

    //                     let messageTimeString = "";

    //                     let modeOfNumber = "";

    //                     if (messageTimeNumber < 10) {
    //                       messageTimeNumber = Number(
    //                         calculateTime(dbTime, currentTime).slice(1, 2)
    //                       );

    //                       if (messageTimeNumber < 1) {
    //                         messageTimeString = `less than hour ago`;
    //                       } else {
    //                         messageTimeString = `${messageTimeNumber} hours ago`;
    //                       }
    //                     } else {
    //                       messageTimeNumber = Number(
    //                         calculateTime(dbTime, currentTime).slice(0, 2)
    //                       );

    //                       modeOfNumber = messageTimeNumber;

    //                       modeOfNumber = Math.floor(modeOfNumber / 24);

    //                       if (modeOfNumber < 1) {
    //                         messageTimeString = `${messageTimeNumber} hours ago`;
    //                       } else {
    //                         messageTimeString = `${modeOfNumber} days ago`;
    //                       }
    //                     }

    //                     let row = `
    //                       <div class="groupUserMsgContainer">

    //                       <div class='userMessageDiv'>
    //                       <div class="imageNameContainer1">
    //                       <img src="${obj.image}" class='messageImage'/>
    //                         <span class="groupUserName">${obj.username}</span>
    //                       </div>

    //                         ${
    //                           obj.replied_id != null
    //                             ? `<div class="prospectReplyDiv1">
    //                             <div class="prospectContentDiv" style="${
    //                               obj.reply_image == null ? "width: 100%;" : ""
    //                             }">
    //                               <h1>${
    //                                 obj.reply_msg != null
    //                                   ? `<h1>${obj.reply_msg}</h1>`
    //                                   : '<h1 style="font-style: italic; font-weight: 400; color: #555; width: auto;"><i class="fas fa-ban blockIcon"></i>The message was deleted</h1>'
    //                               }</h1>
    //                             </div>
    //                             ${
    //                               obj.reply_image != null
    //                                 ? `<img src="${obj.reply_image}" class="replyImage1"/>`
    //                                 : ""
    //                             }
    //                           </div>`
    //                             : ""
    //                         }

    //                           <i class="fas fa-reply replyIcon"></i>

    //                           <p class="messageTxt" data-replied_id=${obj.id}>${
    //                       obj.text
    //                     }</p>

    //                           <div class="timestampUserDiv">
    //                             ${messageTimeString}
    //                           </div>
    //                         </div>

    //                       </div>
    //                     `;
    //                     chatMessageContent.innerHTML += row;

    //                     setTimeout(() => {
    //                       document
    //                         .querySelectorAll(".replyIcon")
    //                         .forEach((ele) => {
    //                           ele.addEventListener("click", replyToMessageFn);
    //                         });
    //                     }, 100);
    //                   }

    //                   chatMessageContent.scroll(
    //                     0,
    //                     chatMessageContent.scrollHeight
    //                   );
    //                 }
    //               });
    //             }
    //           }
    //         };
    //       }
    //     }
    //   };
    // }
  }
}
