import { JavaApi } from '../component/JavaApi';
import { TextPool } from '../component/text/TextPool';
import { Cache } from '../store/Cache';
import { Sling } from '../store/Sling';
import { JavaApiFactory } from '../store/javaApiFactory';
import { XssUtils } from '../xss/XssUtils';
import { Cqx } from './Cqx';
import { ServiceProxy } from './ServiceProxy';
/**
 * A container for sharing global services and other objects like the cache.
 * Also provides access to the Java API.
 */
export declare class Container {
    readonly cache: Cache;
    readonly sling: Sling;
    javaApiFactory: JavaApiFactory;
    textPool: TextPool;
    xssUtils: XssUtils;
    readonly cqx: Cqx | undefined;
    private readonly services;
    constructor(cache: Cache, sling: Sling, cqx?: Cqx);
    setService(name: string, service: object): this;
    getService<T extends object = object>(name: string): T | undefined;
    /**
     * @param name Fully qualified java class name
     * @returns {ServiceProxy}
     */
    getOsgiService(name: string): ServiceProxy;
    /**
     * Get a sling model adapted from request
     * @param name fully qualified java class name
     * @returns {ServiceProxy}
     */
    getRequestModel(path: string, selectors: string[], name: string): ServiceProxy;
    /**
     * Get a sling model adapted from current resource
     * @param name fully qualified java class name
     * @returns {ServiceProxy}
     */
    getResourceModel(path: string, selectors: string[], name: string): ServiceProxy;
    createJavaApi(path: string, selectors: string[]): JavaApi;
    private getServiceProxy(args, locator);
    private createKey(params);
}
