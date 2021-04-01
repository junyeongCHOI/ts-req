import TsReq from "../dist/index.js";

describe("ts-req", () => {
  const url: string = "https://httpbin.org";
  const req = new TsReq(url);

  test("get", async () => {
    const res = await req.get("/get", null);

    expect(res.status).toBe(200);
  });

  test("get image", async () => {
    const res = await req.get("/image/png");

    expect(res.data.indexOf("PNG") !== -1).toBe(true);
  });

  test("post", async () => {
    const res = await req.post("/post", {
      test: "test",
    });

    expect(res.data.json.test === "test").toBe(true);
  });

  test("post body x", async () => {
    const res = await req.post("/post");

    expect(res.data.json === null).toBe(true);
  });

  test("post form data", async () => {
    const formData = new FormData();

    formData.append("test", "test");

    const res = await req.post("/post", formData);

    expect(res.data.form.test === "test").toEqual(true);
  });

  test("500 error", async () => {
    try {
      await req.get("/status/500", null);
    } catch (error) {
      expect(error.status).toBe(500);
    }
  });

  test("callback", async () => {
    let readyStates: number[] = [];

    await req.get("/get", null, (req: XMLHttpRequest) => {
      readyStates.push(req.readyState);
    });

    expect(readyStates).toEqual([1, 2, 3, 4]);
  });

  test("abort", async () => {
    const res = await req.get("/get", null, (req: XMLHttpRequest) => {
      if (req.readyState === 2) req.abort();
    });

    expect(res.status).toBe(0);
  });

  test("resolveStatus", async () => {
    req.resolveStatus = [0, 200, 500];

    const res = await req.get("/status/500");

    expect(res.status).toBe(500);
  });

  test("custom headers", async () => {
    const res = await req.get("/get", { Hello: "world" });

    expect(res.data.headers.Hello).toBe("world");
  });
});

export {};
