import {validateTask} from './model.js'
export const TASK_KEY='xushi.tasks.v1'
export const THEME_KEY='xushi.theme.v1'
export function decodeTasks(raw){
 if(raw===null)return []
 const values=JSON.parse(raw)
 if(!Array.isArray(values))throw new Error('任务数据必须为数组')
 const ids=new Set()
 for(const t of values){
  if(!t||typeof t!=='object'||validateTask(t)||typeof t.id!=='string'||!t.id||ids.has(t.id)||typeof t.createdAt!=='string'||!Number.isFinite(Date.parse(t.createdAt))||typeof t.updatedAt!=='string'||!Number.isFinite(Date.parse(t.updatedAt)))throw new Error('任务数据结构异常')
  ids.add(t.id)
 }
 return values
}
export function readTasks(getStorage=()=>localStorage){try{return {tasks:decodeTasks(getStorage().getItem(TASK_KEY)),error:'',blocked:false}}catch{return {tasks:[],error:'无法读取本地任务，原始存储已保留。请备份并修复浏览器中的任务数据后刷新；暂时无法保存任务。',blocked:true}}}
export function writeTasks(tasks,getStorage=()=>localStorage){try{getStorage().setItem(TASK_KEY,JSON.stringify(tasks));return ''}catch{return '保存失败：浏览器存储不可用或空间不足。本次修改未保存，请检查存储后重试。'}}
