# 赊春山 · 创作设定集与连载中枢 (`Shechunshan Novel Studio`)

> **你我皆是绝境枯木，偏要向天道赊一座春山。**

[![Deploy to GitHub Pages](https://github.com/Tera-Dark/shechunshan-novel-studio/actions/workflows/deploy.yml/badge.svg)](https://github.com/Tera-Dark/shechunshan-novel-studio/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-amber.svg)](LICENSE)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-7-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)

**在线浏览（GitHub Pages）：** [https://tera-dark.github.io/shechunshan-novel-studio/](https://tera-dark.github.io/shechunshan-novel-studio/)

---

## 项目简介

本项目为原创长篇修仙耽美企划 **《赊春山》** 的配套创作工作台、世界观设定典藏馆与正文试读网站。

- **题材定位**：千章向修仙耽美企划 · 八大界域副本 · 恶犬骑士攻 × 驯犬执棋受
- **核心人物**：
  - **谢峥（攻）**：字临渊，受《降凡印》压制修为下凡的太渊大司命，蓄谋五年、锁腕上门的冷肃执刑者与偏执护食恶犬。
  - **楚越（受）**：曾居天机榜魁首的天机第一算，替三百六十五名散修背下替劫死契后灵脉尽枯，于南荒雨巷破铺中病骨藏锋、步步反驯。
- **企划规模**：八卷千章结构（约 960–1050 章），内嵌四重“同心锁命链”情感递进、八大界域副本与连续性防崩盘校验机制。

---

## 核心功能模块

| 模块 | 对应页面 | 功能说明 |
| :--- | :--- | :--- |
| **立意与总览** | `overview` | 展示企划核心梗概、双璧羁绊、核心看点（Gravity Tropes）与快速一键复制大纲 |
| **分卷与细纲** | `outlines` | 浏览八卷长篇大纲、时间线节点、核心奇案、感情转折与伏笔清单 |
| **人物志** | `protagonists` | 双主角设定档案（过往/现世双阶段对比）、配角群像图鉴与角色立绘大图查看 |
| **世界观与编年** | `worldbuilding` | 八大界域与宗门秘辛、双线编年史对照及隐藏关联线索 |
| **正文阅读室** | `reader` | 沉浸式排版阅读体验，直接渲染 `story/chapters/` 中的 Markdown 正文章节与边栏批注 |
| **连载中枢** | `engine` | 伏笔追踪总表、角色状态与 POV 边界矩阵、滚动摘要与章节连续性自动质检（Linter） |
| **分类档案库** | `library` | 聚合浏览与导出 `story/` 目录下的全部设定文档、创作铁律与正文草稿 |

---

## 目录结构

```text
shechunshan-novel-studio/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Pages 自动构建与部署工作流
├── public/
│   └── assets/                 # 静态参考资源
├── src/
│   ├── assets/images/          # 角色立绘与场景插画资源
│   ├── components/             # 页面模块组件（阅读室、人物志、连载中枢等）
│   ├── data/                   # 设定集数据结构与 Markdown 章节加载器
│   ├── utils/                  # 连续性校验工具（continuityLinter.ts）
│   ├── App.tsx                 # 应用主入口与导航调度
│   └── main.tsx
├── story/                      # 原始创作 Markdown 资产库
│   ├── 00_去AI味与网文人味写作Skill.md
│   ├── 01_核心梗概与三大融合设定.md
│   ├── 02_世界观与宗门秘辛.md
│   ├── 03_角色档案_主角与群像.md
│   ├── 04_五卷大纲与双线编年.md
│   ├── 05_千章连载商业化与读者钩子规划.md
│   ├── 06_创作铁律与动态复查备忘录.md
│   ├── chapters/               # 正文章节草稿（第 01–20 章）
│   └── tracker/                # 伏笔总表、POV 矩阵与滚动质检记录
├── .env.example                # 环境变量示例
├── index.html
├── metadata.json
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 本地开发与构建

### 环境要求

- Node.js `>= 20`（推荐 `22 LTS`）
- npm `>= 10`

### 安装与运行

```bash
# 1. 克隆仓库
git clone https://github.com/Tera-Dark/shechunshan-novel-studio.git
cd shechunshan-novel-studio

# 2. 安装依赖
npm install

# 3. （可选）如需使用 AI 辅助环境变量，复制示例配置
cp .env.example .env

# 4. 启动本地开发服务器（默认端口 3000）
npm run dev
```

### 类型检查与生产构建

```bash
# TypeScript 类型检查
npm run lint

# 构建生产包（输出至 dist/）
npm run build

# 本地预览生产构建结果
npm run preview
```

---

## GitHub Pages 自动部署

本仓库已配置 [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)：

1. 每次推送代码至 `main` 分支（或手动触发 `workflow_dispatch`）时，GitHub Actions 会自动执行 `npm ci`、`npm run lint` 与 `npm run build`。
2. 构建时自动注入 `VITE_BASE_PATH=/shechunshan-novel-studio/`，确保所有前端路由与插画资源路径在子路径下正常加载。
3. 构建产物通过官方 `actions/upload-pages-artifact` 与 `actions/deploy-pages` 发布至 GitHub Pages。

> **仓库设置要求**：在 GitHub 仓库的 `Settings -> Pages -> Build and deployment` 中，将 **Source** 设置为 `GitHub Actions`。

---

## 版权与许可

- 本项目前端工作台源码基于 [MIT License](LICENSE) 开源。
- `story/` 目录下的小说正文、角色设定、大纲与世界观文本版权归原作者 **Tera-Dark** 所有，未经授权请勿用于商业转载或二次分发。
