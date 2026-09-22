import {test,expect} from '@playwright/test'
import {create,card} from './helpers'
test('第3轮：创建、编辑、删除逐次刷新和空数组',async({page,context})=>{
 await page.goto('/');await create(page,'整理课程验收证据');await page.reload();await expect(card(page,'整理课程验收证据')).toBeVisible();
 await card(page,'整理课程验收证据').getByRole('button',{name:'编辑',exact:true}).click();await page.getByLabel('描述').fill('记录每一轮真实结果');await page.getByLabel('状态',{exact:true}).selectOption('in_progress');await page.getByRole('button',{name:'保存修改'}).click();await page.reload();await expect(card(page,'整理课程验收证据')).toContainText('记录每一轮真实结果');await expect(card(page,'整理课程验收证据')).toContainText('进行中');
 const reopened=await context.newPage();await page.close();await reopened.goto('/');await expect(card(reopened,'整理课程验收证据')).toBeVisible();await card(reopened,'整理课程验收证据').getByRole('button',{name:'删除',exact:true}).click();await reopened.getByRole('button',{name:'确认删除'}).click();await reopened.reload();await expect(reopened.locator('article')).toHaveCount(0);expect(await reopened.evaluate(()=>localStorage.getItem('xushi.tasks.v1'))).toBe('[]');
})
test('第3轮：损坏存储不覆盖，写入失败不虚报成功',async({page})=>{
 await page.goto('/');await page.evaluate(()=>localStorage.setItem('xushi.tasks.v1','{broken'));await page.reload();await expect(page.getByRole('alert')).toContainText('原始存储已保留');await page.getByRole('button',{name:'＋ 新建任务',exact:true}).click();await page.getByLabel('任务标题').fill('不能覆盖损坏原文');await page.getByRole('button',{name:'创建任务',exact:true}).click();await expect(page.getByRole('dialog')).toBeVisible();expect(await page.evaluate(()=>localStorage.getItem('xushi.tasks.v1'))).toBe('{broken');
 await page.evaluate(()=>localStorage.removeItem('xushi.tasks.v1'));await page.reload();await page.evaluate(()=>{Storage.prototype.setItem=()=>{throw new DOMException('quota','QuotaExceededError')}});await page.getByRole('button',{name:'＋ 新建任务',exact:true}).click();await page.getByLabel('任务标题').fill('模拟配额不足');await page.getByRole('button',{name:'创建任务',exact:true}).click();await expect(page.getByRole('dialog')).toContainText('保存失败');await expect(page.locator('article')).toHaveCount(0);await expect(page.getByRole('status')).not.toContainText('已保存');
})
