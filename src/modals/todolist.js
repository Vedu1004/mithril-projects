const m = require("mithril");

let todos = [];
let currentTodo = "";

const TodoList = {
  view: function () {
    return m("div.todo-app", [
      m("h1.app-title", "To Do List"),
      m("div.input-group", [
        m("input.todo-input", {
          value: currentTodo,
          oninput: function (e) {
            currentTodo = e.target.value;
          },
          placeholder: "Add a task.",
        }),
        m("button.add-button", { onclick: addTodo }, "I Got This!"),
      ]),
      m("div.timestamp", new Date().toLocaleString()),
      m(
        "ul.todo-list",
        todos.map((todo, index) =>
          m("li.todo-item", { key: index }, [
            m(
              "span.todo-text",
              {
                class: todo.completed ? "completed" : "",
              },
              todo.text
            ),
            m("div.todo-actions", [
              m(
                "button.action-button.complete-button",
                { onclick: () => toggleComplete(index) },
                "✓"
              ),
              m(
                "button.action-button.remove-button",
                { onclick: () => removeTodo(index) },
                "🗑"
              ),
            ]),
          ])
        )
      ),
    ]);
  },
};

function addTodo() {
  if (currentTodo) {
    todos.push({ text: currentTodo, completed: false });
    currentTodo = "";
    m.redraw();
  }
}

function toggleComplete(index) {
  todos[index].completed = !todos[index].completed;
  m.redraw();
}

function removeTodo(index) {
  todos.splice(index, 1);
  m.redraw();
}
module.exports = TodoList;

//m.mount(document.body, TodoList);
