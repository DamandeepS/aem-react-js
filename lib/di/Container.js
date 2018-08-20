"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TextPool_1 = require("../component/text/TextPool");
var javaApiFactory_1 = require("../store/javaApiFactory");
var JavaXssUtils_1 = require("../xss/JavaXssUtils");
var JsXssUtils_1 = require("../xss/JsXssUtils");
var CachedServiceProxy_1 = require("./CachedServiceProxy");
/**
 * A container for sharing global services and other objects like the cache.
 * Also provides access to the Java API.
 */
var Container = (function () {
    function Container(cache, sling, cqx) {
        this.cache = cache;
        this.sling = sling;
        this.cqx = cqx;
        this.services = Object.create(null);
        this.javaApiFactory = javaApiFactory_1.javaApiFactoryFactory(this);
        this.xssUtils =
            !!cqx && cqx.getXssApi
                ? new JavaXssUtils_1.JavaXssUtils(cqx.getXssApi())
                : new JsXssUtils_1.JsXssUtils();
        this.textPool = new TextPool_1.TextPool();
    }
    Container.prototype.setService = function (name, service) {
        this.services[name] = service;
        return this;
    };
    Container.prototype.getService = function (name) {
        return this.services[name];
    };
    /**
     * @param name Fully qualified java class name
     * @returns {ServiceProxy}
     */
    Container.prototype.getOsgiService = function (name) {
        var _this = this;
        return this.getServiceProxy(arguments, function () {
            if (!_this.cqx) {
                throw new Error('Cannot find OSGi service: ' + name);
            }
            return _this.cqx.getOsgiService(name);
        });
    };
    /**
     * Get a sling model adapted from request
     * @param name fully qualified java class name
     * @returns {ServiceProxy}
     */
    Container.prototype.getRequestModel = function (path, selectors, name) {
        var _this = this;
        return this.getServiceProxy(arguments, function () {
            if (!_this.cqx) {
                throw new Error('Cannot find request model: ' + name);
            }
            return _this.cqx.getRequestModel(path, name);
        });
    };
    /**
     * Get a sling model adapted from current resource
     * @param name fully qualified java class name
     * @returns {ServiceProxy}
     */
    Container.prototype.getResourceModel = function (path, selectors, name) {
        var _this = this;
        return this.getServiceProxy(arguments, function () {
            if (!_this.cqx) {
                throw new Error('Cannot find resource model: ' + name);
            }
            return _this.cqx.getResourceModel(path, name);
        });
    };
    Container.prototype.createJavaApi = function (path, selectors) {
        return this.javaApiFactory(path, selectors);
    };
    Container.prototype.getServiceProxy = function (args, locator) {
        return new CachedServiceProxy_1.CachedServiceProxy(this.cache, locator, this.createKey(args));
    };
    Container.prototype.createKey = function (params) {
        var key = '';
        for (var i = 0; i < params.length; i++) {
            if (i > 0) {
                key += '_';
            }
            key += params[i];
        }
        return key;
    };
    return Container;
}());
exports.Container = Container;
//# sourceMappingURL=Container.js.map