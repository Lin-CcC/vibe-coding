# 网易云移动端原型（纯 HTML）

## 预览（本地 URL）

在 `project` 根目录打开 PowerShell：

```powershell
Set-Location g:\vibe_coding\project\front\html
python -m http.server 5173
```

浏览器打开：

- `http://localhost:5173/index.html`（发现）
- `http://localhost:5173/search.html`（搜索）
- `http://localhost:5173/playlist.html?id=1`（歌单详情示例）
- `http://localhost:5173/player.html`（播放页）
- `http://localhost:5173/profile.html`（用户资料：改头像/用户名）
- `http://localhost:5173/recent.html`（最近播放）
- `http://localhost:5173/podcast.html`（我的播客）
- `http://localhost:5173/liked.html`（我喜欢的音乐）
- `http://localhost:5173/settings.html`（设置）
- `http://localhost:5173/login.html`（登录）
- `http://localhost:5173/avatar-crop.html`（裁剪头像：由资料页入口进入）

## 说明

- 这是静态原型：不依赖后端，数据为内置 mock。
- 底部 Tab：发现/搜索（仅在主页面显示）。
- 迷你播放器：除播放页外，其它页面底部固定显示（有当前歌曲时）。
- 发现页：左上角头像打开功能菜单（最近播放/播客/喜欢/设置等）。
- 底部 Tab：发现 / 喜欢 / 我的（搜索从发现页搜索框进入）。
