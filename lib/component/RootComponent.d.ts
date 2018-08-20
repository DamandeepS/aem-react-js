/// <reference types="react" />
import * as React from 'react';
import { AemContext } from '../AemContext';
export interface ChildContext {
    readonly aemContext: AemContext;
    readonly path: string;
    readonly root: string;
    readonly selectors: string[];
    readonly wcmmode?: string;
}
export interface ComponentProps {
    readonly path: string;
    readonly root: boolean;
    readonly skipRenderDialog: boolean;
    readonly wcmmode?: string;
}
export interface RootComponentProps {
    readonly component: React.ComponentClass<ComponentProps>;
    readonly aemContext: AemContext;
    readonly path: string;
    readonly renderRootDialog?: boolean;
    readonly selectors: string[];
    readonly wcmmode?: string;
    readonly id?: string;
}
export declare class RootComponent extends React.Component<RootComponentProps> {
    static readonly childContextTypes: object;
    getChildContext(): ChildContext;
    render(): JSX.Element;
}
