import type {
  RequestConfig,
  RequestInterceptor,
  ResponseInterceptor,
} from "../types";
import { compose } from "../utils";

// 通用请求函数，支持进度、超时、拦截器
export async function request(
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

  let requestBody = body;
  // 仅在有 onProgress 且 body 为 Blob/File/ArrayBuffer 时处理上传进度
  if (
    onProgress &&
    body &&
    (body instanceof Blob || body instanceof ArrayBuffer)
  ) {
    const total = body instanceof Blob ? body.size : body.byteLength;
    let loaded = 0;
    const stream = new ReadableStream({
      start(controller) {
        const reader =
          body instanceof Blob
            ? body.stream().getReader()
            : new Response(body).body!.getReader();
        function push() {
          reader.read().then(({ done, value }) => {
            if (done) {
              controller.close();
              return;
            }
            loaded += value.length;
            if (onProgress) {
              onProgress(Math.round((loaded / total) * 100), loaded, total);
            }
            controller.enqueue(value);
            push();
          });
        }
        push();
      },
    });
    requestBody = stream;
    fetchConfig.method = fetchConfig.method || "POST";
    fetchConfig.headers = fetchConfig.headers || {};
  }

  let response: Response;
  try {
    response = await fetch(finalConfig.url, {
      ...fetchConfig,
      body: requestBody,
      signal: controller.signal,
      ...(requestBody instanceof ReadableStream ? { duplex: "half" } : {}),
    });
  } finally {
    clearTimeout(id);
  }

  // 应用响应拦截器
  const finalResponse = await compose(responseInterceptors)(response);
  return finalResponse.json ? finalResponse.json() : finalResponse;
}
