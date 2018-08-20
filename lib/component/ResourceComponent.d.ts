/// <reference types="react" />
import * as React from 'react';
import { RootComponentRegistry } from '../RootComponentRegistry';
import { IncludeOptions } from '../store/Sling';
import { AemComponent, AemComponentContext } from './AemComponent';
export interface Resource {
    readonly 'sling:resourceType': string;
}
export declare enum STATE {
    LOADING = 0,
    LOADED = 1,
    FAILED = 2,
}
export interface ResourceProps {
    readonly path: string;
    readonly skipRenderDialog?: boolean;
    readonly root?: boolean;
    readonly wcmmode?: string;
    readonly className?: string;
    readonly selectors?: string[];
}
/**
 * Provides base functionality for components that are
 */
export declare abstract class ResourceComponent<C extends Resource, P extends ResourceProps, S = {}> extends AemComponent<P, S> {
    static readonly childContextTypes: any;
    private loadingState;
    private resource;
    getChildContext(): any;
    shouldComponentUpdate(nextProps: P, nextState: {}, nextCtx: AemComponentContext): boolean;
    componentWillUpdate(newProps: P, newState: S, newContext: AemComponentContext): void;
    componentWillMount(): void;
    loadIfNecessary(path: string, selectors: string[]): void;
    load(path: string, selectors: string[]): void;
    getSelectors(): string[];
    getWcmmode(): string | undefined;
    getPath(): string;
    render(): React.ReactElement<any>;
    getRegistry(): RootComponentRegistry;
    abstract renderBody(): React.ReactElement<any>;
    getResource(): C;
    getResourceType(): string;
    changedResource(resource: C): void;
    protected renderLoading(): React.ReactElement<any>;
    protected getDepth(): number;
    protected isSkipData(): boolean;
    protected renderChildren(path: string, childClassName?: string, childElementName?: string, includeOptions?: IncludeOptions): React.ReactElement<any>[];
    private createPath(props, context);
}
