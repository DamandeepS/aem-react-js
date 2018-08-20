"use strict";
/* tslint:disable no-unused-expression */
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var Cache_1 = require("../Cache");
describe('Cache', function () {
    it('should return direct match', function () {
        var cache = new Cache_1.Cache();
        cache.put('/content', { test: 'Test' });
        var result = cache.get('/content');
        chai_1.expect(result).to.exist;
    });
    it('should return sub match', function () {
        var cache = new Cache_1.Cache();
        cache.put('/content', { test: { text: 'Hallo' } });
        var result = cache.get('/content/test');
        chai_1.expect(result).to.exist;
        chai_1.expect(result.text).to.equal('Hallo');
    });
    it('should return empty sub match', function () {
        var cache = new Cache_1.Cache();
        cache.put('/content', { test: null });
        var result = cache.get('/content/test');
        chai_1.expect(result).to.exist;
        chai_1.expect(result).to.deep.equal({});
    });
    it('should not return insufficiently deep match', function () {
        var cache = new Cache_1.Cache();
        cache.put('/content', { test: { text: 'Hallo' } }, 1);
        var result = cache.get('/content/test');
        chai_1.expect(result).to.not.exist;
    });
    it('should return inifinity deep match', function () {
        var cache = new Cache_1.Cache();
        cache.put('/content', { test: { text: 'Hallo' } }, -1);
        var result = cache.get('/content/test/text');
        chai_1.expect(result).to.exist;
    });
    it('should return sufficiently deep match', function () {
        var cache = new Cache_1.Cache();
        cache.put('/content', { test: { text: 'Hallo' } });
        var result = cache.get('/content', 2);
        chai_1.expect(result).to.exist;
    });
    it('should return sufficiently deep sub match', function () {
        var cache = new Cache_1.Cache();
        cache.put('/content', { test: { text: 'Hallo' } }, 2);
        var result = cache.get('/content/test', 1);
        chai_1.expect(result).to.exist;
        chai_1.expect(result.text).to.equal('Hallo');
    });
    it('should return null if no match', function () {
        var cache = new Cache_1.Cache();
        cache.put('/content', { test: { text: 'Hallo' } }, 1);
        var result = cache.get('/something', 1);
        chai_1.expect(result).to.not.exist;
    });
    it('should return match of depth 2', function () {
        var cache = new Cache_1.Cache();
        cache.put('/content', { level1: { level2: 'Hallo' } }, 2);
        var result = cache.get('/content/level1/level2', 0);
        chai_1.expect(result).to.equals('Hallo');
    });
    it('should create a cache key that resembles the method invocation', function () {
        var cache = new Cache_1.Cache();
        function test(x, y) {
            return cache.generateServiceCacheKey('javaClass', 'make', [x, y]);
        }
        var key = test('do', 'it');
        chai_1.expect(key).to.equals('javaClass.make(do,it)');
    });
    it('should create a cache key that resembles the method invocation', function () {
        var cache = new Cache_1.Cache();
        function test(x, y) {
            return cache.generateServiceCacheKey('javaClass', 'make', [x, y]);
        }
        var key = test('do', 'it');
        chai_1.expect(key).to.equals('javaClass.make(do,it)');
    });
    it('should merge caches', function () {
        var cache = new Cache_1.Cache();
        cache.putIncluded('new:', [], 'oldValue');
        cache.putIncluded('existing', [], 'existingValue');
        cache.mergeCache({ included: { new: 'newValue' } });
        chai_1.expect(cache.getIncluded('new', [])).to.equals('newValue');
        chai_1.expect(cache.getIncluded('existing', [])).to.equals('existingValue');
    });
    it('should merge null caches', function () {
        var cache = new Cache_1.Cache();
        cache.mergeCache(null);
        // expect no error
    });
    it('should clear cache', function () {
        var cache = new Cache_1.Cache();
        cache.put('incl', { x: 1 });
        chai_1.expect(cache.get('incl').x).to.equals(1);
        cache.putIncluded('incl', [], 'value');
        chai_1.expect(cache.getIncluded('incl', [])).to.equals('value');
        cache.putScript('script', { element: 'test' });
        chai_1.expect(cache.getScript('script')).to.deep.equal({ element: 'test' });
        cache.putServiceCall('call', 'result');
        chai_1.expect(cache.getServiceCall('call')).to.equal('result');
        cache.clear();
        chai_1.expect(cache.get('incl')).to.be.null;
        chai_1.expect(cache.getIncluded('incl', [])).to.be.undefined;
        chai_1.expect(cache.getScript('script')).to.be.undefined;
        chai_1.expect(cache.getServiceCall('call')).to.be.undefined;
    });
    it('should write and read entries', function () {
        var cache = new Cache_1.Cache();
        cache.putIncluded('incl', [], 'value');
        chai_1.expect(cache.getIncluded('incl', [])).to.equals('value');
        cache.putScript('script', { element: 'test' });
        chai_1.expect(cache.getScript('script')).to.deep.equal({ element: 'test' });
        cache.putServiceCall('call', 'result');
        chai_1.expect(cache.getServiceCall('call')).to.equal('result');
    });
    it('should wrap service call', function () {
        var cache = new Cache_1.Cache();
        var result = cache.wrapServiceCall('x', function () { return 'done'; });
        chai_1.expect(result).to.equals('done');
    });
});
//# sourceMappingURL=CacheTest.js.map