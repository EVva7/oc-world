# OC World | OC 世界

[English](#english) | [中文](#中文)

---

## 网站地址

**在线访问**: https://EVva7.github.io/oc-world/

---

## English

### Introduction

OC World (Original Character World) is a web application for creating, sharing, and interacting with original characters. Users can create their own characters (OCs), build worlds, and connect with other creators.

### Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **Database**: Supabase (PostgreSQL)
- **API**: Supabase REST API (PostgREST)
- **Auth**: Supabase Auth (GitHub OAuth)
- **Realtime**: Supabase Realtime
- **UI Icons**: Lucide React

### Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           Deployment Options                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   Option 1: GitHub Pages (Frontend Only)    Option 2: Node.js Server      │
│                                                                             │
│   ┌──────────┐      ┌──────────────┐       ┌──────────┐   ┌──────────┐   │
│   │ Browser  │─────▶│  Supabase    │       │ Browser  │──▶│ Express  │   │
│   │(GitHub   │◀─────│  (DB + API)  │       │          │◀──│ Server   │   │
│   │ Pages)   │      └──────────────┘       │          │   └────┬───┘   │
│   └──────────┘                             │          │        │       │
│                                              └──────────┘   ┌──▼────┐   │
│                                                             │Supabase│   │
│                                                             └────────┘   │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                      Frontend-Backend Interaction                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                         React Frontend                              │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌─────────────────────┐  │   │
│  │  │  User    │  │   OC      │  │  World   │  │ Social (comments/   │  │   │
│  │  │ Auth     │  │  CRUD    │  │  CRUD    │  │ fav/follow/chat)    │  │   │
│  │  └────┬─────┘  └────┬─────┘  └────┬─────┘  └──────────┬──────────┘  │   │
│  │       │             │             │                    │              │   │
│  │       └─────────────┴─────────────┴────────────────────┘              │   │
│  │                              │                                       │   │
│  │                              ▼                                       │   │
│  │                   ┌──────────────────┐                             │   │
│  │                   │  TanStack Query  │                             │   │
│  │                   │ (Data Fetching)  │                             │   │
│  │                   └────────┬─────────┘                             │   │
│  │                            │                                        │   │
│  │                            ▼                                        │   │
│  │                   ┌──────────────────┐                             │   │
│  │                   │  Supabase Client │                             │   │
│  │                   │ (supabase-js)    │                             │   │
│  │                   └────────┬─────────┘                             │   │
│  └─────────────────────────────┼───────────────────────────────────────┘   │
│                                │                                            │
│                                │ HTTP/REST                                   │
│                                ▼                                            │
│  ┌───────────────────────────────────────────────────────────────────────┐   │
│  │                         Supabase Cloud                               │   │
│  │                                                                       │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌────────────────────────────┐  │   │
│  │  │   PostgREST   │  │    Auth      │  │      Realtime             │  │   │
│  │  │  (REST API)   │  │ (GitHub OAuth)│ │ (Subscriptions/Chat)     │  │   │
│  │  └───────┬──────┘  └──────┬─────┘  └─────────────┬──────────────┘  │   │
│  │          │                │                     │                   │   │
│  │          └────────────────┴─────────────────────┘                   │   │
│  │                           │                                         │   │
│  │                           ▼                                         │   │
│  │                  ┌──────────────────┐                               │   │
│  │                  │  PostgreSQL      │                               │   │
│  │                  └──────────────────┘                               │   │
│  └───────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Features

- User registration and login
- Create and manage original characters (OCs)
- Create and explore worlds
- Comments and interactions
- Favorites and follows
- Direct messages
- Notifications system
- Real-time chat for authors

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Then open http://localhost:5173

### Build

```bash
npm run build
```

The build output will be in the `dist` folder.

### Deployment to GitHub Pages

1. Go to https://github.com/EVva7/oc-world
2. Go to **Settings** → **Pages**
3. Select **main** branch as Source
4. Click Save

Your site will be available at https://EVva7.github.io/oc-world/

---

## 中文

### 介绍

OC World（原创角色世界）是一个用于创建、分享和互动原创角色的 Web 应用程序。用户可以创建自己的角色（OC）、构建世界观，并与其他创作者互动。

### 技术栈

- **前端**: React 18 + TypeScript + Vite
- **状态管理**: Zustand
- **数据获取**: TanStack Query (React Query)
- **数据库**: Supabase (PostgreSQL)
- **API**: Supabase REST API (PostgREST)
- **认证**: Supabase Auth (GitHub OAuth)
- **实时**: Supabase Realtime
- **UI 图标**: Lucide React

### 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

然后打开 http://localhost:5173

### 构建

```bash
npm run build
```

构建输出在 `dist` 文件夹。

### 部署到 GitHub Pages

1. 访问 https://github.com/EVva7/oc-world
2. 进入 **Settings** → **Pages**
3. 选择 **main** 分支作为 Source
4. 点击 Save

你的网站将在 https://EVva7.github.io/oc-world/ 可访问

### 许可证

MIT License

---

<p align="center">Made with ❤️ by OC World Community</p>
