import {ref} from 'vue'
import {createTask} from './model'
export function useTasks(){
 const tasks=ref([]),error=ref('')
 function save(values,existing){const task=createTask(values,existing);tasks.value=existing?tasks.value.map(t=>t.id===existing.id?task:t):[...tasks.value,task];return true}
 function remove(id){tasks.value=tasks.value.filter(t=>t.id!==id);return true}
 return {tasks,error,save,remove}
}
