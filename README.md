# FocusFar

<div align="center">
  <img src="public/favicon.svg" alt="FocusFar Logo" width="120" />
</div>

[English](./README.md) | [简体中文](./README.zh-CN.md)

![FocusFar](https://img.shields.io/badge/Vue.js-3.0-green) ![Vite](https://img.shields.io/badge/Vite-Ready-blue) ![Three.js](https://img.shields.io/badge/Three.js-3D-black) ![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-teal)

FocusFar is a 3D stereoscopic vision training and eye relaxation tool built with modern web technologies. By utilizing the principles of stereograms (Magic Eye) and cross-viewing/parallel-viewing techniques, it helps users exercise their eye muscles, adjust focal length, and relieve eye strain after long periods of screen time.

## ✨ Features

- **3D Stereoscopic Vision Training**: Render 3D objects (cubes, spheres) with customizable parallax to practice both parallel viewing and cross-viewing.
- **Highly Customizable**: Adjust object size, depth, rotation speed, and inter-pupillary distance (IPD) to match your personal comfort level.
- **Immersive Experience**: Smooth 3D animations powered by Three.js with full canvas support.
- **Modern UI**: Clean, responsive interface built with Tailwind CSS.
- **Localization (i18n)**: Supports multiple languages for a global user base.
- **Local Storage**: Automatically saves your preferences and configuration settings.

## 🛠️ Technology Stack

- **Framework**: [Vue 3](https://vuejs.org/) (Composition API & `<script setup>`)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **3D Rendering**: [Three.js](https://threejs.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **State Management**: [Pinia](https://pinia.vuejs.org/)
- **Routing**: [Vue Router](https://router.vuejs.org/)
- **Icons**: [Iconify](https://iconify.design/)

## 🚀 Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/FocusFar.git
   cd FocusFar
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:5173`

## 📦 Build & Deployment

To build the project for production:

```bash
npm run build
```
This will generate a `dist` directory containing the minified and optimized production-ready files.

### Deploying to Vercel (Recommended)

FocusFar is a Single Page Application (SPA). Vercel is highly recommended as it automatically handles SPA routing out-of-the-box.

1. Push your code to your GitHub repository.
2. Go to [Vercel](https://vercel.com/) and log in with GitHub.
3. Click "Add New" -> "Project" and import your `FocusFar` repository.
4. Leave all default settings (Vercel will automatically detect Vite).
5. Click **Deploy**.

## 📄 License

[MIT](LICENSE)
