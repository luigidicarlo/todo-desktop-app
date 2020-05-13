var filename = 'todos.json';
var errorDuration = 2000;

document.addEventListener('DOMContentLoaded', () => {
	const state = {
		todos: [],
		showError: false,
		errorMessage: '',
	};

	const clearError = () => {
		setTimeout(() => {
			state.showError = false;
			state.errorMessage = '';
			render();
		}, errorDuration);
    };
    
    const showError = (msg) => {
        state.showError = true;
        state.errorMessage = msg;
        clearError();
        render();
        return;
    };

	const onSubmit = (e) => {
		e.preventDefault();

		const todo = document.querySelector('.todo-input').value;

		if (!todo.length) {
            showError('You must enter a title for the todo');
            return;
		}

		if (state.todos.find((el) => el.title.toUpperCase() === todo.toUpperCase())) {
            showError('The todo you entered already exists');
            return;
		}

		const todoData = {
			title: todo,
			isComplete: false,
		};

        state.todos = [todoData, ...state.todos];

        writeToFile(filename, JSON.stringify(state.todos));
        
        document.querySelector('.todo-input').value = '';

		render();
    };
    
    const onToggleTodo = (e) => {
        const target = e.currentTarget.parentElement.parentElement.children[0].innerHTML.toUpperCase();
        let index = -1;

        const todo = state.todos.find((el, i) => {
            if (el.title.toUpperCase() === target) {
                index = i;
                return el;
            }
        });

        todo.isComplete = !todo.isComplete;
        state.todos[index] = todo;

        writeToFile(filename, JSON.stringify(state.todos));

        render();
    };

    const onDeleteTodo = (e) => {
        const target = e.currentTarget.parentElement.parentElement.children[0].innerHTML.toUpperCase();
        const todos = state.todos.filter(todo => todo.title.toUpperCase() !== target);
        state.todos = todos;

        writeToFile(filename, JSON.stringify(state.todos));

        render();
    };

	const render = () => {
        const { todos, showError, errorMessage } = state;
        const list = document.querySelector('.todos');
        const errorOutput = document.querySelector('.error-output');

        if (showError) {
            errorOutput.innerHTML = `
                <span class="text-danger">
                    ${errorMessage}
                </span>
            `;
            errorOutput.classList.add('show');
        } else {
            errorOutput.innerHTML = '';
            errorOutput.classList.remove('show');
        }

        list.innerHTML = '';
        if (!todos.length) {
            list.innerHTML = `
                <h3 class="text-center">Nothing left to do!</h3>
            `;
        } else {
            todos.forEach(todo => {
                list.innerHTML += `
                    <div class="todo">
                        <h5 class="todo-title ${todo.isComplete ? 'complete' : ''}">${todo.title}</h5>
                        <div class="d-flex align-items-center justify-content-center">
                            <button class="btn btn-primary toggle-todo">
                                <i class="fa ${todo.isComplete ? 'fa-times' : 'fa-check'}"></i>
                            </button>
                            <button class="btn btn-danger delete-todo">
                                <i class="fa fa-trash"></i>
                            </button>
                        </div>
                    </div>
                `;
            });
        }

        const toggleButtons = document.querySelectorAll('button.toggle-todo');
        const deleteButtons = document.querySelectorAll('button.delete-todo');

        for (let button of toggleButtons) {
            button.addEventListener('click', onToggleTodo);
        }

        for (let button of deleteButtons) {
            button.addEventListener('click', onDeleteTodo);
        }
	};

	const init = () => {
        const todos = readFromFile(filename);
        
        if (todos.length) {
            state.todos = todos;
        }

		const form = document.querySelector('form');
        form.addEventListener('submit', onSubmit);
        
        render();
	};

	init();
});
