// export const worker = setupWorker(...handlers);
import { setupWorker, rest } from "https://unpkg.com/msw@latest/browser.mjs";

export const worker = setupWorker(
  rest.post("/upload", async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ message: "上传成功", url: "/mock/file/url" })
    );
  }),
  rest.get("/api/data", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ data: [1, 2, 3] }));
  })
);
