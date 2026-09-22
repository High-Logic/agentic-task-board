# 真实开发记录

环境：Windows PowerShell，Node v24.14.1，npm 11.11.0。起始目录无项目、无 Git 仓库；使用已有 Git 身份，未修改全局配置。项目隔离在 outputs/taskflow。无现有 AGENTS.md 或用户代码需要覆盖。

## 第 1 轮：项目骨架
目标：建立 Vue 3 + Vite + Tailwind CSS 4 项目和基础布局。
修改：入口、Vite 插件、中文工作空间布局、响应式基础样式、npm 脚本及忽略规则。
验证：待执行。

验证：npm install 使用工作区缓存成功（54 个包、0 漏洞）；npx playwright test tests/round1.spec.js 在真实 Chrome 加载页面并检查布局颜色，1 项通过。控制台无 pageerror。问题：默认 npm 缓存不可写，改用 ../../work/npm-cache；Vite 默认配置打包遇到上层目录权限，改用 Node 原生 configLoader native。未解决问题：无。提交见本节对应 Git 历史。
Git 初始化后出现沙箱在线/离线账户所有权差异；使用单次命令 safe.directory 指向本项目，不修改全局 Git 配置。

第1轮提交：211861c。

## 第 2 轮：核心任务管理
目标：CRUD、标题校验、稳定 ID、统一状态/优先级映射。
修改：model、useTasks、TaskForm、TaskCard、Modal 与应用协调组件。原生 dialog 提供焦点约束和 Escape 关闭。
验证：npm test（2/2）；npx playwright test tests/round2.spec.js（1/1，真实 Chrome）。验证空标题、纯空格、双击只新增一次、默认字段、编辑回填、取消编辑、状态/优先级变更、ID 不变、完整详情、取消删除、确认删除和空状态；无 pageerror。
失败与修复：首次补丁包含同一路径的删除与新增，工具拒绝，改为一次写入；未发生功能测试失败。
未解决问题：持久化、看板、主题按后续轮次实现。

第2轮提交：e5fb77d。

## 第 3 轮：数据持久化
目标：写入成功再提交界面状态；读入校验；损坏数据保护。
修改：storage 模块，统一 xushi.tasks.v1 键；模型结构、重复 ID 和时间校验；空数组正常恢复；读失败阻止覆盖；写失败保留旧状态。
验证：npm test（5/5）；npx playwright test tests/round3.spec.js（2/2）。真实 Chrome 创建后刷新、编辑描述/状态后刷新、关闭页签重新打开、删除全部后刷新、损坏 JSON 原文保留、模拟 QuotaExceededError 均通过。异常注入仅用于独立测试上下文。
失败与修复：本轮无测试失败。
未解决问题：损坏存储需用户备份并修复后刷新；不自动清空以防数据丢失。

第3轮提交：bda8d38。

## 第 4 轮：看板与交互
目标：共享状态的列表/三列看板、跨列拖动与反馈、编辑作为非拖动替代。
修改：TaskBoard 原生 HTML 拖放，校验拖动 ID，落点高亮，同列不保存，窄屏横向滚动。
验证：npx playwright test tests/round4.spec.js（1/1）。实际 page.mouse 按下/移动/松开，完成 todo→in_progress（空列）→done（空列）→todo（反向）、同列和 Escape 取消；逐次刷新验证；总数始终 2，ID、标题、描述、优先级不变，列表一致。没有用 dispatchEvent 或直接改数据代替拖动。
失败与修复：首次鼠标落点采用列底部，位于视口外，未成功投放。改为目标列内可见的 y+90/95 位置后，整条测试通过；应用代码未因此改动。
未解决问题：移动端原生拖动支持取决于浏览器，可通过编辑表单修改任意状态。
