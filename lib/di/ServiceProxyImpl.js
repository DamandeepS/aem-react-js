"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var JavaUtils_1 = require("./JavaUtils");
var ServiceProxyImpl = (function () {
    function ServiceProxyImpl(jsProxy) {
        this.jsProxy = jsProxy;
    }
    ServiceProxyImpl.prototype.invoke = function (method) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var argsArray = JavaUtils_1.JavaUtils.convertArrayToJava(args);
        return JSON.parse(this.jsProxy.invoke(method, argsArray));
    };
    ServiceProxyImpl.prototype.get = function (name) {
        return JSON.parse(this.jsProxy.get(name));
    };
    ServiceProxyImpl.prototype.getObject = function () {
        return JSON.parse(this.jsProxy.getObject());
    };
    return ServiceProxyImpl;
}());
exports.ServiceProxyImpl = ServiceProxyImpl;
//# sourceMappingURL=ServiceProxyImpl.js.map