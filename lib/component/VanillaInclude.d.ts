/// <reference types="react" />
import * as React from 'react';
import { AemComponent } from './AemComponent';
export interface VanillaProps<P> {
    readonly component: React.ComponentClass<P>;
    readonly path: string;
    readonly extraProps?: P;
}
export declare class VanillaInclude<P> extends AemComponent<VanillaProps<P>, any> {
    render(): React.ReactElement<any>;
}
