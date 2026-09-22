export const statuses = { todo:'待办', in_progress:'进行中', done:'完成' }
export const priorities = { high:'高', medium:'中', low:'低' }
export function validateTask(value) {
 if(typeof value.title!=='string'||!value.title.trim()) return '请输入任务标题，不能只包含空格。'
 if(!Object.hasOwn(statuses,value.status)||!Object.hasOwn(priorities,value.priority)) return '请选择有效的状态和优先级。'
 if(typeof value.description!=='string') return '描述必须是文本。'
 return ''
}
export function createTask(values,existing) {
 const error=validateTask(values);if(error) throw new Error(error)
 const now=new Date().toISOString()
 return {id:existing?.id??crypto.randomUUID(),title:values.title.trim(),description:values.description,status:values.status,priority:values.priority,createdAt:existing?.createdAt??now,updatedAt:now}
}
