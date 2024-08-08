var userlist = require("./views/UserList");
var weatherapp = require("./modals/weatherapp");
var todoList = require("./modals/todolist");
var count = 0;
var root = document.body;

// var increment = function () {
//   var url =
//     "https://cors-anywhere.herokuapp.com/https://mithril-rem.fly.dev/api/tutorial/1";
//   m.request({
//     method: "PUT",
//     url: url,
//     body: { count: count + 1 },
//     withCredentials: false, // Change this to false when using a proxy
//   })
//     .then(function (data) {
//       count = parseInt(data.count);
//     })
//     .catch(function (error) {
//       console.error("Error:", error);
//     });
// };

// var hello = {
//   view: function () {
//     return m("main", [
//       m("h1", { class: "title" }, "Click to increase counter"),
//       m("button", { onclick: increment }, count + " clicks"),
//     ]);
//   },
// };
m.mount(root, weatherapp);

/******* rendering apis */

// m.route(document.body, "/list", {
//   "/list": userlist,
// });

/******** todo app */
