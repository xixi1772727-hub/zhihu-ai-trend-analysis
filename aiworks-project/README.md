# 知乎 AI 趋势观测站

基于知乎开放数据的 AI 内容趋势分析展示应用。

## 功能

- 精选文章展示
- 知乎热榜实时数据
- 关键词搜索
- 随机推荐转盘
- 4 套主题切换

## 部署

### 1. 配置环境变量

在 Vercel 项目中设置环境变量：

| 变量名 | 值 |
|--------|-----|
| `ZHIHU_ACCESS_SECRET` | 知乎开放平台的 Access Secret |

获取地址：https://developer.zhihu.com/apps

### 2. 导入 GitHub

将项目导入 Vercel，选择 **Other** 框架（Next.js）。

### 3. 部署

自动部署完成后访问 `https://your-project.vercel.app`

## 本地开发

```bash
npm install
npm run dev
```

访问 http://localhost:3000

## 项目结构

```
├── app/
│   ├── api/
│   │   ├── hot-list/route.js   # 知乎热榜 API
│   │   └── search/route.js    # 搜索 API
│   ├── globals.css
│   ├── layout.js
│   └── page.js
├── next.config.js
├── package.json
└── README.md
```
