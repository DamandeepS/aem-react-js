import { Cache } from '../store/Cache';
import { AbstractSling, EditDialogData, SlingResourceOptions } from '../store/Sling';
export declare class MockSling extends AbstractSling {
    private cache;
    private data;
    constructor(cache: Cache, data?: EditDialogData);
    load(listener: (resource: any) => void, path: string, options?: SlingResourceOptions): void;
    renderDialogScript(): EditDialogData;
    includeResource(path: string, selectors: string[], resourceType: string): string;
    getRequestPath(): string;
}
