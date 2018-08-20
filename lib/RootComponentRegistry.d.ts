/// <reference types="react" />
import * as React from 'react';
import { ComponentRegistry } from './ComponentRegistry';
import { rootDecorator } from './rootDecorator';
export declare class Mapping {
    readonly resourceType: string;
    readonly vanillaClass: React.ComponentClass<any>;
    readonly componentClass: React.ComponentClass<any>;
    readonly selector: string;
    constructor(resourceType: string, componentClass: React.ComponentClass<any>, vanillaClass: React.ComponentClass<any>, selector: string);
}
export declare class RootComponentRegistry {
    rootDecorator: rootDecorator;
    private readonly registries;
    private readonly resourceTypeToComponent;
    private readonly componentToResourceType;
    private readonly vanillaToWrapper;
    constructor();
    add(registry: ComponentRegistry): void;
    getResourceType(component: React.ComponentClass<any> | React.Component<any, any>): string;
    getComponent(resourceType: string, selectors: string[]): React.ComponentClass<any>;
    register(mapping: Mapping): void;
    init(): void;
    getVanillaWrapper(component: React.ComponentClass<any>): React.ComponentClass<any>;
}
