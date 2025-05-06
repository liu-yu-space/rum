export class RequestManager {
  // 请求队列
  private queue: Array<() => Promise<any>> = [];
  private isRunning = false;

  // 添加请求
  add(requestFn: () => Promise<any>) {
    this.queue.push(requestFn);
    this.run();
  }

  // 执行队列
  private async run() {
    if (this.isRunning) return;
    this.isRunning = true;
    while (this.queue.length) {
      const fn = this.queue.shift();
      if (fn) {
        try {
          await fn();
        } catch (e) {
          // 可扩展错误处理
        }
      }
    }
    this.isRunning = false;
  }
}
