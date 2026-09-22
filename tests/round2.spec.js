import {test,expect} from '@playwright/test'
test('第2轮：CRUD、校验、取消编辑与取消删除',async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto('/');
 await page.getByRole('button',{name:'＋ 新建任务',exact:true}).click();await page.getByRole('button',{name:'创建任务',exact:true}).click();await expect(page.getByText('请输入任务标题，不能只包含空格。')).toBeVisible();
 await page.getByLabel('任务标题').fill('   ');await page.getByRole('button',{name:'创建任务',exact:true}).click();await expect(page.locator('article')).toHaveCount(0);
 await page.getByLabel('任务标题').fill('完成软件工程报告');await page.getByRole('button',{name:'创建任务',exact:true}).dblclick();await expect(page.locator('article')).toHaveCount(1);
 const id=await page.locator('article').getAttribute('data-task-id');await expect(page.locator('article')).toContainText('中优先级');await expect(page.locator('article')).toContainText('待办');
 await page.getByRole('button',{name:'编辑',exact:true}).click();await expect(page.getByLabel('任务标题')).toHaveValue('完成软件工程报告');await page.getByLabel('任务标题').fill('取消的修改');await page.getByRole('button',{name:'取消',exact:true}).click();await expect(page.locator('article')).toContainText('完成软件工程报告');
 await page.getByRole('button',{name:'编辑',exact:true}).click();await page.getByLabel('描述').fill('准备验收表和截图索引');await page.getByLabel('状态',{exact:true}).selectOption('done');await page.getByLabel('优先级',{exact:true}).selectOption('high');await page.getByRole('button',{name:'保存修改'}).click();await expect(page.locator('article')).toHaveAttribute('data-task-id',id);await expect(page.locator('article')).toContainText('完成');await expect(page.locator('article')).toContainText('高优先级');
 await page.getByRole('button',{name:'详情',exact:true}).click();await expect(page.getByRole('dialog')).toContainText('准备验收表和截图索引');await page.getByRole('button',{name:'关闭',exact:true}).click();
 await page.getByRole('button',{name:'删除',exact:true}).click();await page.getByRole('button',{name:'取消',exact:true}).click();await expect(page.locator('article')).toHaveCount(1);await page.getByRole('button',{name:'删除',exact:true}).click();await expect(page.getByRole('dialog')).toContainText('完成软件工程报告');await page.getByRole('button',{name:'确认删除'}).click();await expect(page.locator('article')).toHaveCount(0);expect(errors).toEqual([]);
})
