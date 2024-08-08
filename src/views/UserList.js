// src/views/UserList.js
var m = require("mithril");
var User = require("../modals/user");

module.exports = {
  oninit: User.loadlist,
  view: function () {
    return m(
      ".user-list",
      User.list.map(function (user) {
        return m(".user-list-item", user.firstName + " " + user.lastName);
      })
    );
  },
};
