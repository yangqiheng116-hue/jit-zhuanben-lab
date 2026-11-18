# 金陵科技学院专转本三科学习站

面向江苏五年一贯制高职专转本的个人备考站点，覆盖英语、电路分析、自动控制原理。目标院校：金陵科技学院。

本站在浏览器中独立运行：课程讲解、例题、当堂练习与自动批改、错题本、薄弱点、成绩记录和难度调整都不需要服务器或账号。

> 2028 年招生政策和考试大纲尚未公布；内容按江苏五年一贯制高职专转本方向、对照金陵科技学院 2027 年相关参考书目打基础。电路参考书：邱关源《电路》第5版。自控教材可任选孟华《自动控制原理》（机械工业出版社，第3版）或王艳东、程鹏《自动控制原理》（高等教育出版社，第3版）。

## 技术基础

项目从官方 **Vite + React + TypeScript** 模板（MIT）创建，并加入：

- [KaTeX](https://katex.org/)：公式渲染
- [React Router](https://reactrouter.com/)：页面路由（使用 Hash 路由，方便静态托管）

电路图和控制系统框图均为页内 SVG，不依赖外部图片地址。构建完成后，使用站点不需要再发网络请求。

## 本地运行

需要已安装 [Node.js](https://nodejs.org/)（建议 20 或更高版本）。

```bash
cd jit-zhuanben-lab
npm install
npm run dev
```

终端会给出本地地址（默认 `http://localhost:5173`）。用浏览器打开即可学习。

预览生产构建：

```bash
npm run build
npm run preview
```

`npm run build` 会做 TypeScript 检查并输出到 `dist/` 目录。

## 进度保存在哪里

练习进度、成绩、错题本、薄弱点依据的错题，以及难度偏好（基础 / 提高），都写在浏览器的 `localStorage` 里，键名为：

```
jit-zhuanben-lab:v1
```

换电脑、清理站点数据或更换浏览器后，本地进度不会自动带过去。请在「成绩记录」页使用「导出进度备份」，把 JSON 文件保存下来；需要恢复时再「导入进度备份」。导入会用备份内容替换当前进度。

本站没有登录，也不会把进度上传到服务器。

## 免费部署

构建结果是纯静态文件，可放到 GitHub Pages 或 Cloudflare Pages，都不必付费。项目已将 Vite 的 `base` 设为 `./`，相对路径可适应子目录和根目录两种发布方式。路由使用地址栏中的 `#`（例如 `/#/lesson/english-1`），因此托管方不必额外配置单页应用的 404 回退。

### GitHub Pages

1. 把本仓库推送到 GitHub。
2. 在仓库的 Settings → Pages 中，构建方式选 GitHub Actions，或把 `npm run build` 生成的 `dist/` 发到 `gh-pages` 分支。
3. 若使用 GitHub Actions，可新建 `.github/workflows/pages.yml`，在其中执行 `npm ci`、`npm run build`，再把 `dist` 作为 Pages 产物上传。
4. 发布完成后，用 `https://<用户名>.github.io/<仓库名>/` 访问。

示例工作流（可选）：

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
      - uses: actions/deploy-pages@v4
```

使用该工作流前，还需要在仓库 Settings → Pages 里把 Source 设为 GitHub Actions。

### Cloudflare Pages

1. 登录 Cloudflare，创建 Pages 项目并连接该 Git 仓库，或直接上传 `dist/` 文件夹。
2. 若连接 Git，构建设置如下：
   - 构建命令：`npm run build`
   - 输出目录：`dist`
   - 安装命令：`npm install`（或默认）
3. 保存并部署。Cloudflare 会给出 `*.pages.dev` 域名，也可以绑定自己的域名。

## 当前内容范围

- 英语：计划约 18 节，第一版开放第 1 节（Although 与 Despite）。
- 电路分析：计划约 14 节，第一版开放第 1 节（参考方向、欧姆定律与功率的正负）。
- 自动控制原理：计划约 15 节，第一版开放第 1 节（开环与闭环，组成，稳准快）。

其余课时在科目页标注为「即将更新」，不会编造尚未写好的详细目录。

## 许可证

本项目以 MIT 许可证发布，完整文本见 [LICENSE](./LICENSE)。

上游模板与主要依赖同样为 MIT：Vite 官方 React-TypeScript 模板、React、Vite、KaTeX、React Router。第三方版权声明也写在 LICENSE 中。
