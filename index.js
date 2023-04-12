// window.addEventListener('load', () => {
//     todos = JSON.parse(localStorage.getItem('todos')) || [];
//     const inputName = document.querySelector('#name');
//     const newTodo = document.querySelector('#new-todo');
//     const username = localStorage.getItem('username') || '';
//     inputName.value = username;
//     inputName.addEventListener('change', e => {
//         localStorage.setItem('username', e.target.value);
//     })

//     newTodo.addEventListener('submit', e => {
// 		e.preventDefault();

// 		const todo = {
// 			content: e.target.elements.content.value,
// 			category: e.target.elements.category.value,
// 			done: false,
// 			createdAt: new Date().getTime()
// 		}

// 		todos.push(todo);

// 		localStorage.setItem('todos', JSON.stringify(todos));


// 		e.target.reset();
      
//         showTodos()
//     })
//     showTodos()
// })


let todosContent = []

const newTodo = document.getElementById('new-todo')
let tasks = document.getElementById('todo-list')

newTodo.addEventListener('submit', (e) => {
    e.preventDefault();
    const newTodoData = new FormData(newTodo);
    const obj = Object.fromEntries(newTodoData);
    
    const json = JSON.stringify(obj);
    localStorage.setItem('form', json);

    renderTasks()

    for (let eachTask of todosContent) {
        tasks.innerHTML += `<div class="todo-item">
        <div class="left-todo-content">
            <label class="item-container">
                <input type="checkbox">
            </label>
            <div class="todo-text">
                <input type="text" value="${eachTask}" readonly class="">
            </div>
        </div>
        <div class="action">
            <button class="edit">Edit</button>
            <button class="delete">Delete</button>
        </div>
    </div>`
    }
    
    newTodo.reset()
})

function renderTasks () {
    const json = localStorage.getItem('form');
    const obj = JSON.parse(json);
    const content = obj.content
    todosContent.push(content)
}





                {/* <div class="todo-item">
                    <div class="left-todo-content">
                        <label class="item-container">
                            <input type="checkbox">
                        </label>
                        <div class="todo-text">
                            <input type="text" value="Make a video" readonly class="">
                        </div>
                    </div>
                    <div class="action">
                        <button class="edit">Edit</button>
                        <button class="delete">Delete</button>
                    </div>
                </div> */}