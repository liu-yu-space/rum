# rum-demo

本目录为 @liu-yu/rum 库的演示与测试项目，基于浏览器环境，便于开发和功能验证。

## 功能说明

- 提供请求与上传的交互测试页面
- 支持请求拦截、上传进度、错误处理等功能演示
- 便于本地开发调试和手动测试

## 快速开始

1. 安装依赖（在项目根目录执行）：
   ```bash
   pnpm install
   ```
2. 启动本地服务（如使用 vite）：
   ```bash
   pnpm --filter rum-demo dev
   ```
3. 打开浏览器访问 `http://localhost:5173/test/index.html`（端口以实际为准）

## 主要文件

- `test/index.html`：主测试页面，包含请求和上传按钮
- `mocks/browser.js`：用于拦截和 mock 网络请求

## 示例

页面提供“发送请求”和“上传”按钮，分别测试 request 方法的普通请求和带进度上传能力。

## 相关链接

- [@liu-yu/rum 主库说明](../rum/README.md)

## License

MIT
