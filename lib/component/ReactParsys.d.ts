/// <reference types="react" />
import * as React from 'react';
import { IncludeOptions } from '../store/Sling';
import { Resource, ResourceComponent, ResourceProps } from './ResourceComponent';
export interface ReactParsysProps extends ResourceProps {
    readonly className?: string;
    readonly elementName?: string;
    readonly childClassName?: string;
    readonly childElementName?: string;
    readonly includeOptions?: IncludeOptions;
}
export declare class ReactParsys extends ResourceComponent<Resource, ReactParsysProps, any> {
    renderBody(): React.ReactElement<any>;
    protected getDepth(): number;
}
