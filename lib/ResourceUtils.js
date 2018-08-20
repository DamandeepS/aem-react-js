"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ResourceUtils = (function () {
    function ResourceUtils() {
    }
    /**
     * returns only the properties of the given object
     * whoe have a property named sling:resourceType
     * @param resource the resource
     * @returns {any} the sub object
     */
    ResourceUtils.getChildren = function (resource) {
        var children = {};
        if (resource) {
            Object.keys(resource).forEach(function (propertyName) {
                var child = resource[propertyName];
                if (child['sling:resourceType']) {
                    children[propertyName] = child;
                }
            });
        }
        return children;
    };
    ResourceUtils.getProperty = function (data, path) {
        /* tslint:disable-next-line prefer-for-of */
        for (var i = 0; i < path.length; i++) {
            data = data[path[i]];
            if (!data) {
                return null;
            }
        }
        return data;
    };
    ResourceUtils.isAbsolutePath = function (path) {
        return ResourceUtils.ABSOLUTE_PATH_PATTERN.test(path);
    };
    ResourceUtils.findAncestor = function (resourcePath, depth) {
        var subPath = [];
        for (var i = 0; i < depth; i++) {
            var index = resourcePath.lastIndexOf('/');
            if (index < 0) {
                return null;
            }
            subPath.push(resourcePath.substring(index + 1));
            resourcePath = resourcePath.substring(0, index);
        }
        return { path: resourcePath, subPath: subPath };
    };
    ResourceUtils.getContainingPagePath = function (requestPath) {
        var index = requestPath.indexOf('jcr:content');
        if (index < 0) {
            return requestPath;
        }
        var dot = requestPath.indexOf('.');
        return (requestPath.substring(0, index - 1) +
            requestPath.substring(dot, requestPath.length));
    };
    ResourceUtils.isSamePath = function (path) {
        return path === '.';
    };
    ResourceUtils.createPath = function (contextPath, path) {
        return ResourceUtils.isAbsolutePath(path)
            ? path
            : ResourceUtils.isSamePath(path)
                ? contextPath
                : contextPath + "/" + String(path);
    };
    ResourceUtils.ABSOLUTE_PATH_PATTERN = /^(\/|https?:\/\/)/;
    return ResourceUtils;
}());
exports.ResourceUtils = ResourceUtils;
//# sourceMappingURL=ResourceUtils.js.map