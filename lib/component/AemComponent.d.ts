/// <reference types="react" />
import * as React from 'react';
import { AemContext } from '../AemContext';
import { RootComponentRegistry } from '../RootComponentRegistry';
import { Container } from '../di/Container';
import { ServiceProxy } from '../di/ServiceProxy';
import { XssApi } from '../xss/XssApi';
import { ApiOptions, JavaApi } from './JavaApi';
export interface AemComponentContext {
    readonly aemContext: AemContext;
    readonly path: string;
    readonly root: string;
    readonly selectors: string[];
    readonly wcmmode?: string;
}
export declare class AemComponent<P = {}, S = {}> extends React.Component<P, S> implements JavaApi {
    static readonly contextTypes: object;
    readonly context: AemComponentContext;
    getWcmmode(): string | undefined;
    getPath(): string;
    getSelectors(): string[];
    isWcmEnabled(): boolean;
    getRegistry(): RootComponentRegistry;
    getOsgiService(name: string): ServiceProxy;
    getResourceModel(name: string, options?: ApiOptions): ServiceProxy;
    getRequestModel(name: string, options?: ApiOptions): ServiceProxy;
    getXssApi(): XssApi;
    protected getAemContext(): AemContext;
    protected getContainer(): Container;
    private getExtendedPath(options);
}
