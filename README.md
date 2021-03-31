# tsReq

`TypeScript`로 작성된 XMLHttpRequest 기반 request 라이브러리입니다.
기본적으로 Promise를 반환합니다.

[git](https://github.com/junyeongCHOI/ts-req), [npm](https://www.npmjs.com/package/ts-req)

## 🛠 Insatll

```
npm install --save ts-req
```

## 📌 Import

```javascript
import req from "ts-req";
```

## 💅 Basic Usage

```javascript
const res1 = await req.get(url, headers, callback);

const res2 = await req.post(url, body, headers, callback);
```

> url은 필수입니다.

> headers 는 [참고](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers)를 key, value로 가지는 object입니다. default 는 "Content-Type": "application/json", "Cache-Control": "no-cache" 입니다.

> callback은 각 request의 state가 변경될 때 실행됩니다.

> resolve를 반환하는 status는 100, 101, 200, 201, 202, 203, 204, 205, 206 가 있습니다.

## 📝 GET (JSON)

```javascript
(async () => {
  const url = "https://httpbin.org";

  const res = await req.get(`${url}/get`);

  console.log(res);
})();
```

## 📝 GET (Other Types)

```javascript
(async () => {
  const url = "https://httpbin.org";

  const res = await req.get(`${url}/image/png`, {
    accept: "image/*",
  });

  console.log(res);
})();
```

## 📝 POST (JSON)

```javascript
(async () => {
  const url = "https://httpbin.org";

  const res = await req.post(`${url}/post`, {
    title: "title",
    body: "body",
    userId: 1,
  });

  console.log(res);
})();
```

## 📝 POST (FormData)

```javascript
(async () => {
  const url = "https://httpbin.org";

  const formData = new FormData();

  formData.append("test", "test");

  const res = await req.post(`${url}/post`, formData);

  console.log(res);
})();
```

## 📝 Callback

```javascript
(async () => {
  const url = "https://httpbin.org";

  const res1 = await req.get(`${url}/get`, null, (req) => {
    // ... do something
    console.log(req);
  });

  const res2 = await req.post(
    `${url}/post`,
    {
      title: "title",
      body: "body",
      userId: 1,
    },
    null,
    (req) => {
      // ... do something
      console.log(req);
    }
  );

  console.log(res1, res2);
})();
```

## 📝 Set Common Headers

```javascript
req.commonHeaders["KEY"] = "VALUE";
```
