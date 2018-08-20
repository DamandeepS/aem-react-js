import { Cache } from './Cache';
import { AbstractSling, EditDialogData, IncludeOptions, SlingResourceOptions } from './Sling';
export interface JavaSling {
    includeResource(path: string, resourceType: string, addSelectors: string, selectors: string, decorationTagName: string): string;
    currentResource(depth: number): any;
    getResource(path: string, depth: number): any;
    renderDialogScript(path: string, resourceType: string): string;
    getPagePath(): string;
}
export declare class ServerSling extends AbstractSling {
    private readonly sling;
    private readonly cache;
    constructor(cache: Cache, sling: JavaSling);
    load(listener: (resource: any) => void, path: string, options?: SlingResourceOptions): void;
    renderDialogScript(path: string, resourceType: string): EditDialogData;
    includeResource(path: string, selectors: string[], resourceType: string, options: IncludeOptions): string;
    getRequestPath(): string;
}
