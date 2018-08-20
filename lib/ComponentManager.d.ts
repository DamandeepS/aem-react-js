/// <reference types="react" />
import * as React from 'react';
import { RootComponentRegistry } from './RootComponentRegistry';
import { reviver } from './component/text/TextUtils';
import { Container } from './di/Container';
import { Cache } from './store/Cache';
export interface ComponentTreeConfig {
    readonly wcmmode: string;
    readonly path: string;
    readonly resourceType: string;
    readonly cache: Cache;
    readonly selectors: string[];
}
export declare type ShouldStartReact = (props: ComponentTreeConfig) => boolean;
export interface ReactOptions {
    shouldStartReact?: ShouldStartReact;
}
/**
 * The Component
 */
export declare class ComponentManager {
    private readonly container;
    private readonly registry;
    constructor(registry: RootComponentRegistry, container: Container);
    /**
     * Initialize react component in dom.
     * @param item
     */
    initReactComponent(item: Element, options: ReactOptions, reviverFn: reviver, id: string): void;
    getResourceType(component: React.ComponentClass<any>): string;
    getComponent(resourceType: string, selectors?: string[]): React.ComponentClass<any>;
    /**
     * find all root elements and initialize the react components
     */
    initReactComponents(el: Element, options?: ReactOptions): number;
}
