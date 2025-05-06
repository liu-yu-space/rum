import { describe, it, expect } from "vitest";
import { RequestManager } from "../src/request/RequestManager";

describe("RequestManager", () => {
  it("应能顺序执行请求队列", async () => {
    const manager = new RequestManager();
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
