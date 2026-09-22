<script setup>
import {ref} from 'vue'
import {statuses} from './model'
import TaskCard from './TaskCard.vue'
const props=defineProps({tasks:Array})
const emit=defineEmits(['move','details','edit','delete'])
const dragging=ref(null),over=ref(null)
function start(event,task){dragging.value=task.id;event.dataTransfer.effectAllowed='move';event.dataTransfer.setData('text/plain',task.id)}
function finish(){dragging.value=null;over.value=null}
function drop(event,status){const id=event.dataTransfer.getData('text/plain');const task=props.tasks.find(t=>t.id===id);if(dragging.value===id&&task&&task.status!==status)emit('move',task,status);finish()}
</script>
<template><p class="board-hint">拖动卡片以更改状态，也可通过「编辑」选择状态。</p><div class="board"><div v-for="(label,key) in statuses" :key="key" class="board-column" :class="{ 'drop-active':over===key }" :data-column="key" @dragover.prevent="over=key" @dragleave="over=null" @drop.prevent="drop($event,key)"><div class="column-heading"><h2>{{ label }}</h2><span class="count">{{ tasks.filter(t=>t.status===key).length }}</span></div><div v-for="task in tasks.filter(t=>t.status===key)" :key="task.id" draggable="true" class="drag-card" :class="{dragging:dragging===task.id}" @dragstart="start($event,task)" @dragend="finish"><TaskCard :task="task" @details="emit('details',$event)" @edit="emit('edit',$event)" @delete="emit('delete',$event)" /></div><div v-if="!tasks.some(t=>t.status===key)" class="column-empty">暂无任务<br><span>将卡片拖到这里</span></div></div></div></template>
