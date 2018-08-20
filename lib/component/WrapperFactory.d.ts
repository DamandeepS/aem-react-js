/// <reference types="react" />
import * as React from 'react';
import { JavaApi } from './JavaApi';
import { ReactParsysProps } from './ReactParsys';
import { ResourceComponent, ResourceProps } from './ResourceComponent';
export declare type Transform<R> = (props: any, api: JavaApi) => R;
export declare type parsysFactory<P> = (api: JavaApi, props: P) => JSX.Element[];
export interface ComponentConfig<R> {
    readonly shortName?: string;
    readonly name?: string;
    readonly parsys?: ReactParsysProps;
    readonly parsysFactory?: parsysFactory<R>;
    readonly component: React.ComponentClass<any>;
    readonly props?: {
        [name: string]: any;
    };
    readonly transform?: Transform<R>;
    readonly loadingComponent?: React.ComponentClass<any>;
    readonly selector?: string;
}
export interface WrapperProps<E extends object> extends ResourceProps {
    readonly extraProps: E;
}
export declare class Wrapper<E extends object, R> extends ResourceComponent<any, WrapperProps<E>, any> {
    protected readonly config: ComponentConfig<R>;
    constructor(config: ComponentConfig<R>, props?: any, context?: any);
    create(): React.ReactElement<any>;
    renderBody(): React.ReactElement<any>;
    protected isSkipData(): boolean;
    protected renderLoading(): React.ReactElement<any>;
    private transform(props);
}
export declare class WrapperFactory {
    /**
     *
     * @param config
     * @param resourceType
     * @return {TheWrapper}
     */
    static createWrapper<E extends object, R>(config: ComponentConfig<R>, resourceType: string): React.ComponentClass<any>;
}
