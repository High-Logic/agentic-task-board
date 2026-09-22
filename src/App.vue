<script setup>
import {ref} from 'vue'
import {statuses,priorities} from './model'
import {useTasks} from './useTasks'
import Modal from './Modal.vue'
import TaskForm from './TaskForm.vue'
import TaskCard from './TaskCard.vue'
import TaskBoard from './TaskBoard.vue'
const {tasks,error,save,remove}=useTasks()
const view=ref('list')
function move(task,status){if(save({...task,status},task))notice.value='任务状态已更新。'} 
const modal=ref(''),selected=ref(null),notice=ref('')
function open(type,task=null){selected.value=task;modal.value=type;notice.value=''}
function submit(values){if(save(values,selected.value)){modal.value='';notice.value='任务已保存。'}}
function confirmDelete(){if(remove(selected.value.id)){modal.value='';notice.value='任务已删除。'}}
</script>
<template><div class="shell"><aside><div class="brand">▧ 序事</div><p>个人任务空间</p><div class="nav">▦ 我的任务 <b>{{ tasks.length }}</b></div><small>专注当下，有序前行。</small></aside><main><header><span>工作空间 / 我的任务</span><span>本地工作空间</span></header><section><div class="heading-row"><div><p class="eyebrow">TASK WORKSPACE</p><h1>我的任务</h1><p class="muted">把想法变成行动，让每一步都清晰。</p></div><button class="primary" @click="open('create')">＋ 新建任务</button></div><div class="stats"><div v-for="(label,key) in statuses"><span>{{ label }}</span><strong>{{ tasks.filter(t=>t.status===key).length }}</strong></div></div><p v-if="error" role="alert" class="error banner">{{ error }}</p><p role="status" class="notice">{{ notice }}</p><div class="toolbar"><h2>全部任务 <span class="count">{{ tasks.length }}</span></h2><div class="view-switch"><button :class="{active:view==='list'}" @click="view='list'" aria-label="列表视图">☷ 列表</button><button :class="{active:view==='board'}" @click="view='board'" aria-label="看板视图">▥ 看板</button></div></div><div v-if="!tasks.length" class="empty"><h2>从第一件小事开始</h2><p>还没有任务。写下目标，开始行动。</p><button class="primary" @click="open('create')">＋ 创建第一个任务</button></div><TaskBoard v-else-if="view==='board'" :tasks="tasks" @move="move" @details="open('details',$event)" @edit="open('edit',$event)" @delete="open('delete',$event)"/><div v-else class="task-list"><TaskCard v-for="task in tasks" :key="task.id" :task="task" @details="open('details',$event)" @edit="open('edit',$event)" @delete="open('delete',$event)" /></div></section></main><Modal v-if="modal" :title="{create:'新建任务',edit:'编辑任务',details:'任务详情',delete:'删除任务'}[modal]" @close="modal=''"><TaskForm v-if="modal==='create'||modal==='edit'" :task="selected" @save="submit" @cancel="modal=''"/><div v-else-if="modal==='details'" class="details"><div class="card-top"><span class="priority" :class="selected.priority">{{ priorities[selected.priority] }}优先级</span><span>{{ statuses[selected.status] }}</span></div><h2>{{ selected.title }}</h2><p>{{ selected.description||'暂无描述' }}</p><small class="muted">创建于 {{ new Date(selected.createdAt).toLocaleString('zh-CN') }}</small><footer><button @click="modal=''">关闭</button><button class="primary" @click="modal='edit'">编辑任务</button></footer></div><div v-else><p class="delete-message">确定删除「{{ selected.title }}」吗？</p><p class="muted">删除后无法恢复。</p><footer><button @click="modal=''">取消</button><button class="danger" @click="confirmDelete">确认删除</button></footer></div><p v-if="error" role="alert" class="error">{{ error }}</p></Modal></div></template>

