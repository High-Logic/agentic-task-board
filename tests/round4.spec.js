import {test,expect} from '@playwright/test'
import {create,card} from './helpers'
async function drag(page,title,column){
 const source=await card(page,title).boundingBox(),target=await page.locator(`[data-column="${column}"]`).boundingBox();
 await page.mouse.move(source.x+source.width/2,source.y+12);await page.mouse.down();await page.mouse.move(source.x+source.width/2+15,source.y+20,{steps:5});await page.mouse.move(target.x+target.width/2,target.y+90,{steps:20});await page.mouse.move(target.x+target.width/2,target.y+95,{steps:3});await page.mouse.up();await expect(page.locator(`[data-column="${column}"]`).getByRole('article',{name:title,exact:true})).toBeVisible();
}
test('第4轮：真实鼠标拖入空列、双向移动、同列与取消、刷新一致',async({page})=>{
 await page.goto('/');await create(page,'完成课堂演示','拖动时保留完整内容','todo','high');await create(page,'整理提交清单','','todo','low');const before=await page.evaluate(()=>JSON.parse(localStorage.getItem('xushi.tasks.v1')));await page.getByRole('button',{name:'看板视图'}).click();
 for(const column of ['in_progress','done','todo','todo']){await drag(page,'完成课堂演示',column);await expect(page.locator('article')).toHaveCount(2);await page.reload();await page.getByRole('button',{name:'看板视图'}).click();await expect(page.locator(`[data-column="${column}"]`)).toContainText('完成课堂演示')}
 const s=await card(page,'完成课堂演示').boundingBox();await page.mouse.move(s.x+120,s.y+12);await page.mouse.down();await page.mouse.move(s.x+160,s.y+40,{steps:5});await page.keyboard.press('Escape');await page.mouse.up();await expect(page.locator('[data-column="todo"]')).toContainText('完成课堂演示');
 const after=await page.evaluate(()=>JSON.parse(localStorage.getItem('xushi.tasks.v1')));expect(after.length).toBe(before.length);for(let i=0;i<2;i++){expect(after[i].id).toBe(before[i].id);expect(after[i].title).toBe(before[i].title);expect(after[i].description).toBe(before[i].description);expect(after[i].priority).toBe(before[i].priority)}await page.getByRole('button',{name:'列表视图'}).click();await expect(page.locator('article')).toHaveCount(2)
})

