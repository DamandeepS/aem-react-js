"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ResourceUtils_1 = require("../ResourceUtils");
var calculateSelectors = function (selectors, options) {
    if (options !== undefined) {
        if (options.addSelectors !== undefined) {
            return selectors.concat(options.addSelectors);
        }
        if (options.selectors !== undefined) {
            return options.selectors;
        }
    }
    return selectors || [];
};
exports.calculateSelectors = calculateSelectors;
var AbstractSling = (function () {
    function AbstractSling() {
    }
    AbstractSling.prototype.getContainingPagePath = function () {
        return ResourceUtils_1.ResourceUtils.getContainingPagePath(this.getRequestPath());
    };
    return AbstractSling;
}());
exports.AbstractSling = AbstractSling;
//# sourceMappingURL=Sling.js.map