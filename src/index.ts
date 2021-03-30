class TsReq {
  static commonHeaders: any = { "Cache-Control": "no-cache" };
  static resSuccessCode: number[] = [
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

  static setHeaders(httpRequest: XMLHttpRequest, headers: any) {
    Object.entries({ ...this.commonHeaders, ...headers }).forEach(
      ([key, value]: [string, any]) => {
        httpRequest.setRequestHeader(key, value);
      }
    );
  }

  static runCallback(callback: Function) {
    if (typeof callback !== "function") {
      return;
    }
  }

  static parsedData(httpRequest: XMLHttpRequest): string | void {
    const contentType: string | null = httpRequest.getResponseHeader(
      "Content-Type"
    );
    const data: string = httpRequest.responseText;

    if (contentType && contentType.indexOf("json") !== -1) {
      return JSON.parse(data);
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
    callback: Function,
    resolve: Function,
    reject: Function
  ) {
    httpRequest.onreadystatechange = (): void => {
      try {
        if (httpRequest.readyState === httpRequest.DONE) {
          // 요청 완료
          if (this.resSuccessCode.includes(httpRequest.status)) {
            resolve({
              status: httpRequest.status,
              data: this.parsedData(httpRequest),
            });
          } else {
            // status resSuccessCode이외 예외처리
            reject(httpRequest.responseText);
          }
        }

        // 콜백이 있을 경우 각 readyState 마다 callback을 실행
        this.runCallback(callback);
      } catch (error) {
        // 응답 이외의 에러 예외처리
        reject(error);
      }
    };
  }

  static get(url: string, headers: any, callback: Function): Promise<any> {
    return new Promise((resolve: Function, reject: Function) => {
      try {
        const httpRequest: XMLHttpRequest = this.getHttpRequest();

        httpRequest.open("GET", url);

        this.setHeaders(httpRequest, headers);

        this.setOnReadyStateChange(httpRequest, callback, resolve, reject);

        httpRequest.send();
      } catch (error) {
        reject(error);
      }
    });
  }

  static post(url: string, body: any, headers: any, callback: Function) {
    return new Promise((resolve: Function, reject: Function) => {
      try {
        const httpRequest: XMLHttpRequest = this.getHttpRequest();

        httpRequest.open("POST", url);

        this.setHeaders(httpRequest, headers);

        this.setOnReadyStateChange(httpRequest, callback, resolve, reject);

        httpRequest.send(body);
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default TsReq;
