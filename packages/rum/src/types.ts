// types
export type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
export type RequestConfig = {
    url: string;
    method?: Method;
    headers?: Record<string, string>;
    body?: BodyInit;
    timeout?: number;
    onProgress?: (percent: number, loaded: number, total: number) => void;
};

export type RequestInterceptor = (config: RequestConfig) => Promise<RequestConfig> | RequestConfig;
export type ResponseInterceptor = (response: Response) => Promise<Response> | Response;
