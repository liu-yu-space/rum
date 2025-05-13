# @liu-yu/rum

一个基于 TypeScript 的通用请求管理库，支持请求、上传进度、Socket 和 SSE 扩展。

## 特性

- 通用请求管理（支持上传进度、超时、拦截器）
- 未来支持 Socket 和 SSE
- TypeScript 支持
- 适用于 Node.js 和浏览器

## 快速开始

```bash
pnpm install @liu-yu/rum
```

## 使用

```ts
import { request } from "@liu-yu/rum";

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

## 开发

- 构建：`pnpm build`
- 测试：`pnpm test`
- 更新版本：`pnpm version <patch|minor|major>`
- 发布：`pnpm publish --access public`

## License

MIT
