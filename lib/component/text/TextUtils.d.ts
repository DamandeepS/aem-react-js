import { TextPool } from './TextPool';
declare type reviver = (key: string, value: any) => any;
declare const reviveFactory: (container: Element) => (key: string, value: any) => any;
declare const replaceFactory: (textPool: TextPool) => (key: string, value: any) => any;
export { reviveFactory, replaceFactory, reviver };
