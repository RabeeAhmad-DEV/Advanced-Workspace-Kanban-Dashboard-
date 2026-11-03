import { tasks } from "./state.js";

export function rendertask(task){
    const card = document.createElement('div');
    card.classList.add('task-card');
    card.setAttribute('draggable', 'true');
    card.id = task.id;
    card.innerHTML = `
    
    <div>
        <h4>${task.title}</h4>
        <p>${task.description}</p>
        <span class="priority-badge ${task.priority}">${task.priority}</span></div>
    <button class="delete-task-btn" style=" background-color: white; border: none; color: var(--todo-color); font-size: 18px; cursor: pointer; font-weight: bold;">×</button>
    `;
    const deleteBtn = card.querySelector('.delete-task-btn');
deleteBtn.addEventListener('click', (e) => {
    e.stopPropagation(); 
    if (confirm("هل أنت متأكد من حذف هذه المهمة؟")) {
        const taskIndex = tasks.findIndex(t => t.id === task.id);
        if (taskIndex !== -1) {
            tasks.splice(taskIndex, 1); 
            localStorage.setItem('kanbanTasks', JSON.stringify(tasks)); // تحديث التخزين
        }
        const counterSpan = card.parentElement.parentElement.querySelector('.task-count');
        if (counterSpan) counterSpan.textContent = parseInt(counterSpan.textContent) - 1;
        card.remove();
        
    }
});
    card.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', card.id);
    });

    if (task.status == 'todo') {document.getElementById('todo-list').appendChild(card)};
    if (task.status == 'inprogress') {document.getElementById('inprogress-list').appendChild(card)};
    if (task.status == 'done') {document.getElementById('done-list').appendChild(card)};

   


    return card;
};
