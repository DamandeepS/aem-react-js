"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var xss = require("xss");
var JsXssUtils = (function () {
    function JsXssUtils() {
    }
    JsXssUtils.prototype.processText = function (text, context) {
        if (context === void 0) { context = 'text'; }
        if (!text) {
            return '';
        }
        return context === 'text'
            ? this.escapeHtml(text)
            : context === 'html' ? this.filterHTML(text) : text;
    };
    JsXssUtils.prototype.escapeHtml = function (text) {
        return xss.escapeHtml(text);
    };
    JsXssUtils.prototype.filterHTML = function (text) {
        return text.replace(/<script>.*<\/script>/, '');
    };
    return JsXssUtils;
}());
exports.JsXssUtils = JsXssUtils;
//# sourceMappingURL=JsXssUtils.js.map