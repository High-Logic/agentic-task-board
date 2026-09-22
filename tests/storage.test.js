import {test} from 'node:test'
import assert from 'node:assert/strict'
import {decodeTasks,readTasks,writeTasks} from '../src/storage.js'
import {createTask} from '../src/model.js'
test('存储恢复与合法空数组',()=>{assert.deepEqual(decodeTasks(null),[]);assert.deepEqual(decodeTasks('[]'),[]);const t=createTask({title:'报告',description:'',status:'todo',priority:'medium'});assert.deepEqual(decodeTasks(JSON.stringify([t])),[t]);assert.throws(()=>decodeTasks(JSON.stringify([t,t])))})
test('损坏数据、结构异常、读取异常保留原存储',()=>{for(const raw of ['{bad','{}','[null]','[{"title":""}]']){let wrote=false;const result=readTasks(()=>({getItem:()=>raw,setItem:()=>wrote=true}));assert.equal(result.blocked,true);assert.equal(wrote,false)}assert.equal(readTasks(()=>{throw Error('denied')}).blocked,true)})
test('写入失败返回明确错误',()=>{assert.match(writeTasks([],()=>({setItem(){throw Error('quota')}})),/保存失败/);assert.equal(writeTasks([],()=>({setItem(){}})),'')})
