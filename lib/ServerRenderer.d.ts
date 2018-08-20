import { RootComponentRegistry } from './RootComponentRegistry';
import { TextPool } from './component/text/TextPool';
import { Container } from './di/Container';
export interface ServerResponse {
    readonly html: string;
    readonly state: string;
    readonly reactContext: any;
}
export interface ReactContext {
    textPool: TextPool;
    rootNo: number;
}
export declare class ServerRenderer {
    private readonly container;
    private readonly registry;
    constructor(registry: RootComponentRegistry, container: Container);
    renderReactComponent(path: string, resourceType: string, wcmmode: string, renderAsJson?: boolean, reactContext?: ReactContext, selectors?: string[]): ServerResponse;
}
