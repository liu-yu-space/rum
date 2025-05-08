// 拦截器组合
export function compose<T>(funcs: Array<(arg: T) => Promise<T> | T>) {
    return async (arg: T): Promise<T> => {
        let result = arg;
        for (const fn of funcs) {
            result = await fn(result);
        }
        return result;
    };
}
