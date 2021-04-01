interface sendConfig {
    method: "GET" | "get" | "POST" | "post";
    pathname?: string;
    body?: any;
    headers?: any;
    callback?: Function;
}
declare class TsReq {
    readonly url: string;
    defaultHeader: any;
    resolveStatus: number[];
    constructor(url: string);
    bodyParser<T>(data: T): T | string;
    dataParser(xhr: XMLHttpRequest): any;
    send(config: sendConfig): Promise<any>;
    get(pathname?: string, headers?: any, callback?: Function): Promise<any>;
    post(pathname?: string, body?: any, headers?: any, callback?: Function): Promise<any>;
}
export default TsReq;
