/// <reference types="react" />
import * as React from 'react';
import { Mapping } from './RootComponentRegistry';
import { ComponentConfig } from './component/WrapperFactory';
export declare class ComponentRegistry {
    readonly mappings: Mapping[];
    private readonly mapping;
    constructor(mapping?: ((componentClassName: string) => string) | string);
    register(componentClass: React.ComponentClass<any>, name?: string, selector?: string): void;
    registerVanilla<R>(config: ComponentConfig<R>): void;
    private mapToResourceType(componentClassName);
}
