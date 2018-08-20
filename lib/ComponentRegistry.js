"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RootComponentRegistry_1 = require("./RootComponentRegistry");
var WrapperFactory_1 = require("./component/WrapperFactory");
function mapClassToResourceType(componentClassName) {
    var parts = componentClassName.match(/([A-Z][a-z0-9]*)/);
    if (parts) {
        var resourceType = parts[0].toLocaleLowerCase();
        var rest = componentClassName.substring(parts[0].length);
        if (rest.length > 0) {
            resourceType += '-' + mapClassToResourceType(rest);
        }
        return resourceType;
    }
    return componentClassName;
}
var ComponentRegistry = (function () {
    function ComponentRegistry(mapping) {
        this.mappings = [];
        this.mapping = mapping;
    }
    ComponentRegistry.prototype.register = function (componentClass, name, selector) {
        var componentClassName = name || componentClass.name;
        var resourceType = this.mapToResourceType(componentClassName);
        this.mappings.push(new RootComponentRegistry_1.Mapping(resourceType, componentClass, null, selector));
    };
    ComponentRegistry.prototype.registerVanilla = function (config) {
        var componentClassName = config.shortName || config.component.name;
        var resourceType = config.name || this.mapToResourceType(componentClassName);
        var wrapperClass = WrapperFactory_1.WrapperFactory.createWrapper(config, resourceType);
        this.mappings.push(new RootComponentRegistry_1.Mapping(resourceType, wrapperClass, config.component, config.selector));
    };
    ComponentRegistry.prototype.mapToResourceType = function (componentClassName) {
        if (typeof this.mapping === 'function') {
            return this.mapping(componentClassName);
        }
        if (typeof this.mapping === 'string') {
            return this.mapping + "/" + mapClassToResourceType(componentClassName);
        }
        return mapClassToResourceType(componentClassName);
    };
    return ComponentRegistry;
}());
exports.ComponentRegistry = ComponentRegistry;
//# sourceMappingURL=ComponentRegistry.js.map