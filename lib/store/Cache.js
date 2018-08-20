"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ResourceUtils_1 = require("../ResourceUtils");
function merge(target, source) {
    if (source) {
        Object.keys(source).forEach(function (key) {
            target[key] = source[key];
        });
    }
}
function normalizeDepth(depth) {
    if (depth < 0 || depth === null || typeof depth === 'undefined') {
        return -1;
    }
    return depth;
}
function getProperty(data, path) {
    var subData = ResourceUtils_1.ResourceUtils.getProperty(data, path);
    if (typeof subData === 'undefined' || subData === null) {
        return {};
    }
    else {
        return subData;
    }
}
function createKey(path, selectors) {
    if (selectors && selectors.length > 0) {
        return path + ":" + selectors.join('-');
    }
    return path;
}
/**
 * This cache is used to store server side data and pass it to the client.
 */
var Cache = (function () {
    function Cache() {
        this.resources = {};
        this.wrapper = {};
        this.included = {};
        this.serviceCalls = {};
        this.components = {};
        this.transforms = {};
    }
    Cache.prototype.generateServiceCacheKey = function (service, method, args) {
        var cacheKey = service + "." + method + "(";
        for (var i = 0; i < args.length; i++) {
            cacheKey += String(args[i]) + '';
            if (i < args.length - 1) {
                cacheKey += ',';
            }
        }
        cacheKey += ')';
        return cacheKey;
    };
    Cache.prototype.wrapServiceCall = function (cacheKey, callback) {
        var result = this.getServiceCall(cacheKey);
        if (typeof result === 'undefined') {
            result = callback();
            this.putServiceCall(cacheKey, result);
        }
        return result;
    };
    Cache.prototype.mergeCache = function (cache) {
        var _this = this;
        if (cache) {
            Object.keys(cache).forEach(function (key) {
                merge(_this[key], cache[key]);
            });
        }
    };
    Cache.prototype.put = function (path, resource, depth) {
        if (resource === null || typeof resource === 'undefined') {
            delete this.resources[path];
        }
        else {
            this.resources[path] = {
                data: resource,
                depth: normalizeDepth(depth)
            };
        }
    };
    Cache.prototype.get = function (path, depth) {
        var normalizedDepth = normalizeDepth(depth);
        var subPath = [];
        var resource = this.resources[path];
        while (!resource && path != null) {
            var result = ResourceUtils_1.ResourceUtils.findAncestor(path, 1);
            if (result !== null) {
                path = result.path;
                subPath.splice(0, 0, result.subPath[0]);
                resource = this.resources[result.path];
            }
            else {
                break;
            }
        }
        if (typeof resource === 'undefined' || resource === null) {
            return null;
        }
        else if (resource.depth < 0) {
            return getProperty(resource.data, subPath);
        }
        else if (normalizedDepth < 0) {
            return null;
        }
        else if (subPath.length + normalizedDepth <= resource.depth) {
            return getProperty(resource.data, subPath);
        }
        else {
            return null;
        }
    };
    Cache.prototype.putServiceCall = function (key, serviceCall) {
        this.serviceCalls[key] = serviceCall;
    };
    Cache.prototype.getTransform = function (path, selectors) {
        return this.transforms[createKey(path, selectors)];
    };
    Cache.prototype.putTransform = function (path, selectors, value) {
        this.transforms[createKey(path, selectors)] = value;
    };
    Cache.prototype.getServiceCall = function (key) {
        return this.serviceCalls[key];
    };
    Cache.prototype.putScript = function (path, wrapper) {
        this.wrapper[path] = wrapper;
    };
    Cache.prototype.getScript = function (path) {
        return this.wrapper[path];
    };
    Cache.prototype.putIncluded = function (path, selectors, included, options) {
        if (options === void 0) { options = {}; }
        this.included[this.createIncludedKey(path, selectors, options)] = included;
    };
    Cache.prototype.getIncluded = function (path, selectors, options) {
        if (options === void 0) { options = {}; }
        return this.included[this.createIncludedKey(path, selectors, options)];
    };
    Cache.prototype.putComponent = function (id, data) {
        this.components[id] = data;
    };
    Cache.prototype.getComponent = function (id) {
        return this.components[id];
    };
    Cache.prototype.getFullState = function () {
        return {
            components: this.components,
            included: this.included,
            resources: this.resources,
            serviceCalls: this.serviceCalls,
            transforms: this.transforms,
            wrapper: this.wrapper
        };
    };
    Cache.prototype.clear = function () {
        this.resources = {};
        this.wrapper = {};
        this.included = {};
        this.serviceCalls = {};
        this.components = {};
        this.transforms = {};
    };
    Cache.prototype.createIncludedKey = function (path, selectors, options) {
        return (createKey(path, selectors) +
            (options && Object.keys(options).length > 0
                ? '::' + JSON.stringify(options)
                : ''));
    };
    return Cache;
}());
exports.Cache = Cache;
//# sourceMappingURL=Cache.js.map