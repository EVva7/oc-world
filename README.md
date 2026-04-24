# OC World | OC 世界

[English](#english) | [中文](#中文)

---

## 网站地址

**在线访问**: https://EVva7.github.io/oc-world/

---

## English

### Introduction

OC World (Original Character World) is a web application for creating, sharing, and interacting with original characters. Users can create their own characters (OCs), build worlds, and connect with other creators.

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
│  │                         Frontend (app.js)                           │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌─────────────────────┐  │   │
│  │  │  User    │  │   OC      │  │  World   │  │ Social (comments/   │  │   │
│  │  │ Auth     │  │  CRUD    │  │  CRUD    │  │ fav/follow/chat)    │  │   │
│  │  └────┬─────┘  └────┬─────┘  └────┬─────┘  └──────────┬──────────┘  │   │
│  │       │             │             │                    │              │   │
│  │       └─────────────┴─────────────┴────────────────────┘              │   │
│  │                              │                                       │   │
│  │                              ▼                                       │   │
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

┌─────────────────────────────────────────────────────────────────────────────┐
│                            Database Schema                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  users ─────┬──▶ user_settings                                              │
│             │                                                              │
│  worlds ────┼──▶ ocs (world_id) ──▶ oc_connections                         │
│             │                        │                                      │
│  comments ──┼──▶ ocs (oc_id)                                                │
│             │                                                              │
│  favorites ─┼──▶ ocs (oc_id)                                                │
│             │                                                              │
│  follows ───┼──▶ users (following_id, follower_id)                        │
│             │                                                              │
│  notifications ──▶ users (user_id)                                         │
│             │                                                              │
│  messages ───┼──▶ users (sender_id, receiver_id)                           │
│             │                                                              │
│  dm_messages ──▶ users (sender_id, receiver_id)                           │
│             │                                                              │
│  friends ───┼──▶ users (user_id, friend_id)                              │
│             │                                                              │
│  reports ───▶ ocs/users/comments                                           │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Architecture Details

- **Frontend**: Vanilla HTML + CSS + JavaScript (no framework)
- **Database**: Supabase (PostgreSQL)
- **API**: Supabase REST API (PostgREST)
- **Auth**: Supabase Auth (GitHub OAuth)
- **Realtime**: Supabase Realtime (chat/notifications)

### Two Deployment Modes

1. **Frontend Only** (GitHub Pages)
   - Frontend connects directly to Supabase
   - No backend server needed
   - Free hosting

2. **Node.js Server Mode**
   - Frontend → Express Server → Supabase
   - Custom API support
   - More server-side logic

### Features

- User registration and login
- Create and manage original characters (OCs)
- Create and explore worlds
- Comments and interactions
- Favorites and follows
- Direct messages
- Notifications system
- Real-time chat for authors

### Tech Stack

- **Frontend**: HTML, CSS, JavaScript (Vanilla)
- **Backend**: Express.js (Optional)
- **Database**: Supabase (PostgreSQL)
- **API**: Supabase REST API (PostgREST)
- **Auth**: Supabase Auth (GitHub OAuth)
- **Realtime**: Supabase Realtime

### Local Development

```bash
# Clone the repository
git clone https://github.com/EVva7/oc-world.git

# Open index.html in your browser
# Or use a simple HTTP server:
npx serve .
```

Then open http://localhost:3000

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

### 架构

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              部署方式                                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   方式一：GitHub Pages (纯前端)              方式二：Node.js 服务器          │
│                                                                             │
│   ┌──────────┐      ┌──────────────┐       ┌──────────┐   ┌──────────┐   │
│   │  浏览器   │─────▶│  Supabase    │       │  浏览器  │──▶│ Express  │   │
│   │(GitHub   │◀─────│  (数据库+API) │       │          │◀──│ Server  │   │
│   │ Pages)   │      └──────────────┘       │          │   └────┬───┘   │
│   └──────────┘                             │          │        │       │
│                                              └──────────┘   ┌──▼────┐   │
│                                                             │Supabase│   │
│                                                             └────────┘   │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                            前后端交互架构                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                           前端 (app.js)                               │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌─────────────────────┐  │   │
│  │  │ 用户模块  │  │ 角色模块  │  │ 世界模块  │  │ 社交模块(评论/收藏/  │  │   │
│  │  │ 登录/注册 │  │ CRUD    │  │ CRUD    │  │ 关注/私信/通知/聊天) │  │   │
│  │  └────┬─────┘  └────┬─────┘  └────┬─────┘  └──────────┬──────────┘  │   │
│  │       │             │             │                    │              │   │
│  │       └─────────────┴─────────────┴────────────────────┘              │   │
│  │                              │                                       │   │
│  │                              ▼                                       │   │
│  │                   ┌──────────────────┐                             │   │
│  │                   │  Supabase Client  │                             │   │
│  │                   │ (supabase-js)     │                             │   │
│  │                   └────────┬─────────┘                             │   │
│  └─────────────────────────────┼───────────────────────────────────────┘   │
│                                │                                            │
│                                │ HTTP/REST                                   │
│                                ▼                                            │
│  ┌───────────────────────────────────────────────────────────────────────┐   │
│  │                         Supabase 云服务                               │   │
│  │                                                                       │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌────────────────────────────┐  │   │
│  │  │   PostgREST   │  │   Auth      │  │      Realtime             │  │   │
│  │  │  (REST API)   │  │  (用户认证)  │  │  (实时订阅/聊天)          │  │   │
│  │  └───────┬──────┘  └──────┬─────┘  └─────────────┬──────────────┘  │   │
│  │          │                │                     │                   │   │
│  │          └────────────────┴─────────────────────┘                   │   │
│  │                           │                                         │   │
│  │                           ▼                                         │   │
│  │                  ┌──────────────────┐                               │   │
│  │                  │  PostgreSQL      │                               │   │
│  │                  │  (数据库)         │                               │   │
│  │                  └──────────────────┘                               │   │
│  └───────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                            数据表结构                                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  users ─────┬──▶ user_settings                                              │
│             │                                                              │
│  worlds ────┼──▶ ocs (world_id) ──▶ oc_connections                         │
│             │                        │                                      │
│  comments ──┼──▶ ocs (oc_id)                                                │
│             │                                                              │
│  favorites ─┼──▶ ocs (oc_id)                                                │
│             │                                                              │
│  follows ───┼──▶ users (following_id, follower_id)                          │
│             │                                                              │
│  notifications ──▶ users (user_id)                                          │
│             │                                                              │
│  messages ───┼──▶ users (sender_id, receiver_id)                             │
│             │                                                              │
│  dm_messages ──▶ users (sender_id, receiver_id)                             │
│             │                                                              │
│  friends ───┼──▶ users (user_id, friend_id)                                 │
│             │                                                              │
│  reports ───▶ ocs/users/comments                                            │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 技术架构说明

- **前端**: 原生 HTML + CSS + JavaScript (无框架)
- **数据库**: Supabase (PostgreSQL)
- **API**: Supabase REST API (PostgREST)
- **认证**: Supabase Auth (GitHub OAuth)
- **实时**: Supabase Realtime (聊天/通知)

### 两种部署模式

1. **纯前端模式** (GitHub Pages)
   - 前端直接连接 Supabase
   - 无需后端服务器
   - 免费托管

2. **Node.js 服务器模式**
   - 前端 → Express Server → Supabase
   - 可添加自定义 API
   - 支持更多服务端逻辑

### 功能特点

- 用户注册和登录
- 创建和管理原创角色（OC）
- 创建和探索世界观
- 评论和互动
- 收藏和关注
- 私信功能
- 通知系统
- 作者实时聊天室

### 技术栈

- **前端**: HTML, CSS, JavaScript (原生)
- **后端**: Express.js (可选)
- **数据库**: Supabase (PostgreSQL)
- **API**: Supabase REST API (PostgREST)
- **认证**: Supabase Auth (GitHub OAuth)
- **实时**: Supabase Realtime

### 本地开发

```bash
# 克隆仓库
git clone https://github.com/EVva7/oc-world.git

# 在浏览器中打开 index.html
# 或使用简单的 HTTP 服务器：
npx serve .
```

然后打开 http://localhost:3000

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
