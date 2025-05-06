import { http, HttpResponse } from "msw";
import { setupWorker } from "msw/browser";

export const handlers = [
  http.get("/data", () => {
    return HttpResponse.json({
      id: "c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d",
      firstName: "John",
      lastName: "Maverick",
    });
  }),
  http.post("/upload", () => {
    return HttpResponse.json({
      upload: "success",
    });
  }),
];

export const worker = setupWorker(...handlers);
