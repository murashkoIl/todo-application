"use strict"

const addButton = document.querySelector('.input-field-content__add');
const descriptionTask = document.querySelector('.input-field-content__input');
const todosWrapper = document.querySelector('.todos-wrapper');

let tasks;
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));

let todoItemElements = [];

function Task(description) {
    this.description = description;
    this.completed = false;
}

const dataManipulations = () => {
    updateLocalStorage();
    fillHtmlList();
}

const createTemplate = (task, index) => {
    return `
    <div class="todos-wrapper__item item-todos ${task.completed ? 'checked' : ''}">
        <div class="item-todos__checkbox-wrapper">
            <div onclick="completeTask(${index})"  id="ID" class="item-todos__checkbox" ${task.completed ? 'checked' : ''}></div>
        </div>                            
        <div class="item-todos__text">${task.description}</div>
        <button onclick="deleteTask(${index})" class="item-todos__delete"></button>
    </div>
    `;
}

const tasksFilter = () => {
    const activeTasks = tasks.length && tasks.filter(item => item.completed == false);
    const completedTasks = tasks.length && tasks.filter(item => item.completed == true);
    tasks = [...activeTasks, ...completedTasks];
}

const fillHtmlList = () => {
    todosWrapper.innerHTML = "";
    if (tasks.length > 0) {
        tasksFilter();
        tasks.forEach((item, index) => {
            todosWrapper.innerHTML += createTemplate(item, index);
        })
        todoItemElements = document.querySelectorAll('.item-todos');
    }
}
fillHtmlList();

const updateLocalStorage = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

const completeTask = index => {
    tasks[index].completed = !tasks[index].completed;
    if (tasks[index].completed) {
        todoItemElements[index].classList.add('checked');
    } else {
        todoItemElements[index].classList.remove('checked');
        todoItemElements[index].classList.add('reverse-animation');
    }
    setTimeout(() => {
        dataManipulations();
    }, 300);
    todoItemElements[index].classList.remove('reverse-animtion');
}


const deleteTask = index => {
    todoItemElements[index].classList.add('animation');
    tasks.splice(index, 1);
    setTimeout(() => {
        dataManipulations();
    }, 500);
}

addButton.addEventListener('click', () => {
    if (descriptionTask.value.length > 0) {
        tasks.unshift(new Task(descriptionTask.value));
        dataManipulations();
        descriptionTask.value = '';
    }
});

document.addEventListener('keydown', (e) => {
    if (e.keyCode == 13) {
        if (descriptionTask.value.length > 0) {
            tasks.unshift(new Task(descriptionTask.value));
            dataManipulations();
            descriptionTask.value = '';
        }
    }
});

