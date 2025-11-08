# 『 夏之幻想乡 』

## 项目简介

一个基于 React 的静态网站项目。

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm start

# 构建生产版本
npm run build
```

## GitHub Pages 自动部署

本项目已配置 GitHub Actions 自动构建和部署到 GitHub Pages。

### 部署流程

1. **启用 GitHub Pages**
   - 前往仓库的 Settings → Pages
   - Source 选择 "GitHub Actions"
   - 保存设置

2. **自动部署**
   - 当代码推送到 `master` 或 `main` 分支时，会自动触发构建和部署
   - 也可以手动触发：Actions → Deploy to GitHub Pages → Run workflow

3. **访问网站**
   - 部署完成后，网站将自动发布到 GitHub Pages
   - 如果配置了自定义域名（CNAME），将使用自定义域名访问

### 注意事项

- 构建产物会自动生成到 `docs` 目录
- 确保 GitHub Pages 设置中选择了正确的部署源（GitHub Actions）
- 首次部署可能需要几分钟时间

