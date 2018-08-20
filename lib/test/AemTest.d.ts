import { AemContext } from '../AemContext';
import { ComponentRegistry } from '../ComponentRegistry';
export declare class AemTest {
    currentAemContext: AemContext;
    private registry;
    init(): void;
    addRegistry(registry: ComponentRegistry): void;
    addResource(path: string, resource: any, depth?: number): void;
    render(resource: any, path?: string, selectors?: string[]): any;
}
