# 一隅 · 极简博客

一个基于 **Vite + Svelte** 的中文极简博客。以纸张、墨色和编辑式三栏布局呈现内容，支持完整的文章阅读与检索体验。

## 功能

- 首页精选、文章列表与分类筛选
- 独立文章地址、阅读进度、文章目录与下一篇导航
- 按年份整理的归档页
- 标题、摘要、分类和标签搜索，支持 `⌘/Ctrl + K` 与 `/` 快捷键
- 浅色／深色模式，偏好保存在当前浏览器
- 桌面三栏与移动端单列布局，支持键盘操作和减少动态效果偏好
- 本地字体与图标，无第三方运行时请求

## 本地运行

需要 Node.js 20.19+ 或 22.12+。

```bash
npm install
npm run dev
```

生产构建与预览：

```bash
npm run build
npm run preview
```

## 内容维护

文章集中存放在 `src/lib/posts.js`。每篇文章包含标题、Slug、日期、分类、阅读时长、摘要、标签和章节正文。新增对象后，首页、搜索与归档会自动更新。

当前版本为纯前端静态站点，文章与站点设置不需要后端。主题偏好使用浏览器 `localStorage`，不会跨设备同步；清除浏览器数据后会恢复系统主题。

## 项目结构

```text
src/
├── App.svelte              # 路由、全局状态与页面框架
├── app.css                 # 设计变量、版式、组件和响应式样式
├── main.js                 # 应用入口与本地字体
└── lib/
    ├── posts.js            # 博客内容与工具函数
    ├── Home.svelte         # 首页与分类筛选
    ├── Post.svelte         # 文章阅读与阅读进度
    ├── Archive.svelte      # 时间归档
    ├── About.svelte        # 关于页面
    ├── SearchDialog.svelte # 搜索弹层
    ├── Sidebar.svelte      # 桌面与移动导航
    └── RightRail.svelte    # 旁注与文章目录
```

## 技术

- Vite 8
- Svelte 5
- Lucide 图标
- Manrope 与 Source Serif 4 可变字体（随项目本地打包）

MIT License
