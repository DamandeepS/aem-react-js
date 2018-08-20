"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var JavaUtils_1 = require("./JavaUtils");
/**
 * This class is a proxy that wraps a java object of type JsProxy.
 * The proxy put all calls into the cache.
 */
var CachedServiceProxy = (function () {
    function CachedServiceProxy(cache, locator, name) {
        this.cache = cache;
        this.locator = locator;
        this.name = name;
    }
    /**
     * Call a method on the proxied object. returns the cached value if available.
     *
     * @param name of java method to call
     * @param args to java method
     * @returns {T}
     */
    CachedServiceProxy.prototype.invoke = function (method) {
        var _this = this;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var cacheKey = this.cache.generateServiceCacheKey(this.name, method, args);
        var argsArray = JavaUtils_1.JavaUtils.convertArrayToJava(args);
        return this.cache.wrapServiceCall(cacheKey, function () {
            var result = _this.locator().invoke(method, argsArray);
            if (result == null) {
                return null;
            }
            return JSON.parse(result);
        });
    };
    CachedServiceProxy.prototype.get = function (name) {
        var _this = this;
        var cacheKey = this.cache.generateServiceCacheKey(this.name, name, []);
        return this.cache.wrapServiceCall(cacheKey, function () {
            var result = _this.locator().get(name);
            if (result == null) {
                return null;
            }
            return JSON.parse(result);
        });
    };
    CachedServiceProxy.prototype.getObject = function () {
        var _this = this;
        var cacheKey = this.cache.generateServiceCacheKey(this.name, '', []);
        return this.cache.wrapServiceCall(cacheKey, function () {
            var result = _this.locator().getObject();
            if (result == null) {
                return null;
            }
            return JSON.parse(result);
        });
    };
    return CachedServiceProxy;
}());
exports.CachedServiceProxy = CachedServiceProxy;
//# sourceMappingURL=CachedServiceProxy.js.map