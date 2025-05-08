import type { RequestConfig, RequestInterceptor, ResponseInterceptor } from "../types";
import { compose } from "../utils";

// 请求函数
export async function request(
    config: RequestConfig,
    requestInterceptors: RequestInterceptor[] = [],
    responseInterceptors: ResponseInterceptor[] = []
): Promise<unknown> {
    // 应用请求拦截器
    const finalConfig = await compose(requestInterceptors)(config);

    // 超时处理
    const { timeout = 10000, ...fetchConfig } = finalConfig;
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    let response: Response;
    try {
        response = await fetch(finalConfig.url, {
            ...fetchConfig,
            signal: controller.signal,
        });
    } finally {
        clearTimeout(id);
    }

    // 应用响应拦截器
    const finalResponse = await compose(responseInterceptors)(response);

    // 默认返回 JSON
    return finalResponse.json ? finalResponse.json() : finalResponse;
}
