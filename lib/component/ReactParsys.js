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
var React = require("react");
var ResourceComponent_1 = require("./ResourceComponent");
var ReactParsys = (function (_super) {
    __extends(ReactParsys, _super);
    function ReactParsys() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ReactParsys.prototype.renderBody = function () {
        var children = this.renderChildren(null, this.props.childClassName, this.props.childElementName);
        return React.createElement(this.props.elementName || 'div', { className: this.props.className }, children);
    };
    ReactParsys.prototype.getDepth = function () {
        return 1;
    };
    return ReactParsys;
}(ResourceComponent_1.ResourceComponent));
exports.ReactParsys = ReactParsys;
//# sourceMappingURL=ReactParsys.js.map