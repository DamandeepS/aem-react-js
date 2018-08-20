/// <reference types="react" />
import { RootComponent } from './component/RootComponent';
export declare type rootDecorator = (root: React.ReactElement<RootComponent>) => JSX.Element;
export declare const identity: rootDecorator;
