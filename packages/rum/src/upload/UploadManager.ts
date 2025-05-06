export class UploadManager {
  // 上传队列
  private queue: Array<() => Promise<unknown>> = [];
  private isRunning = false;

  add(uploadFn: () => Promise<unknown>) {
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
          console.error("Upload failed:", e);
        }
      }
    }
    this.isRunning = false;
  }
}
