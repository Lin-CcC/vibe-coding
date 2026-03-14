# 网页PPT（Vue3 + Vite）

目标：在 `others/ppt/vue3/` 下提供一份可开发、可构建的网页 PPT（多路由、统一布局、侧边栏缩略切换）。

## 开发

```bash
npm install
npm run dev
```

## 静态构建

```bash
npm run build
```

构建产物在 `dist/`，可部署到任意静态站点。

## 路由

使用 Hash 路由，避免线上需要额外的 404 配置：

- `#/slide/1`：第 1 页

