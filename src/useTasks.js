import {ref} from 'vue'
import {createTask} from './model'
import {readTasks,writeTasks} from './storage'
export function useTasks(){
 const initial=readTasks(),tasks=ref(initial.tasks),error=ref(initial.error)
 function commit(next){if(initial.blocked)return false;error.value=writeTasks(next);if(error.value)return false;tasks.value=next;return true}
 function save(values,existing){const task=createTask(values,existing);return commit(existing?tasks.value.map(t=>t.id===existing.id?task:t):[...tasks.value,task])}
 function remove(id){return commit(tasks.value.filter(t=>t.id!==id))}
 return {tasks,error,save,remove}
}
