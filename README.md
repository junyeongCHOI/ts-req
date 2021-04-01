# ts-req

![](https://img.shields.io/github/languages/top/junyeongchoi/ts-req) ![](https://img.shields.io/bundlephobia/min/ts-req) ![](https://img.shields.io/badge/0-dependencies-blueviolet)

`TypeScript`로 작성된 XMLHttpRequest 기반 request 라이브러리입니다.
기본적으로 Promise를 반환합니다.

[git](https://github.com/junyeongCHOI/ts-req), [npm](https://www.npmjs.com/package/ts-req)

## 🛠 Insatll

```
npm install --save ts-req
```

## 📌 Import

```javascript
import TsReq from "ts-req";
```

## 💅 Basic Usage

```javascript
const req = new TsReq(url);

const res1 = await req.get(pathname, headers, callback);

const res2 = await req.post(pathname, body, headers, callback);
```

> url은 필수입니다.

> headers 는 [참고](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers)를 key, value로 가지는 object입니다. default 는 "Content-Type": "application/json", "Cache-Control": "no-cache", Accept: "\*" 입니다.

> callback은 각 request의 state가 변경될 때 실행됩니다.

> resolve를 반환하는 status는 0, 100, 101, 200, 201, 202, 203, 204, 205, 206 가 있습니다. status 0은 요청을 취소했을 때 반환합니다.

# Example

## 📝 GET (JSON)

```javascript
(async () => {
  const url = "https://httpbin.org";
  const req = new TsReq(url);

  const res = await req.get("/get");

  console.log(res);
})();
```

## 📝 GET (Other Types)

```javascript
(async () => {
  const url = "https://httpbin.org";
  const req = new TsReq(url);

  const res = await req.get("/image/png");

  console.log(res);
})();
```

## 📝 POST (JSON)

```javascript
(async () => {
  const url = "https://httpbin.org";
  const req = new TsReq(url);

  const res = await req.post("/post", {
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
  const req = new TsReq(url);

  const formData = new FormData();

  formData.append("test", "test");

  const res = await req.post("/post", formData);

  console.log(res);
})();
```

## 📝 Callback

```javascript
(async () => {
  const url = "https://httpbin.org";
  const req = new TsReq(url);

  const res1 = await req.get("/get", null, (req) => {
    // ... do something
    console.log(req);
  });

  const res2 = await req.post(
    "/post",
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

> callback의 첫 번째 인자인 req는 해당 요청의 XMLHttpRequest 인스턴스 입니다. type은 XMLHttpRequest입니다.

## 📝 Cancel

```javascript
(async () => {
  const url = "https://httpbin.org";
  const req = new TsReq(url);

  const needToCancel = true;

  const res = await req.get("/get", null, (req) => {
    if (needToCancel) req.abort();
  });

  console.log(res);
})();
```

> 취소된 응답은 status 0을 반환합니다.

## 📝 Set Common Headers

```javascript
req.defaultHeader["KEY"] = "VALUE";
```

## 📝 Set Resolve Status

resolve를 반환할 status를 지정합니다. 아래 예제는 status 200이 아닌 경우 모두 reject를 반환합니다.

```javascript
req.resolveStatus = [200];
```
