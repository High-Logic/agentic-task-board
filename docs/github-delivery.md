# GitHub 交付状态

状态：**远程仓库交付待完成**。本地代码、锁文件、测试、文档、截图及逐轮提交已准备。

检查结果：项目为新建本地 Git 仓库，分支 main；`git remote -v` 无输出。`where.exe gh` 未发现 GitHub CLI。当前没有已连接的 GitHub 工具，无法通过 CLI 核验 GitHub 登录状态。不把已有本地 Git 作者身份视为 GitHub 登录。未新建远程仓库、未推送、未公开任何内容。

需要用户提供最小信息：已存在并授权推送的 GitHub 仓库 URL；或新建仓库的所属账户、名称、public/private 可见性及创建/推送授权。私有仓库需自行向教师提供访问权限。不要发送 token 或密码到聊天。

确认后在项目目录运行以下流程（尖括号为待用户提供的真实值，不是仓库链接）：

```sh
# 如果安装了 GitHub CLI，先由用户完成认证
gh auth login
gh auth status
# 新建私有仓库示例；只有用户明确选择公开时才改用 --public
gh repo create <账户>/<仓库名> --private --source=. --remote=origin --push

# 若用户已有一个空仓库，用这一组替代 gh repo create
git remote add origin <真实仓库URL>
git push -u origin main

# 核验本地和远端的 main SHA 一致
git rev-parse HEAD
git ls-remote origin refs/heads/main
git remote -v
gh repo view --json url,visibility,defaultBranchRef
```

若远端非空，先 fetch / 审查分支再决定整合，不强制推送。此沙箱账户切换导致 Git ownership 检查时，可对单次命令附加 `git -c safe.directory=<本项目绝对路径> ...`；无需修改全局身份或关闭全局保护。

推送后还需访问真实仓库页面，确认 README、docs/screenshots 和五轮历史存在，再把真实 URL 填入 README 和课程提交内容。
补充网页登录检查：尝试在内置浏览器打开 GitHub，35秒后超时；未完成登录状态核验，未执行创建或上传。
