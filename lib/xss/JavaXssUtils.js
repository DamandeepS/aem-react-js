"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var xss = require("xss");
var JavaXssUtils = (function () {
    function JavaXssUtils(xssApi) {
        this.xssApi = xssApi;
    }
    JavaXssUtils.prototype.processText = function (text, context) {
        if (context === void 0) { context = 'text'; }
        return context === 'text'
            ? this.escapeHtml(text)
            : context === 'html' ? this.xssApi.filterHTML(text) : text;
    };
    JavaXssUtils.prototype.escapeHtml = function (text) {
        return xss.escapeHtml(text);
    };
    return JavaXssUtils;
}());
exports.JavaXssUtils = JavaXssUtils;
//# sourceMappingURL=JavaXssUtils.js.map