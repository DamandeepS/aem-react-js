"use strict";
/* tslint:disable no-any no-unused-expression */
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var JsXssUtils_1 = require("../JsXssUtils");
describe('JsXssUtils', function () {
    it('should encode all tags', function () {
        var result = new JsXssUtils_1.JsXssUtils().processText('<span>Hallo</span>', 'text');
        chai_1.expect(result).to.equal('&lt;span&gt;Hallo&lt;/span&gt;');
    });
    it('should encode undefined as empty string', function () {
        var result = new JsXssUtils_1.JsXssUtils().processText(undefined, 'text');
        chai_1.expect(result).to.equal('');
    });
    it('should encode null as empty string', function () {
        var result = new JsXssUtils_1.JsXssUtils().processText(null, 'text');
        chai_1.expect(result).to.equal('');
    });
    it('should remove script tags', function () {
        var result = new JsXssUtils_1.JsXssUtils().processText('Guten<script>Hallo</script>', 'html');
        chai_1.expect(result).to.equal('Guten');
    });
});
//# sourceMappingURL=JsXssUtilsTest.js.map