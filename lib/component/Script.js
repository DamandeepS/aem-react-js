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
var AemComponent_1 = require("./AemComponent");
var Script = (function (_super) {
    __extends(Script, _super);
    function Script() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Script.prototype.render = function () {
        return React.createElement('script', {
            dangerouslySetInnerHTML: { __html: this.props.js }
        });
    };
    return Script;
}(AemComponent_1.AemComponent));
exports.Script = Script;
//# sourceMappingURL=Script.js.map