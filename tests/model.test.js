import {test} from 'node:test'
import assert from 'node:assert/strict'
import {createTask,validateTask} from '../src/model.js'
const values={title:'  课程展示  ',description:'',status:'todo',priority:'medium'}
test('标题空白校验与枚举校验',()=>{for(const title of ['','   ','\n\t'])assert.ok(validateTask({...values,title}));assert.ok(validateTask({...values,status:'invalid'}));assert.equal(validateTask(values),'')})
test('创建及更新保持 ID 和创建时间',()=>{const t=createTask(values);assert.equal(t.title,'课程展示');assert.equal(t.description,'');const u=createTask({...values,status:'done',priority:'high'},t);assert.equal(u.id,t.id);assert.equal(u.createdAt,t.createdAt);assert.equal(u.status,'done');assert.notEqual(createTask(values).id,t.id)})
