// import { setupWorker, rest } from "msw";

// export const worker = setupWorker(
//   rest.post("/upload", async (req, res, ctx) => {
//     // 这里可以自定义返回内容
//     return res(
//       ctx.status(200),
//       ctx.json({ message: "上传成功", url: "/mock/file/url" })
//     );
//   }),
//   rest.get("/api/data", (req, res, ctx) => {
//     return res(ctx.status(200), ctx.json({ data: [1, 2, 3] }));
//   })
// );
import { http, HttpResponse } from "msw";

export const handlers = [
  // Intercept "GET https://example.com/user" requests...
  http.get("/user", () => {
    // ...and respond to them using this JSON response.
    return HttpResponse.json({
      id: "c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d",
      firstName: "John",
      lastName: "Maverick",
    });
  }),
];
