# tsReq

`TypeScript`로 작성된 XMLHttpRequest 기반 request 라이브러리입니다.
기본적으로 Promise를 반환합니다. `resolve`, `reject`

[git](https://github.com/junyeongCHOI/ts-req)

[npm](https://www.npmjs.com/package/ts-req)

## 🛠 Insatll

```
npm install --save tsReq
```

## 📌 Import

```javascript
import req from "tsReq";
```

## 💅 Basic Usage

```javascript
const res1 = await req.get(url, headers, callback);

const res2 = await req.post(url, body, headers, callback);
```

> url은 필수입니다.

> headers 는 [참고](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers)를 key, value로 가지는 object입니다.

> callback은 각 request의 state가 변경될 때 실행됩니다.

## 📝 GET (JSON)

```javascript
(async () => {
  const url = "https://jsonplaceholder.typicode.com/posts";

  const res = await req.get(url);

  console.log(res);
})();
```

## 📝 POST (JSON)

```javascript
(async () => {
  const url = "https://jsonplaceholder.typicode.com/posts";

  const res = await req.post(url, {
    title: "title",
    body: "body",
    userId: 1,
  });

  console.log(res);
})();
```

## 📝 Callback

```javascript
(async () => {
  const url = "https://jsonplaceholder.typicode.com/posts";

  const res1 = await req.get(url, null, (req) => {
    // ... do something
    console.log(req);
  });

  const res2 = await req.get(
    url,
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
