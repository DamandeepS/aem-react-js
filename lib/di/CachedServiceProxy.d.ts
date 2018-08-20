import { Cache } from '../store/Cache';
import { Locator } from './Locator';
import { ServiceProxy } from './ServiceProxy';
/**
 * This class is a proxy that wraps a java object of type JsProxy.
 * The proxy put all calls into the cache.
 */
export declare class CachedServiceProxy implements ServiceProxy {
    readonly name: string;
    private readonly cache;
    private readonly locator;
    constructor(cache: Cache, locator: Locator, name: string);
    /**
     * Call a method on the proxied object. returns the cached value if available.
     *
     * @param name of java method to call
     * @param args to java method
     * @returns {T}
     */
    invoke<T>(method: string, ...args: any[]): T;
    get<T>(name: string): T;
    getObject<T extends object>(): T;
}
