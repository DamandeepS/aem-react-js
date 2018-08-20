"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var rootDecorator_1 = require("./rootDecorator");
var Mapping = (function () {
    function Mapping(resourceType, componentClass, vanillaClass, selector) {
        this.resourceType = resourceType;
        this.componentClass = componentClass;
        this.vanillaClass = vanillaClass;
        this.selector = selector || '';
    }
    return Mapping;
}());
exports.Mapping = Mapping;
var RootComponentRegistry = (function () {
    function RootComponentRegistry() {
        this.rootDecorator = rootDecorator_1.identity;
        this.resourceTypeToComponent = {};
        this.componentToResourceType = {};
        this.vanillaToWrapper = {};
        this.registries = [];
    }
    RootComponentRegistry.prototype.add = function (registry) {
        this.registries.push(registry);
    };
    RootComponentRegistry.prototype.getResourceType = function (component) {
        if (component instanceof React.Component) {
            var componentClassName = Object.getPrototypeOf(component)
                .constructor.name;
            return this.componentToResourceType[componentClassName];
        }
        else {
            var componentClassName = component.name;
            return this.componentToResourceType[componentClassName];
        }
    };
    RootComponentRegistry.prototype.getComponent = function (resourceType, selectors) {
        if (resourceType && resourceType.match(/^\/apps\//)) {
            resourceType = resourceType.substring('/apps/'.length);
        }
        if (resourceType && resourceType.match(/\/$/)) {
            resourceType = resourceType.substring(0, resourceType.length - 1);
        }
        var componentsBySelector = this.resourceTypeToComponent[resourceType];
        if (componentsBySelector !== undefined) {
            var matchingSelectors = selectors.filter(function (selector) { return componentsBySelector[selector] !== undefined; });
            return componentsBySelector[matchingSelectors.length === 1 ? matchingSelectors[0] : ''];
        }
        return undefined;
    };
    RootComponentRegistry.prototype.register = function (mapping) {
        var componentClassName = mapping.componentClass.name;
        if (!mapping.vanillaClass) {
            // vanilla component's class all have the same name
            this.componentToResourceType[componentClassName] = mapping.resourceType;
        }
        else {
            var vanillaClassName = mapping.vanillaClass['name'];
            this.vanillaToWrapper[vanillaClassName] = mapping.componentClass;
        }
        if (this.resourceTypeToComponent[mapping.resourceType] === undefined) {
            this.resourceTypeToComponent[mapping.resourceType] = {};
        }
        this.resourceTypeToComponent[mapping.resourceType][mapping.selector || ''] =
            mapping.componentClass;
    };
    RootComponentRegistry.prototype.init = function () {
        var _this = this;
        this.registries.forEach(function (registry) {
            registry.mappings.forEach(function (mapping) {
                _this.register(mapping);
            }, _this);
        }, this);
    };
    RootComponentRegistry.prototype.getVanillaWrapper = function (component) {
        return this.vanillaToWrapper[component.name];
    };
    return RootComponentRegistry;
}());
exports.RootComponentRegistry = RootComponentRegistry;
//# sourceMappingURL=RootComponentRegistry.js.map