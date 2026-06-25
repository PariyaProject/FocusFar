# 远眺计划 (FocusFar)

<div align="center">
  <img src="public/favicon.svg" alt="FocusFar Logo" width="120" />
</div>

[English](./README.md) | [简体中文](./README.zh-CN.md)

![FocusFar](https://img.shields.io/badge/Vue.js-3.0-green) ![Vite](https://img.shields.io/badge/Vite-Ready-blue) ![Three.js](https://img.shields.io/badge/Three.js-3D-black) ![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-teal)

远眺计划 是一款使用现代 Web 技术构建的 3D 立体视觉训练和眼部放松工具。它利用立体图（Magic Eye）以及交叉眼/平行眼观察技术的原理，帮助用户锻炼眼部肌肉、调节焦距，从而缓解长时间看屏幕带来的视疲劳。

## ✨ 特性

- **3D 立体视觉训练**：渲染带有可调视差的 3D 物体（立方体、球体），支持平行眼和交叉眼训练。
- **高度可定制**：可调节物体大小、深度、旋转速度和瞳距（IPD），以适应你个人的视觉舒适度。
- **沉浸式体验**：由 Three.js 驱动的流畅 3D 动画，支持全屏画布。
- **现代 UI**：使用 Tailwind CSS 构建的简洁、响应式用户界面。
- **国际化 (i18n)**：支持多语言，适应全球用户。
- **本地存储**：自动保存你的偏好设置和配置。

## 🛠️ 技术栈

- **前端框架**: [Vue 3](https://vuejs.org/) (Composition API & `<script setup>`)
- **构建工具**: [Vite](https://vitejs.dev/)
- **3D 渲染**: [Three.js](https://threejs.org/)
- **CSS 框架**: [Tailwind CSS v4](https://tailwindcss.com/)
- **状态管理**: [Pinia](https://pinia.vuejs.org/)
- **路由**: [Vue Router](https://router.vuejs.org/)
- **图标**: [Iconify](https://iconify.design/)

## 🚀 快速开始

### 环境要求

请确保你的电脑上已经安装了 [Node.js](https://nodejs.org/)。

### 安装步骤

1. 克隆仓库:
   ```bash
   git clone https://github.com/your-username/FocusFar.git
   cd FocusFar
   ```

2. 安装依赖:
   ```bash
   npm install
   ```

3. 启动开发服务器:
   ```bash
   npm run dev
   ```

4. 打开浏览器并访问 `http://localhost:5173`

## 📦 构建与部署

构建生产环境版本：

```bash
npm run build
```
这会生成一个 `dist` 目录，包含经过压缩和优化的可部署文件。

### 部署到 Vercel (推荐)

远眺计划 是一个单页应用 (SPA)。强烈推荐使用 Vercel，因为它能开箱即用地自动处理 SPA 路由重定向。

1. 将代码推送到你的 GitHub 仓库。
2. 访问 [Vercel](https://vercel.com/) 并使用 GitHub 登录。
3. 点击 "Add New" -> "Project" 并导入你的 `FocusFar` 仓库。
4. 保持所有默认设置。
5. 点击 **Deploy**。

## 📄 开源协议

[MIT](LICENSE)
