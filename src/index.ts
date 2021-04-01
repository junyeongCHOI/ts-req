interface sendConfig {
  method: "GET" | "get" | "POST" | "post";
  url?: string;
  body?: any;
  headers?: any;
  callback?: Function;
}

class TsReq {
  readonly url: string;
  defaultHeader: any;
  resolveStatus: number[];

  constructor(url: string) {
    this.url = url;
    this.defaultHeader = {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      accept: "*",
    };
    this.resolveStatus = [0, 100, 101, 200, 201, 202, 203, 204, 205, 206];
  }

  bodyParser<T>(data: T): T | string {
    if (!(data instanceof FormData) && typeof data === "object") {
      return JSON.stringify(data);
    }

    return data;
  }

  dataParser(xhr: XMLHttpRequest): any {
    const contentType = xhr.getResponseHeader("Content-Type");
    const data = xhr.response;

    if (contentType && contentType.indexOf("json") !== -1) {
      return JSON.parse(data);
    } else {
      return data;
    }
  }

  send(config: sendConfig): Promise<any> {
    return new Promise((resolve: any, reject: any) => {
      try {
        const xhr = new XMLHttpRequest();
        if (!xhr)
          return reject("XMLHttpRequest의 인스턴스를 만들 수 없습니다.");

        const mergedUrl =
          typeof config.url === "string" && config.url !== "/"
            ? this.url + config.url
            : this.url;

        // 상태 변경 실행 함수
        xhr.onreadystatechange = (): void => {
          try {
            if (xhr.readyState === xhr.DONE) {
              if (this.resolveStatus.includes(xhr.status)) {
                resolve({
                  status: xhr.status,
                  data: this.dataParser(xhr),
                });
              } else {
                reject({ status: xhr.status, data: xhr.response });
              }
            }

            if (typeof config.callback === "function") {
              config.callback(xhr);
            }
          } catch (error) {
            reject(error);
          }
        };

        xhr.open(config.method, mergedUrl);

        //헤더 설정
        Object.entries({ ...this.defaultHeader, ...config.headers }).forEach(
          ([key, value]: [string, any]) => {
            xhr.setRequestHeader(key, value);
          }
        );

        xhr.send(this.bodyParser(config.body));
      } catch (error) {
        reject(error);
      }
    });
  }

  get(url?: string, headers?: any, callback?: Function) {
    return this.send({
      method: "GET",
      url,
      headers,
      callback,
    });
  }

  post(url?: string, body?: any, headers?: any, callback?: Function) {
    return this.send({
      method: "POST",
      url,
      body,
      headers,
      callback,
    });
  }
}
export default TsReq;
