"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var TextPool_1 = require("../TextPool");
describe('TextPool', function () {
    it('put text', function () {
        var textPool = new TextPool_1.TextPool();
        var id = textPool.put('Hi', '1');
        chai_1.expect(id).to.equal('text_1_0');
    });
    it('put text twice', function () {
        var textPool = new TextPool_1.TextPool();
        var id1 = textPool.put('Hi', '1');
        var id2 = textPool.put('Hi', '1');
        chai_1.expect(id2).to.equal(id1);
    });
    it('should get textId', function () {
        var textPool = new TextPool_1.TextPool();
        var id = textPool.put('Hi', '1');
        chai_1.expect(textPool.getId('Hi')).to.equal(id);
    });
    it('should get separate text ids of different roots', function () {
        var textPool = new TextPool_1.TextPool();
        var id1 = textPool.put('Hi1', '1');
        var id2 = textPool.put('Hi2', '2');
        var id3 = textPool.put('Hi3', '1');
        chai_1.expect(id1).to.equal('text_1_0');
        chai_1.expect(id2).to.equal('text_2_0');
        chai_1.expect(id3).to.equal('text_1_1');
    });
});
//# sourceMappingURL=TextPoolTest.js.map