import { Cache } from './Cache';
import { AbstractSling, EditDialogData, IncludeOptions, SlingResourceOptions } from './Sling';
export interface FetchWindow {
    fetch(url: string, options: any): any;
}
/**
 * ClientSling gets all data from the cache.
 * If the data is not available then it will get the part of the cache which
 * corresponds to the given component from the server.
 */
export declare class ClientSling extends AbstractSling {
    private readonly cache;
    private readonly origin;
    private readonly fetchWindow;
    private readonly delayInMillis;
    constructor(cache: Cache, origin: string, fetchWindow?: FetchWindow, delayInMillis?: number);
    load(listener: (resource: any) => void, path: string, options?: SlingResourceOptions): void;
    renderDialogScript(path: string, resourceType: string): EditDialogData;
    includeResource(path: string, selectors: string[], resourceType: string, options: IncludeOptions): string;
    getRequestPath(): string;
}
