var m = require("mithril");

var User = {
  list: [],
  loadlist: async function () {
    return m
      .request({
        method: "GET",
        url: "https://mithril-rem.fly.dev/api/users",
        withCredentials: true,
      })
      .then(function (result) {
        User.list = result.data;
      });
  },
};

module.exports = User;
