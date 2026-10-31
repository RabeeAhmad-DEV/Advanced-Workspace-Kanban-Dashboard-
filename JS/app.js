import { addtask } from "./state.js";
const openmodalbtn = document.getElementById('open-modal-btn');
const taskmodal = document.getElementById('task-modal');
const taskform = document.getElementById('task-form');

openmodalbtn.addEventListener('click',() =>{
    taskmodal.showModal();
});
taskform.addEventListener('submit', (e) => {
    e.preventDefault();
    const tasktitle = document.getElementById('task-title').value;
    const taskdisc = document.getElementById('task-disc').value;
    const taskpriority = document.getElementById('task-priority').value;
    
    addtask(tasktitle,taskdisc,taskpriority);
    taskform.reset();
    taskmodal.close();

});