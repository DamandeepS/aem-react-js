"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Sling_1 = require("../store/Sling");
var MockSling = (function (_super) {
    __extends(MockSling, _super);
    function MockSling(cache, data) {
        var _this = _super.call(this) || this;
        _this.cache = cache;
        _this.data = data;
        return _this;
    }
    MockSling.prototype.load = function (listener, path, options) {
        var resource = this.cache.get(path, options ? options.depth : null);
        if (resource) {
            listener(resource);
        }
    };
    MockSling.prototype.renderDialogScript = function () {
        if (this.data) {
            return this.data;
        }
        return { element: 'div', attributes: { className: 'dialog' } };
    };
    MockSling.prototype.includeResource = function (path, selectors, resourceType) {
        return "<include resourcetype='" + resourceType + "' selectors='" + selectors.join('.') + "'path='" + path + "'></include>";
    };
    MockSling.prototype.getRequestPath = function () {
        return 'mockRequestPath';
    };
    return MockSling;
}(Sling_1.AbstractSling));
exports.MockSling = MockSling;
//# sourceMappingURL=MockSling.js.map