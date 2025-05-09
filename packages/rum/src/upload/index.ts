import type {
  RequestConfig,
  RequestInterceptor,
  ResponseInterceptor,
} from "../types";
import { compose } from "../utils";

// 上传文件的功能，提供上传进度的查看功能
export async function upload(
  config: RequestConfig,
  requestInterceptors: RequestInterceptor[] = [],
  responseInterceptors: ResponseInterceptor[] = []
): Promise<unknown> {
  // 应用请求拦截器
  const finalConfig = await compose(requestInterceptors)(config);

  // 超时处理
  const { timeout = 10000, onProgress, body, ...fetchConfig } = finalConfig;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  let uploadBody = body;
  // 仅在有 onProgress 且 body 为 Blob/File/ArrayBuffer 时处理
  if (
    onProgress &&
    body &&
    (body instanceof Blob || body instanceof ArrayBuffer)
  ) {
    // 计算总字节数
    const total = body instanceof Blob ? body.size : body.byteLength;
    let loaded = 0;

    // 创建自定义 ReadableStream，用于分块读取 body 数据并统计进度
    const stream = new ReadableStream({
      start(controller) {
        // 获取原始数据的 reader
        // Blob 类型可以直接调用 .stream().getReader()
        // ArrayBuffer 需先转为 Response 再获取 reader
        const reader =
          body instanceof Blob
            ? body.stream().getReader()
            : new Response(body).body!.getReader();

        // 递归读取每一块数据
        function push() {
          reader.read().then(({ done, value }) => {
            if (done) {
              // 数据读取完毕，关闭流
              controller.close();
              return;
            }
            // 累加已上传字节数
            loaded += value.length;
            // 触发进度回调，传递百分比、已上传字节数、总字节数
            if (onProgress) {
              onProgress(Math.round((loaded / total) * 100), loaded, total);
            }
            // 将当前块数据推送到流中
            controller.enqueue(value);
            // 继续读取下一块
            push();
          });
        }
        push();
      },
    });
    uploadBody = stream;
    // fetch 需要设置 body 为 ReadableStream 时，必须指定 method 和 headers
    fetchConfig.method = fetchConfig.method || "POST";
    fetchConfig.headers = fetchConfig.headers || {};
  }

  let response: Response;
  try {
    response = await fetch(finalConfig.url, {
      ...fetchConfig,
      body: uploadBody, // 此处 body 可能为自定义流
      signal: controller.signal,
      // 关键：如果 body 是 ReadableStream，需指定 duplex
      ...(uploadBody instanceof ReadableStream ? { duplex: "half" } : {}),
    });
  } finally {
    clearTimeout(id);
  }

  // 应用响应拦截器
  const finalResponse = await compose(responseInterceptors)(response);

  // 默认返回 JSON
  return finalResponse.json ? finalResponse.json() : finalResponse;
}
