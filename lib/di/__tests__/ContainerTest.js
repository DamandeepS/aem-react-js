"use strict";
/* tslint:disable no-any no-unused-expression */
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var Container_1 = require("../../di/Container");
var Cache_1 = require("../../store/Cache");
var MockSling_1 = require("../../test/MockSling");
describe('Container', function () {
    var methodResult = 'methodResult';
    var paramValue = 'param';
    var methodName = 'test';
    var proxy = {
        invoke: function (method, param) {
            chai_1.expect(param[0]).to.equal(paramValue);
            chai_1.expect(method).to.equal(methodName);
            return JSON.stringify(methodResult);
        }
    };
    it('should return resourceModel', function () {
        var cache = new Cache_1.Cache();
        var container = new Container_1.Container(cache, new MockSling_1.MockSling(cache), {
            getResourceModel: function (path, resourceType) {
                chai_1.expect(path).to.equal('/test');
                chai_1.expect(resourceType).to.equal('/components/test');
                return proxy;
            }
        });
        var service = container.getResourceModel('/test', ['s1'], '/components/test');
        chai_1.expect(service.name).to.equal('/test_s1_/components/test');
        var result = service.invoke(methodName, paramValue);
        chai_1.expect(result).to.equal(methodResult);
    });
    it('should return requestModel', function () {
        var cache = new Cache_1.Cache();
        var container = new Container_1.Container(cache, new MockSling_1.MockSling(cache), {
            getRequestModel: function (path, resourceType) {
                chai_1.expect(path).to.equal('/test');
                chai_1.expect(resourceType).to.equal('/components/test');
                return proxy;
            }
        });
        var service = container.getRequestModel('/test', [], '/components/test');
        chai_1.expect(service.name).to.equal('/test__/components/test');
        var result = service.invoke(methodName, paramValue);
        chai_1.expect(result).to.equal(methodResult);
    });
    it('should return osgi service', function () {
        var cache = new Cache_1.Cache();
        var container = new Container_1.Container(cache, new MockSling_1.MockSling(cache), {
            getOsgiService: function (className) {
                chai_1.expect(className).to.equal('java.pack.Service');
                return proxy;
            }
        });
        var service = container.getOsgiService('java.pack.Service');
        chai_1.expect(service.name).to.equal('java.pack.Service');
        var result = service.invoke(methodName, paramValue);
        chai_1.expect(result).to.equal(methodResult);
    });
    it('should return an existing service', function () {
        var cache = new Cache_1.Cache();
        var container = new Container_1.Container(cache, new MockSling_1.MockSling(cache));
        var service = {};
        container.setService('foo', service);
        chai_1.expect(container.getService('foo')).to.equal(service);
    });
    it('should return undefined for an unknown service', function () {
        var cache = new Cache_1.Cache();
        var container = new Container_1.Container(cache, new MockSling_1.MockSling(cache));
        chai_1.expect(container.getService('foo')).to.equal(undefined);
    });
});
//# sourceMappingURL=ContainerTest.js.map