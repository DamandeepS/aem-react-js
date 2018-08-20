"use strict";
/* tslint:disable no-any no-unused-expression */
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var Cache_1 = require("../../store/Cache");
var CachedServiceProxy_1 = require("../CachedServiceProxy");
describe('CachedServiceProxy', function () {
    it('should invoke target and cache result', function () {
        var target = {
            invoke: function (method, args) {
                if (method === 'add' && args.length === 2) {
                    var arg1 = args[0];
                    var arg2 = args[1];
                    return JSON.stringify(arg1 + arg2);
                }
                throw new Error('unknown method');
            }
        };
        var cache = new Cache_1.Cache();
        var proxy = new CachedServiceProxy_1.CachedServiceProxy(cache, function () { return target; }, 'javaClass');
        var result = proxy.invoke('add', 1, 3);
        chai_1.expect(result).to.equal(4);
        chai_1.expect(cache.getServiceCall('javaClass.add(1,3)')).to.equal(4);
    });
    it('should invoke target and not cache result when error is thrown', function () {
        var target = {
            invoke: function (method, args) {
                throw new Error('unknown method');
            }
        };
        var cache = new Cache_1.Cache();
        var proxy = new CachedServiceProxy_1.CachedServiceProxy(cache, function () { return target; }, 'javaClass');
        try {
            proxy.invoke('add', 1, 3);
            chai_1.expect.fail('expected error');
        }
        catch (e) {
            // expected
            chai_1.expect(cache.getServiceCall('javaClass.add(1,3)')).to.be.undefined;
        }
    });
    it('should invoke target and return null', function () {
        var target = {
            invoke: function (method, args) {
                return null;
            }
        };
        var cache = new Cache_1.Cache();
        var proxy = new CachedServiceProxy_1.CachedServiceProxy(cache, function () { return target; }, 'javaClass');
        var result = proxy.invoke('add', 1, 3);
        chai_1.expect(result).to.be.null;
    });
});
//# sourceMappingURL=CachedServiceProxyTest.js.map