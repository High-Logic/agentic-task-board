import {expect} from '@playwright/test'
export async function create(page,title,description='',status='todo',priority='medium'){
 await page.getByRole('button',{name:'＋ 新建任务',exact:true}).click();await page.getByLabel('任务标题').fill(title);await page.getByLabel('描述').fill(description);await page.getByLabel('状态',{exact:true}).selectOption(status);await page.getByLabel('优先级',{exact:true}).selectOption(priority);await page.getByRole('button',{name:'创建任务',exact:true}).click();await expect(page.getByRole('dialog')).toHaveCount(0)
}
export const card=(page,title)=>page.getByRole('article',{name:title,exact:true})
