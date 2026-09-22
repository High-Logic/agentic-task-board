<script setup>
import {statuses,priorities} from './model'
defineProps({task:Object});defineEmits(['details','edit','delete'])
</script>
<template><article class="task-card" :data-task-id="task.id" :aria-label="task.title"><div class="card-top"><span class="priority" :class="task.priority">{{ priorities[task.priority] }}优先级</span><span class="status">{{ statuses[task.status] }}</span></div><button class="task-title" @click="$emit('details',task)">{{ task.title }}</button><p class="description">{{ task.description||'暂无描述' }}</p><div class="card-actions"><button @click="$emit('details',task)">详情</button><button @click="$emit('edit',task)">编辑</button><button class="danger-text" @click="$emit('delete',task)">删除</button></div></article></template>
