import req from "../dist/index.js";

describe("ts-req", () => {
  const url: string = "https://jsonplaceholder.typicode.com/posts";

  test("get", async () => {
    const res = await req.get(url);

    expect(res.data.length).toBe(100);
  });

  test("post", async () => {
    const res = await req.post(url, {
      title: "title",
      body: "body",
      userId: 1,
    });

    expect(res.data).toEqual({
      id: 101,
      title: "title",
      body: "body",
      userId: 1,
    });
  });

  test("post, body X", async () => {
    const res = await req.post(url);

    expect(res.data).toEqual({
      id: 101,
    });
  });
});

export {};
