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
var PropTypes = require("prop-types");
var React = require("react");
var RootComponent = (function (_super) {
    __extends(RootComponent, _super);
    function RootComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RootComponent.prototype.getChildContext = function () {
        return {
            aemContext: this.props.aemContext,
            path: this.props.path,
            root: this.props.id,
            selectors: this.props.selectors,
            wcmmode: this.props.wcmmode
        };
    };
    RootComponent.prototype.render = function () {
        return React.createElement(this.props.component, {
            path: this.props.path,
            root: true,
            skipRenderDialog: !this.props.renderRootDialog,
            wcmmode: this.props.wcmmode
        });
    };
    RootComponent.childContextTypes = {
        aemContext: PropTypes.object.isRequired,
        path: PropTypes.string.isRequired,
        root: PropTypes.string,
        selectors: PropTypes.arrayOf(PropTypes.string),
        wcmmode: PropTypes.string
    };
    return RootComponent;
}(React.Component));
exports.RootComponent = RootComponent;
//# sourceMappingURL=RootComponent.js.map