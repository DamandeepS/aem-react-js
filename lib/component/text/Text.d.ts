/// <reference types="react" />
import { HTMLAttributes } from 'react';
import { Context } from '../../xss/XssUtils';
import { AemComponent } from '../AemComponent';
export interface TextProps extends HTMLAttributes<HTMLElement> {
    element: string;
    value: string | null;
    context?: Context;
}
export declare const poolableLength = 20;
export declare class Text extends AemComponent<TextProps> {
    render(): JSX.Element;
    private getPassThroughs();
}
