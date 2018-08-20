import { EditDialogData, IncludeOptions } from './Sling';
/**
 * This cache is used to store server side data and pass it to the client.
 */
export declare class Cache {
    private resources;
    private wrapper;
    private included;
    private serviceCalls;
    private components;
    private transforms;
    constructor();
    generateServiceCacheKey(service: string, method: string, args: any[]): string;
    wrapServiceCall<T>(cacheKey: string, callback: () => T): T;
    mergeCache(cache: any): void;
    put(path: string, resource: any, depth?: number): void;
    get(path: string, depth?: number): any;
    putServiceCall(key: string, serviceCall: any): void;
    getTransform(path: string, selectors: string[]): any;
    putTransform(path: string, selectors: string[], value: any): void;
    getServiceCall(key: string): any;
    putScript(path: string, wrapper: EditDialogData): void;
    getScript(path: string): EditDialogData;
    putIncluded(path: string, selectors: string[], included: string, options?: IncludeOptions): void;
    getIncluded(path: string, selectors: string[], options?: IncludeOptions): string;
    putComponent(id: string, data: any): void;
    getComponent<C>(id: string): C | undefined;
    getFullState(): any;
    clear(): void;
    private createIncludedKey(path, selectors, options);
}
