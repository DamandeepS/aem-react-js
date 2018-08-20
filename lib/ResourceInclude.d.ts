/// <reference types="react" />
import * as React from 'react';
import { AemComponent } from './component/AemComponent';
import { IncludeOptions } from './store/Sling';
export interface IncludeProps {
    readonly path: string;
    readonly resourceType: string;
    readonly element?: string;
    readonly className?: string;
    readonly hidden?: boolean;
    readonly options?: IncludeOptions;
    readonly attrs?: any;
    readonly extraProps?: any;
}
export declare class ResourceInclude extends AemComponent<IncludeProps, any> {
    render(): React.ReactElement<any>;
}
