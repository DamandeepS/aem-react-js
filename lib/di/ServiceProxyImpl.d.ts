import { JsProxy } from './JsProxy';
import { ServiceProxy } from './ServiceProxy';
export declare class ServiceProxyImpl implements ServiceProxy {
    private readonly jsProxy;
    constructor(jsProxy: JsProxy);
    invoke<T>(method: string, ...args: any[]): T;
    get<T>(name: string): T;
    getObject<T extends object>(): T;
}
