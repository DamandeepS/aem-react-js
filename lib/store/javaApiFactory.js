"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ServiceProxyImpl_1 = require("../di/ServiceProxyImpl");
var JavaApiImpl = (function () {
    function JavaApiImpl(path, selectors, container) {
        this.path = path;
        this.container = container;
        this.selectors = selectors;
    }
    JavaApiImpl.prototype.getOsgiService = function (name) {
        return this.getServiceProxy(this.container.cqx.getOsgiService(name));
    };
    JavaApiImpl.prototype.getResourceModel = function (name, options) {
        if (options === void 0) { options = {}; }
        return this.getServiceProxy(this.container.cqx.getResourceModel(options.path || this.path, name));
    };
    JavaApiImpl.prototype.getRequestModel = function (name, options) {
        if (options === void 0) { options = {}; }
        return this.getServiceProxy(this.container.cqx.getRequestModel(options.path || this.path, name));
    };
    JavaApiImpl.prototype.getPath = function () {
        return this.path;
    };
    JavaApiImpl.prototype.getXssApi = function () {
        return this.container.cqx.getXssApi();
    };
    JavaApiImpl.prototype.getServiceProxy = function (jsProxy) {
        return new ServiceProxyImpl_1.ServiceProxyImpl(jsProxy);
    };
    return JavaApiImpl;
}());
exports.JavaApiImpl = JavaApiImpl;
var javaApiFactoryFactory = function (container) { return function (path, selectors) { return new JavaApiImpl(path, selectors, container); }; };
exports.javaApiFactoryFactory = javaApiFactoryFactory;
//# sourceMappingURL=javaApiFactory.js.map