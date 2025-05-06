export class UploadManager {
  // 上传队列
  private queue: Array<() => Promise<any>> = [];
  private isRunning = false;

  add(uploadFn: () => Promise<any>) {
    this.queue.push(uploadFn);
    this.run();
  }

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
