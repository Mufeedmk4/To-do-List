window.addEventListener('load', () => {
	todos = JSON.parse(localStorage.getItem('todos')) || [];
	const nameInput = document.querySelector('#name');
	const newTodoForm = document.querySelector('#new-todo');

	const username = localStorage.getItem('username') || '';

	nameInput.value = username;

	nameInput.addEventListener('change', (e) => {
		localStorage.setItem('username', e.target.value);
	})

	newTodoForm.addEventListener('submit', e => {
		e.preventDefault();

		const todo = {
			content: e.target.elements.content.value,
			category: e.target.elements.category.value,
			done: false,
			createdAt: new Date().getTime()
		}

		todos.push(todo);

		localStorage.setItem('todos', JSON.stringify(todos));

		e.target.reset();

		DisplayTodos()
	})

	DisplayTodos()
})

function DisplayTodos () {
	const todoList = document.querySelector('#todo-list');
	todoList.innerHTML = "";

	todos.forEach(todo => {
		const todoItem = document.createElement('div');
		todoItem.classList.add('todo-item');

        const leftTodoContent = document.createElement('div');
        leftTodoContent.classList.add('left-todo-content');

		const label = document.createElement('label');
        label.classList.add('item-container');
		const input = document.createElement('input');
		input.type = 'checkbox';
        input.checked = todo.done;

		const content = document.createElement('div');
		content.classList.add('todo-text');
        content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
		const span = document.createElement('span');

        const actions = document.createElement('div');
        actions.classList.add('action');
		const edit = document.createElement('button');
        edit.classList.add('edit');
        edit.innerHTML = 'Edit';
		const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete');
        deleteButton.innerHTML = 'Delete';

		
		
		if (todo.category == 'personal') {
			leftTodoContent.classList.add('personal');
		} else {
			leftTodoContent.classList.add('work');
		}
		
		todoItem.appendChild(leftTodoContent)
        todoItem.appendChild(actions)
        leftTodoContent.appendChild(label)
        label.appendChild(input)
        leftTodoContent.appendChild(content)
		content.appendChild(span)
        actions.appendChild(edit)
		actions.appendChild(deleteButton)
        todoList.appendChild(todoItem)

		if (todo.done) {
			content.classList.add('done');
		}
		
		input.addEventListener('change', (e) => {
			todo.done = e.target.checked;
			localStorage.setItem('todos', JSON.stringify(todos));

			if (todo.done) {
				content.classList.add('done');
			} else {
				content.classList.remove('done');
			}

			DisplayTodos()

		})

		edit.addEventListener('click', (e) => {
			const input = content.querySelector('input');
			input.removeAttribute('readonly');
			input.focus();
			input.addEventListener('blur', (e) => {
				input.setAttribute('readonly', true);
				todo.content = e.target.value;
				localStorage.setItem('todos', JSON.stringify(todos));
				DisplayTodos()

			})
		})

		deleteButton.addEventListener('click', (e) => {
			todos = todos.filter(t => t != todo);
			localStorage.setItem('todos', JSON.stringify(todos));
			DisplayTodos()
		})

	})
}