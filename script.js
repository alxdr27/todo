'use strict'

const todoControl = document.querySelector(".todo-control"),
    headerInput = document.querySelector(".header-input"),
    todoList = document.querySelector(".todo-list"),
    todoCompleted = document.querySelector(".todo-completed"),
    todoRemove = document.querySelectorAll(".todo-remove");

let todoData = [];

//7) Дела из localStorage подгружаться должны автоматически при загрузки странице
let show = JSON.parse(localStorage.getItem("key"))

if (show !== null) {
    todoData = show
}
const render = function(){  
 
    todoList.textContent = "";
    todoCompleted.textContent = "";
 
    todoData.forEach(function(item, index){
        const li = document.createElement("li");
        li.classList.add("todo-item")

        li.innerHTML = '<span class="text-todo">' + item.value + '</span>' + 
            '<div class="todo-buttons">' + 
                '<button class="todo-remove"></button>' + 
                '<button class="todo-complete"></button>' + 
            '</div>';

        if (item.completed) {
            todoCompleted.append(li);
        } else {
            todoList.append(li);
        };

        const btnTodoComplete = li.querySelector(".todo-complete");

        btnTodoComplete.addEventListener("click", function(){
            item.completed = !item.completed;
            localStorage.setItem("key", JSON.stringify(todoData))
            render();
        });
//5) Удаление дел на кнопку КОРЗИНА
        const btnTodoRemove = li.querySelector(".todo-remove");

        btnTodoRemove.addEventListener("click", function(){
            li.remove();
            todoData.splice(index, 1);
            localStorage.setItem("key", JSON.stringify(todoData))
            render();
        })

    });
};

todoControl.addEventListener("submit", function(event){
    event.preventDefault();

    let newTodo = {
        value: headerInput.value,
        completed: false
    };

//3) Пустые дела добавляться не должны
    if (newTodo.value !== "") {
        todoData.push(newTodo);
    }
//4) Поле ввода после добавления дела должно очищаться
    headerInput.value = "";
// 6) Сохранять данные о делах в localStorage (советую в виде массива)

    localStorage.setItem("key", JSON.stringify(todoData))
    
    render();
});

render();
