import { addtask, tasks } from "./state.js";
import { rendertask } from "./ui.js";
import {  clearalltasksdata } from "./state.js";

const openmodalbtn = document.getElementById('open-modal-btn');
const taskmodal = document.getElementById('task-modal');
const taskform = document.getElementById('task-form');
const darklightbtn = document.getElementById('them-toggle');

const todoList = document.getElementById('todo-list');
const inprogressList = document.getElementById('inprogress-list');
const doneList = document.getElementById('done-list');

const boardView = document.querySelector('.kanban-board');
const calendarView = document.getElementById('calendar-view');
const settingsView = document.getElementById('settings-view');

const menuLinks = document.querySelectorAll('.menu ul li');
const cancelbtn = document.getElementById('cancel-btn');
const closebtn = document.getElementById('close-modal-btn');
const clearAllBtn = document.getElementById('clear-all-btn');

function updateTaskCounters() {
    const todoCount = tasks.filter(t => t.status === 'todo').length;
    const inprogressCount = tasks.filter(t => t.status === 'inprogress').length;
    const doneCount = tasks.filter(t => t.status === 'done').length;

    document.querySelector('.column-header.todo .task-count').textContent = todoCount;
    document.querySelector('.column-header.inprogress .task-count').textContent = inprogressCount;
    document.querySelector('.column-header.done .task-count').textContent = doneCount;
}

menuLinks.forEach((link, index) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        menuLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');

        boardView.style.display = 'none';
        calendarView.style.display = 'none';
        settingsView.style.display = 'none';

        if (index === 0) boardView.style.display = 'grid';     // لوحة التحكم والكانبان
        if (index === 1) calendarView.style.display = 'block';  // التقويم
        if (index === 2) settingsView.style.display = 'block';  // الإعدادات
    });
});

openmodalbtn.addEventListener('click', () => {
    taskmodal.showModal();
});

taskform.addEventListener('submit', (e) => {
    e.preventDefault();
    const tasktitle = document.getElementById('task-title').value;
    const taskdisc = document.getElementById('task-disc').value;
    const taskpriority = document.getElementById('task-priority').value;

    const createdtask = addtask(tasktitle, taskdisc, taskpriority);


    rendertask(createdtask);
    
    updateTaskCounters();
    
    taskform.reset();
    taskmodal.close();
});

tasks.forEach((task) => {
    rendertask(task);
});
updateTaskCounters(); 
darklightbtn.addEventListener('click', () => {
    const currentthem = document.documentElement.getAttribute('data-them');
    const newthem = currentthem === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-them', newthem);
});

function setupDropZone(listElement) {
    listElement.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    listElement.addEventListener('drop', (e) => {
        e.preventDefault();
        
        const taskId = e.dataTransfer.getData('text/plain');
        const taskCard = document.getElementById(taskId);
        
        if (taskCard) {
            listElement.appendChild(taskCard);
            const newStatus = listElement.parentElement.getAttribute('data-status');
            
            const taskData = tasks.find(t => t.id === taskId);
            if (taskData) {
                taskData.status = newStatus;
                localStorage.setItem('kanbanTasks', JSON.stringify(tasks));
                
                updateTaskCounters();
            }
        }
    });
}

cancelbtn.addEventListener('click', () => {
    taskmodal.close();
});

closebtn.addEventListener('click', () => {
    taskmodal.close();
});

const confirmModal = document.getElementById('confirm-modal');
const confirmCancelBtn = document.getElementById('confirm-cancel-btn');
const confirmDeleteBtn = document.getElementById('confirm-delete-btn');

clearAllBtn.addEventListener('click', () => {
    confirmModal.showModal();
});

confirmCancelBtn.addEventListener('click', () => {
    confirmModal.close();
});

confirmDeleteBtn.addEventListener('click', () => {
    clearalltasksdata(); 
    todoList.innerHTML = '';
    inprogressList.innerHTML = '';
    doneList.innerHTML = '';
    updateTaskCounters();
    
    confirmModal.close(); 
});


setupDropZone(todoList);
setupDropZone(inprogressList);
setupDropZone(doneList);
