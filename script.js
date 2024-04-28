const list = document.getElementById('todo-list');
const itemCountSpan = document.getElementById('item-count');
const uncheckedCountSpan = document.getElementById('unchecked-count');
let todos = [];

function newTodo() {
  const todoText = prompt('Введіть нове завдання:');
  if (todoText) {
    const todo = {
      id: Date.now(), // Генеруємо унікальний ID
      text: todoText,
      checked: false
    };
    todos.push(todo);
    render();
    updateCounter();
  }
}

function renderTodo(todo) {
  return `
    <li class="list-group-item">
      <input type="checkbox" class="form-check-input me-2" id="${todo.id}" ${todo.checked ? 'checked' : ''} onchange="checkTodo(${todo.id})">
      <label for="${todo.id}" ${todo.checked ? 'class="text-success text-decoration-line-through"' : ''}>${todo.text}</label>
      <button class="btn btn-danger btn-sm float-end" onclick="deleteTodo(${todo.id})">delete</button>
    </li>
  `;
}

function render() {
  const todosHTML = todos.map(todo => renderTodo(todo)).join('');
  list.innerHTML = todosHTML;
}

function updateCounter() {
  itemCountSpan.textContent = todos.length;
  const uncheckedCount = todos.filter(todo => !todo.checked).length;
  uncheckedCountSpan.textContent = uncheckedCount;
}

function deleteTodo(todoId) {
  todos = todos.filter(todo => todo.id !== todoId);
  render();
  updateCounter();
}

function checkTodo(todoId) {
  const todo = todos.find(todo => todo.id === todoId);
  todo.checked = !todo.checked;
  render();
  updateCounter();
}
