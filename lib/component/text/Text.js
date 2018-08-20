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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var AemComponent_1 = require("../AemComponent");
exports.poolableLength = 20;
var Text = (function (_super) {
    __extends(Text, _super);
    function Text() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Text.prototype.render = function () {
        var Component = this.props.element;
        var passThroughs = this.getPassThroughs();
        var text = this.props.value;
        var poolable = text && text.length > exports.poolableLength;
        var safeText = this.getContainer().xssUtils.processText(text, this.props.context);
        if (poolable) {
            var pool = this.getAemContext().container.textPool;
            var id = pool.put(text, this.context.root);
            return (React.createElement(Component, __assign({ dangerouslySetInnerHTML: { __html: safeText } }, passThroughs, { "data-react-text": id })));
        }
        else {
            return (React.createElement(Component, __assign({ dangerouslySetInnerHTML: { __html: safeText } }, passThroughs)));
        }
    };
    Text.prototype.getPassThroughs = function () {
        var _a = this.props, element = _a.element, value = _a.value, dangerouslySetInnerHTML = _a.dangerouslySetInnerHTML, id = _a.id, context = _a.context, passThroughs = __rest(_a, ["element", "value", "dangerouslySetInnerHTML", "id", "context"]);
        return passThroughs;
    };
    return Text;
}(AemComponent_1.AemComponent));
exports.Text = Text;
//# sourceMappingURL=Text.js.map