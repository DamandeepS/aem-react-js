"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var enzyme = require("enzyme");
var React = require("react");
var JsXssUtils_1 = require("../../../xss/JsXssUtils");
var Text_1 = require("../Text");
var TextPool_1 = require("../TextPool");
/*tslint:disable-next-line*/
require("../../../test/setup");
describe('Text', function () {
    it('should render span with text', function () {
        var textPool = new TextPool_1.TextPool();
        var xssUtils = new JsXssUtils_1.JsXssUtils();
        var aemContext = {
            container: { textPool: textPool, xssUtils: xssUtils }
        };
        var text = "<a>text</a><script>alert('hi')</script>";
        var item = enzyme.shallow(React.createElement(Text_1.Text, { value: text, element: "span", className: "test", context: "html" }), {
            context: { aemContext: aemContext, root: 'root' }
        });
        chai_1.expect(item.html()).to.equal('<span class="test" data-react-text="text_root_0"><a>text</a></span>');
        chai_1.expect(textPool.getId(text)).to.equal('text_root_0');
    });
    it('should render span with context text', function () {
        var textPool = new TextPool_1.TextPool();
        var xssUtils = new JsXssUtils_1.JsXssUtils();
        var aemContext = {
            container: { textPool: textPool, xssUtils: xssUtils }
        };
        var item = enzyme.shallow(React.createElement(Text_1.Text, { value: "<a>01234567890123456789</a>", element: "span", className: "test", context: "html" }), {
            context: { aemContext: aemContext, root: 'root' }
        });
        chai_1.expect(item.html()).to.equal('<span class="test" data-react-text="text_root_0">' +
            '<a>01234567890123456789</a>' +
            '</span>');
        chai_1.expect(textPool.getId('<a>01234567890123456789</a>')).to.equal('text_root_0');
    });
    it('should render span with context text without pooling', function () {
        var textPool = new TextPool_1.TextPool();
        var xssUtils = new JsXssUtils_1.JsXssUtils();
        var aemContext = {
            container: { textPool: textPool, xssUtils: xssUtils }
        };
        var item = enzyme.shallow(React.createElement(Text_1.Text, { value: "<a>short</a>", element: "span", className: "test", context: "html" }), {
            context: { aemContext: aemContext, root: 'root' }
        });
        chai_1.expect(item.html()).to.equal('<span class="test"><a>short</a></span>');
    });
});
//# sourceMappingURL=TextTest.js.map