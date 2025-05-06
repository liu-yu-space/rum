import { describe, it, expect } from "vitest";
import { UploadManager } from "../src/upload/UploadManager";

describe("UploadManager", () => {
  it("应能顺序执行上传队列", async () => {
    const manager = new UploadManager();
    const result: number[] = [];
    manager.add(async () => {
      result.push(1);
    });
    manager.add(async () => {
      result.push(2);
    });
    await new Promise((r) => setTimeout(r, 10));
    expect(result).toEqual([1, 2]);
  });
});
