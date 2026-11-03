export let tasks = [];
export function addtask(title, description, priority){
    let newtask ={
        id: 'task_' + Date.now(),
        title: title,
        description: description,
        priority: priority,
        status: 'todo'
    }
    tasks.push(newtask);
    localStorage.setItem('kanbantasks',JSON.stringify(tasks));
    return newtask;    
};

export function clearalltasksdata() {
    tasks = [];
    localStorage.removeItem('kanbantasks');
}