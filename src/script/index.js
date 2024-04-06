import "../css/style.css";

const arrayTodo = [
    {
        text: "je suis une todo",
        done: false,
        edit: false,
    },
    {
        text: "Coder en JavaScript",
        done: true,
        edit: false,
    },
];

const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const value = input.value;
    input.value = "";
    addTodo(value);
});

const input = document.getElementById("todoInput");
const ulTodo = document.getElementById("todoList");

// ? Components ----------------- //

const createLiElement = (edit) => {
    const todoLi = document.createElement("li");

    const todoSpan = document.createElement("span");
    todoSpan.classList.add("todo");

    const todoParagraph = document.createElement("p");

    todoLi.append(todoSpan, todoParagraph);

    return todoLi;
};
const createEditButton = (clickHandler) => {
    const button = document.createElement("button");
    button.innerText = "Editer";
    button.addEventListener("click", (event) => {
        event.stopPropagation();
        clickHandler();
    });
    return button;
};

const createDeleteButton = (clickHandler) => {
    const button = document.createElement("button");
    button.innerText = "Supprimer";
    button.addEventListener("click", (event) => {
        event.stopPropagation();
        clickHandler();
    });
    return button;
};

const createEditElement = (edit) => {
    const todoLi = document.createElement("li");

    const todoEditInputParagraph = document.createElement("input");
    todoEditInputParagraph.classList.add("edit-input");

    todoLi.appendChild(todoEditInputParagraph);

    return todoLi;
};
const cancelEditButton = (clickHandler) => {
    const button = document.createElement("button");
    button.innerText = "Annuler";
    button.addEventListener("click", (event) => {
        event.stopPropagation();
        clickHandler();
    });
    return button;
};

const saveEditButton = (clickHandler) => {
    const button = document.createElement("button");
    button.innerText = "Sauver";
    button.addEventListener("click", (event) => {
        event.stopPropagation();
        clickHandler();
    });
    return button;
};
const todoElements = (done, text, index) => {
    const todoLi = createLiElement();

    const todoSpan = todoLi.querySelector("span");
    if (done) {
        todoSpan.classList.add("done");
    }
    todoSpan.addEventListener("click", () => {
        todoToggleClass(index);
    });

    const todoParagraph = todoLi.querySelector("p");
    todoParagraph.innerText = text;

    const editButton = createEditButton(() => editTodo(index));
    const deleteButton = createDeleteButton(() => deleteTodo(index));

    todoLi.append(editButton, deleteButton);
    ulTodo.appendChild(todoLi);

    return todoLi;
};
const editTodoElements = (edit, text, index) => {
    const todoLi = createEditElement();
    const input = todoLi.querySelector(".edit-input");
    input.value = text;
    const inputValue = input.value;
    const cancelButton = cancelEditButton(() => editTodo(index));
    const saveButton = saveEditButton(() => saveEditTodo(index, input.value));

    todoLi.append(cancelButton, saveButton);

    ulTodo.appendChild(todoLi);

    return todoLi;
};
const displayTodo = () => {
    ulTodo.innerHTML = "";
    const newTodoList = arrayTodo.map((todo, index) => {
        if (todo.edit) {
            editTodoElements(todo.done, todo.text, index);
        } else {
            todoElements(todo.done, todo.text, index);
        }
        console.log(todo);
    });
};

const addTodo = (text) => {
    arrayTodo.push({
        text,
        done: false,
        edit: false,
    });
    displayTodo();
};

const deleteTodo = (index) => {
    arrayTodo.splice(index, 1);
    displayTodo();
};

const todoToggleClass = (index) => {
    arrayTodo[index].done = !arrayTodo[index].done;
    displayTodo();
};

const editTodo = (index) => {
    arrayTodo[index].edit = !arrayTodo[index].edit;
    displayTodo();
};

const saveEditTodo = (index, value) => {
    arrayTodo[index].text = value;
    editTodo(index);
};

displayTodo();