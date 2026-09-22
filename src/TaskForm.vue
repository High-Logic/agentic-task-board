<script setup>
import {reactive,ref} from 'vue'
import {statuses,priorities,validateTask} from './model'
const props=defineProps({task:Object}),emit=defineEmits(['save','cancel'])
const form=reactive({title:props.task?.title??'',description:props.task?.description??'',status:props.task?.status??'todo',priority:props.task?.priority??'medium'})
const error=ref(''),busy=ref(false)
function submit(){if(busy.value)return;error.value=validateTask(form);if(error.value)return;busy.value=true;emit('save',{...form});setTimeout(()=>busy.value=false,350)}
</script>
<template><form @submit.prevent="submit" novalidate><label for="title">任务标题 <span class="required">*</span></label><input id="title" v-model="form.title" autofocus placeholder="要完成什么？" :aria-invalid="!!error" aria-describedby="title-error"><p v-if="error" id="title-error" role="alert" class="error">{{ error }}</p><label for="description">描述 <span class="muted">（选填）</span></label><textarea id="description" v-model="form.description" rows="5" placeholder="添加细节、思路或行动步骤…"></textarea><div class="form-grid"><div><label for="status">状态</label><select id="status" v-model="form.status"><option v-for="(label,key) in statuses" :value="key">{{ label }}</option></select></div><div><label for="priority">优先级</label><select id="priority" v-model="form.priority"><option v-for="(label,key) in priorities" :value="key">{{ label }}</option></select></div></div><footer><button type="button" @click="emit('cancel')">取消</button><button class="primary" :disabled="busy" type="submit">{{ task?'保存修改':'创建任务' }}</button></footer></form></template>
