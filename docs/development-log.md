# 真实开发记录

环境：Windows PowerShell，Node v24.14.1，npm 11.11.0。起始目录无项目、无 Git 仓库；使用已有 Git 身份，未修改全局配置。项目隔离在 outputs/taskflow。无现有 AGENTS.md 或用户代码需要覆盖。

## 第 1 轮：项目骨架
目标：建立 Vue 3 + Vite + Tailwind CSS 4 项目和基础布局。
修改：入口、Vite 插件、中文工作空间布局、响应式基础样式、npm 脚本及忽略规则。
验证：待执行。

验证：npm install 使用工作区缓存成功（54 个包、0 漏洞）；npx playwright test tests/round1.spec.js 在真实 Chrome 加载页面并检查布局颜色，1 项通过。控制台无 pageerror。问题：默认 npm 缓存不可写，改用 ../../work/npm-cache；Vite 默认配置打包遇到上层目录权限，改用 Node 原生 configLoader native。未解决问题：无。提交见本节对应 Git 历史。
Git 初始化后出现沙箱在线/离线账户所有权差异；使用单次命令 safe.directory 指向本项目，不修改全局 Git 配置。
