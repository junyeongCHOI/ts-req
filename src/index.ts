export default class Core {
  static commonHeaders: any = {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
  };

  static resResolveStatus: number[] = [
    100,
    101,
    200,
    201,
    202,
    203,
    204,
    205,
    206,
  ];

  static setHeaders(httpRequest: XMLHttpRequest, headers?: any) {
    Object.entries({ ...this.commonHeaders, ...headers }).forEach(
      ([key, value]: [string, any]) => {
        httpRequest.setRequestHeader(key, value);
      }
    );
  }

  static runCallback(httpRequest: XMLHttpRequest, callback?: Function) {
    if (typeof callback !== "function") {
      return;
    }
    callback(httpRequest);
  }

  static parsedBody(data: any): any {
    if (data instanceof FormData) {
      return data;
    } else {
      return JSON.stringify(data);
    }
  }

  static parsedData(httpRequest: XMLHttpRequest): string | void {
    const contentType: string | null = httpRequest.getResponseHeader(
      "Content-Type"
    );
    const data: string = httpRequest.response;

    if (contentType && contentType.indexOf("json") !== -1) {
      return JSON.parse(data);
    } else {
      return data;
    }
  }

  static getHttpRequest(): XMLHttpRequest {
    const httpRequest = new XMLHttpRequest();
    if (!httpRequest) {
      throw "XMLHttpRequest의 인스턴스를 만들 수 없습니다.";
    }

    return httpRequest;
  }

  static setOnReadyStateChange(
    httpRequest: XMLHttpRequest,
    resolve: Function,
    reject: Function,
    callback?: Function
  ) {
    httpRequest.onreadystatechange = (): void => {
      try {
        if (httpRequest.readyState === httpRequest.DONE) {
          // 요청 완료
          if (this.resResolveStatus.includes(httpRequest.status)) {
            resolve({
              status: httpRequest.status,
              data: this.parsedData(httpRequest),
            });
          } else {
            // status resSuccessCode이외 예외처리
            reject({ status: httpRequest.status, data: httpRequest.response });
          }
        }

        // 콜백이 있을 경우 각 readyState 마다 callback을 실행
        this.runCallback(httpRequest, callback);
      } catch (error) {
        // 응답 이외의 에러 예외처리
        reject(error);
      }
    };
  }

  static get(url: string, headers?: any, callback?: Function): Promise<any> {
    return new Promise((resolve: Function, reject: Function) => {
      try {
        const httpRequest: XMLHttpRequest = this.getHttpRequest();

        httpRequest.open("GET", url);

        this.setHeaders(httpRequest, headers);

        this.setOnReadyStateChange(httpRequest, resolve, reject, callback);

        httpRequest.send();
      } catch (error) {
        reject(error);
      }
    });
  }

  static post(
    url: string,
    body?: any,
    headers?: any,
    callback?: Function
  ): Promise<any> {
    return new Promise((resolve: Function, reject: Function) => {
      try {
        const httpRequest: XMLHttpRequest = this.getHttpRequest();

        httpRequest.open("POST", url);

        this.setHeaders(httpRequest, headers);

        this.setOnReadyStateChange(httpRequest, resolve, reject, callback);

        httpRequest.send(this.parsedBody(body));
      } catch (error) {
        reject(error);
      }
    });
  }
}
