# 序事 · 本地任务管理

软件工程课程 Agentic 开发实践。使用 Vue 3 Composition API / `<script setup>`、Vite、Tailwind CSS 4 和 localStorage 完成可交互的中文任务工作空间，不使用后端或大模型接口。

**本地应用、测试、21 张真实截图及课程文档已完成；远程仓库交付待完成。** 尚未提供目标 GitHub 仓库或新建仓库的账户、名称和可见性，未创建占位链接，也未公开代码。

## 功能

- 标题必填、描述选填的任务增删改查；详情完整展示；编辑回填和取消；具名删除确认。
- 待办 / 进行中 / 完成三状态；高红 / 中黄 / 低绿优先级，文字与颜色同时表达。
- 列表与三列看板共享数据；原生跨列拖放，空列可投放，同列不改状态；编辑提供键盘和触屏替代。
- 一键切换深色 / 浅色，刷新恢复主题。
- 创建、编辑、删除、拖放后持久化；损坏存储不覆盖；写入失败明确提示并保留原状态。
- 空状态、长文本截断及完整详情、窄屏看板横向滚动、原生模态框焦点管理。

## 环境与命令

实际环境：Windows、Node.js **24.14.1**、npm **11.11.0**。建议使用 Node 24 LTS。锁文件固定依赖：Vue 3.5.43、Vite 7.3.6、Tailwind CSS / @tailwindcss/vite 4.3.3、@vitejs/plugin-vue 6.0.9、Playwright 1.63.0。

在项目根目录运行：

```sh
npm ci
npm run dev
# 浏览器打开 http://127.0.0.1:5173
npm test
npm run test:e2e
npm run build
npm run preview
# 浏览器打开 http://127.0.0.1:4173
```

端到端测试使用已安装的 Google Chrome（`channel: 'chrome'`），可通过 `npx playwright install chrome` 安装；若不便安装 Chrome，可修改 playwright.config.js 使用已安装的浏览器。E2E 会启动开发服务；5173 已有服务时复用。不要在该端口运行其他项目。测试使用独立临时浏览器上下文，不影响个人浏览器数据。

本机沙箱的默认 npm 缓存不可写，安装时使用了 `--cache ../../work/npm-cache`。普通环境可直接 `npm ci`。Vite 脚本使用 `--configLoader native`，避免本机配置打包阶段的上级目录权限问题。

`npm test`：5 项 Node 单元测试；`npm run test:e2e`：8 项 Chrome 浏览器测试。未配置 lint 或 TypeScript 检查，因此没有宣称通过这些检查。真实日志见 [测试结果](docs/test-results/)。

## 使用方法

1. 点击“新建任务”，填写标题，可选描述、状态和优先级，点击“创建任务”。
2. 点击任务标题或“详情”阅读完整内容；“编辑”修改字段；“删除”打开确认弹窗。
3. 切换“看板”，拖动卡片到目标列。手机或键盘用户可通过编辑表单更改状态。
4. 点击右上角主题按钮切换深浅模式。刷新或重新打开同一地址恢复数据和主题。

默认没有演示任务，也不会在清空数据后自动恢复。截图演示任务由 `tests/final.spec.js` 的正常表单操作创建。课堂可按 [演示提纲](docs/demo-script.md) 手动创建相同任务。

## 数据与架构

| 存储键 | 内容 |
| --- | --- |
| `xushi.tasks.v1` | Task 数组的 JSON，合法空值为 `[]` |
| `xushi.theme.v1` | `light` 或 `dark`，首次默认浅色 |

Task：`id, title, description, status, priority, createdAt, updatedAt`。ID 使用 `crypto.randomUUID()`，编辑保持 ID 和创建时间。列表、统计和看板均从一个响应式数组派生。输入仅做普通文本插值，未使用 `v-html`。

先成功写入存储，再替换内存状态。解析失败、异常结构或读取失败时显示提示，保留原始数据并阻止覆盖；请先在浏览器开发工具中备份 `xushi.tasks.v1` 原文，再修复数据并刷新。写入失败时不会关闭编辑表单或显示成功。

```text
src/
  App.vue          页面布局、视图及弹窗协调
  TaskForm.vue     创建/编辑表单
  TaskCard.vue     卡片与操作入口
  TaskBoard.vue    三列看板和原生拖放
  Modal.vue        原生 dialog
  model.js         枚举、校验、任务创建/更新
  useTasks.js      单一任务状态与保存事务
  storage.js       读取、结构校验、写入异常处理
  useTheme.js      主题状态及记忆
  style.css        Tailwind 入口和组件样式
tests/             单元测试、分轮 E2E 和最终截图流程
docs/              课程交付材料、测试日志及截图
public/            网站图标
```

## 课程交付与截图

![浅色任务全貌](docs/screenshots/01-overview-light.png)
![深色看板](docs/screenshots/13-dark-mode.png)

- [提示词设计（包含原始任务书全文）](docs/prompt-design.md)
- [真实五轮开发日志](docs/development-log.md)
- [F01—F09 验收表](docs/acceptance.md)
- [21 张截图完整索引](docs/screenshots/README.md)
- [5—10 分钟课堂演示提纲](docs/demo-script.md)
- [GitHub 交付状态及后续命令](docs/github-delivery.md)

## 已知限制

数据仅在同一浏览器、同一源（协议、主机、端口）内保存。开发端口 5173 与预览端口 4173 的数据互不共享；清除浏览器数据会移除任务。多标签页同时修改没有冲突合并，建议单标签页操作。未实现同列排序、登录、云同步或部署。原生拖放已在桌面 Chrome 验证，触屏请使用编辑表单。没有声称完成所有浏览器兼容性验证。

GitHub 仓库地址：**尚未创建／推送，待用户确认目标及授权。**
`n生产浏览器补充验证：先启动预览服务，再运行 `node tests/production-smoke.mjs`；本次已通过，结果见 `docs/test-results/production-smoke.json`。Windows 运行 npm ci 前请停止项目 Vite 服务，避免原生模块文件被占用。
