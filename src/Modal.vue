<script setup>
import {ref,onMounted} from 'vue'
defineProps({title:String});const emit=defineEmits(['close']);const dialog=ref(null)
onMounted(()=>dialog.value.showModal())
</script>
<template><dialog ref="dialog" aria-labelledby="modal-title" @cancel.prevent="emit('close')"><div class="modal-head"><h2 id="modal-title">{{ title }}</h2><button aria-label="关闭弹窗" @click="emit('close')">×</button></div><slot /></dialog></template>
