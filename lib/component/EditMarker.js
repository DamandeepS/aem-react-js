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
var EditMarker = (function (_super) {
    __extends(EditMarker, _super);
    function EditMarker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EditMarker.prototype.render = function () {
        if (this.getWcmmode() === 'edit') {
            return (React.createElement("h3", { className: "placeholder" }, this.props.label));
        }
        else {
            return null;
        }
    };
    return EditMarker;
}(AemComponent_1.AemComponent));
exports.EditMarker = EditMarker;
//# sourceMappingURL=EditMarker.js.map