var todoList = {
  todos: [],
  addTodo: function (todoText) {
    this.todos.push({
      todoText: todoText,
      completed: false
    });
  },
  deleteTodo: function (position) {
    this.todos.splice(position, 1);
  },
  toggleCompleted: function (position) {
    this.todos[position].completed = !this.todos[position].completed;
  },
  toggleAll: function () {
    var completedTodos = 0;
    this.todos.forEach((todo) => {
      todo.completed === true ? completedTodos++ : null;
    });
    this.todos.forEach((todo) => {
      if (completedTodos === this.todos.length)
        todo.completed = false;
      else
        todo.completed = true;
    });
  }
}
var addButton = document.getElementById("add");
var inputNewTodo = document.getElementById("new");

addButton.addEventListener('click', () => {
  todoList.addTodo(inputNewTodo.value);
  inputNewTodo.value = "";
});

var everyButton = document.querySelectorAll("button");

for (i = 0; i < everyButton.length; i++) {
  everyButton[i].addEventListener('click', () => { view.displayTodos() });
}

var handlers = {
  displayTodos: () => {
    todoList.displayTodos();
  },
  toggleAll: () => {
    todoList.toggleAll();
  },

  deleteTodo: (position) => {
    todoList.deleteTodo(position);
  },
  toggleTodo: () => {
    var togglePos = document.getElementById("togglePos");
    todoList.toggleCompleted(togglePos.valueAsNumber);
    togglePos.value = "";
  }
}

var view = {
  displayTodos: () => {
    var todosUl = document.querySelector("ul");
    todosUl.innerHTML = "";

    todoList.todos.forEach((todo, position) => {
      var todoLi = document.createElement('li');
      var completed;
      var textContent = document.createElement('p');
      var newCheckbox = view.createCheckbox();
      var newButton = view.createDeleteButton();

      todoLi.id = position;

      if (todo.completed === true) {
        newCheckbox.checked = true;
        textContent.className = 'completed';
      } else {
        newCheckbox.checked = false;
        textContent.className = '';
      }
      textContent.textContent = todo.todoText;

      todoLi.appendChild(newCheckbox);
      todoLi.appendChild(textContent);
      todoLi.appendChild(newButton);
      todosUl.appendChild(todoLi);
    });
  },
  createDeleteButton: () => {
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'deleteButton';
    return deleteButton;
  },
  createCheckbox: () => {
    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'checkbox'
    return checkbox;
  },
  setUpEventListener: function () {
    var todosUl = document.querySelector('ul');

    todosUl.addEventListener('click', (event) => {
      var clickedElement = event.target;
      if (clickedElement.className === 'deleteButton') {
        var liReference = clickedElement.parentElement.id;
        handlers.deleteTodo(parseInt(liReference));
        view.displayTodos();
      }
      if (clickedElement.className === 'checkbox'){
        var liReference = clickedElement.parentElement.id;

        todoList.toggleCompleted(liReference);
        view.displayTodos();
      }
    });
  }
}

view.setUpEventListener();
