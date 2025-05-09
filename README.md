# @liuyu/rum

一个基于 TypeScript 的通用请求管理库，支持请求、上传进度、未来可扩展 Socket 和 SSE。

## 功能模块

### rum

- 通用请求管理（支持上传进度、超时、拦截器）
- TypeScript 支持
- 适用于 Node.js 和浏览器
- 未来可扩展 Socket 和 SSE

#### 快速开始

```bash
pnpm install @liuyu/rum
```

#### 使用示例

```ts
import { request } from "@liuyu/rum";

// 普通请求
request({ url: "/api/data", method: "GET" }).then(console.log);

// 上传文件并监听进度
const file = ... // 获取 File 或 Blob
request({
  url: "/api/upload",
  method: "POST",
  body: file,
  onProgress: (percent, loaded, total) => {
    console.log(`上传进度: ${percent}% (${loaded}/${total})`);
  },
}).then(console.log);
```

### rum-demo

- 提供基于浏览器的测试页面，方便本地开发和功能验证
- 入口：`packages/rum-demo/test/index.html`
- 支持请求与上传的交互测试，便于调试和演示

## 开发

- 构建：`pnpm build`
- 测试：`pnpm test`

## 目录结构

- `packages/rum/`：主库源码
- `packages/rum-demo/`：演示与测试页面

## License

MIT
