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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ResourceUtils_1 = require("./ResourceUtils");
var AemComponent_1 = require("./component/AemComponent");
var Sling_1 = require("./store/Sling");
var ResourceInclude = (function (_super) {
    __extends(ResourceInclude, _super);
    function ResourceInclude() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ResourceInclude.prototype.render = function () {
        var selectors = Sling_1.calculateSelectors(this.getSelectors(), this.props.options);
        var componentClass = this.getRegistry().getComponent(this.props.resourceType, selectors);
        if (!!componentClass) {
            var finalProps = {
                extraProps: this.props.extraProps,
                path: this.props.path,
                selectors: selectors
            };
            return React.createElement(componentClass, finalProps);
        }
        else {
            var innerHTML = void 0;
            var path = ResourceUtils_1.ResourceUtils.isAbsolutePath(this.props.path)
                ? this.props.path
                : this.getPath() + "/" + this.props.path;
            var sling = this.context.aemContext.container.sling;
            innerHTML = sling.includeResource(path, selectors, this.props.resourceType, this.props.options || {});
            var id = this.getContainer().textPool.put(innerHTML, this.context.root);
            return React.createElement(this.props.element || 'div', __assign({}, this.props.attrs, { className: this.props.className, dangerouslySetInnerHTML: { __html: innerHTML }, 'data-react-text': id, hidden: !!this.props.hidden }));
        }
    };
    return ResourceInclude;
}(AemComponent_1.AemComponent));
exports.ResourceInclude = ResourceInclude;
//# sourceMappingURL=ResourceInclude.js.map