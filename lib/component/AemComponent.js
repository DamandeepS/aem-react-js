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
var AemComponent = (function (_super) {
    __extends(AemComponent, _super);
    function AemComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /* istanbul ignore next */
    AemComponent.prototype.getWcmmode = function () {
        return this.context.wcmmode;
    };
    AemComponent.prototype.getPath = function () {
        return this.context.path;
    };
    AemComponent.prototype.getSelectors = function () {
        return this.context.selectors;
    };
    AemComponent.prototype.isWcmEnabled = function () {
        return !this.getWcmmode() || this.getWcmmode() !== 'disabled';
    };
    /* istanbul ignore next */
    AemComponent.prototype.getRegistry = function () {
        return this.context.aemContext.registry;
    };
    /* istanbul ignore next */
    AemComponent.prototype.getOsgiService = function (name) {
        return this.getContainer().getOsgiService(name);
    };
    /* istanbul ignore next */
    AemComponent.prototype.getResourceModel = function (name, options) {
        if (options === void 0) { options = {}; }
        return this.getContainer().getResourceModel(this.getExtendedPath(options), this.getSelectors(), name);
    };
    /* istanbul ignore next */
    AemComponent.prototype.getRequestModel = function (name, options) {
        if (options === void 0) { options = {}; }
        return this.getContainer().getRequestModel(this.getExtendedPath(options), this.getSelectors(), name);
    };
    AemComponent.prototype.getXssApi = function () {
        return this.getContainer().cqx.getXssApi();
    };
    AemComponent.prototype.getAemContext = function () {
        return this.context.aemContext;
    };
    AemComponent.prototype.getContainer = function () {
        return this.context.aemContext.container;
    };
    AemComponent.prototype.getExtendedPath = function (options) {
        return (this.getPath() +
            (options.path && options.path.length > 0 ? '/' + options.path : ''));
    };
    AemComponent.contextTypes = {
        aemContext: PropTypes.object.isRequired,
        path: PropTypes.string.isRequired,
        root: PropTypes.string,
        selectors: PropTypes.array,
        wcmmode: PropTypes.string
    };
    return AemComponent;
}(React.Component));
exports.AemComponent = AemComponent;
//# sourceMappingURL=AemComponent.js.map