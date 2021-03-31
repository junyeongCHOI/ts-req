import req from "../dist/index.js";

describe("ts-req", () => {
  const url: string = "https://httpbin.org";

  test("get", async () => {
    const res = await req.get(`${url}/get`);

    expect(res.status).toBe(200);
  });

  test("get image", async () => {
    const res = await req.get(`${url}/image/png`);

    expect(res.data.indexOf("PNG") !== -1).toBe(true);
  });

  test("post", async () => {
    const res = await req.post(`${url}/post`, {
      test: "test",
    });

    expect(res.data.json.test === "test").toBe(true);
  });

  test("post body x", async () => {
    const res = await req.post(`${url}/post`);

    expect(res.data.json === null).toBe(true);
  });

  test("post form data", async () => {
    const formData = new FormData();

    formData.append("test", "test");

    const res = await req.post(`${url}/post`, formData);

    expect(res.data.form.test === "test").toEqual(true);
  });
});

export {};
