// 先 npm run build，再 npm run preview -- --port 4173。
import {chromium} from '@playwright/test'
import assert from 'node:assert/strict'
import {writeFileSync} from 'node:fs'
const browser=await chromium.launch({channel:'chrome'})
try{
 const page=await browser.newPage(),errors=[]
 page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text())})
 await page.goto('http://127.0.0.1:4173')
 await page.getByRole('button',{name:'＋ 新建任务',exact:true}).click()
 await page.getByLabel('任务标题').fill('生产构建验证')
 await page.getByRole('button',{name:'创建任务',exact:true}).click()
 await page.reload()
 await page.getByRole('article',{name:'生产构建验证',exact:true}).waitFor()
 assert.deepEqual(errors,[])
 const result={url:'http://127.0.0.1:4173',browser:await browser.version(),result:'通过',checks:['生产页面加载','创建任务','刷新持久化','无浏览器错误'],errors}
 writeFileSync('docs/test-results/production-smoke.json',JSON.stringify(result,null,2));console.log(JSON.stringify(result,null,2))
}finally{await browser.close()}
