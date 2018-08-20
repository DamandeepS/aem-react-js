"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var jsdom_1 = require("jsdom");
var TextPool_1 = require("../TextPool");
var TextUtils_1 = require("../TextUtils");
describe('TextUtils', function () {
    it('should revive text', function () {
        var textPool = new TextPool_1.TextPool();
        var text = 'A012345678901234567890123';
        var id = textPool.put(text, '1');
        var text1 = 'B012345678901234567890123';
        var id1 = textPool.put(text1, '1');
        var body = "<body><div><span data-react-text=" + id + ">" + text + "</span>\n<span data-react-text=" + id1 + ">" + text1 + "</span></div></body>";
        var doc = new jsdom_1.JSDOM(body).window.document;
        var reviver = TextUtils_1.reviveFactory(doc.body);
        var state = {
            a: { $innerHTML: id },
            b: { $innerHTML: id1 }
        };
        var parsed = JSON.parse(JSON.stringify(state), reviver);
        chai_1.expect(parsed.a).to.equal(text);
        chai_1.expect(parsed.b).to.equal(text1);
    });
    it('should throw error if text not found', function () {
        var doc = new jsdom_1.JSDOM('<body><div><span>Hi</span></div></body>').window
            .document;
        var reviver = TextUtils_1.reviveFactory(doc.body);
        var error;
        try {
            JSON.parse('{"$innerHTML": "text_1"}', reviver);
        }
        catch (e) {
            error = e;
        }
        chai_1.expect(error.message).to.not.eq('');
    });
    it('should create innerHTML prop ', function () {
        var textPool = new TextPool_1.TextPool();
        var text = 'Moin';
        var id = textPool.put(text, '1');
        var json = JSON.stringify({ mytext: text }, TextUtils_1.replaceFactory(textPool));
        chai_1.expect(JSON.parse(json).mytext.$innerHTML).to.eq(id);
    });
    it('should keep text if not in pool', function () {
        var textPool = new TextPool_1.TextPool();
        var text = 'Hi';
        var json = JSON.stringify({ mytext: text }, TextUtils_1.replaceFactory(textPool));
        chai_1.expect(JSON.parse(json).mytext).to.eq(text);
    });
});
//# sourceMappingURL=TextUtilsTest.js.map