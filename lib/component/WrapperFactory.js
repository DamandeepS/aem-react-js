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
var ResourceComponent_1 = require("./ResourceComponent");
var Wrapper = (function (_super) {
    __extends(Wrapper, _super);
    function Wrapper(config, props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.config = config;
        return _this;
    }
    Wrapper.prototype.create = function () {
        var _this = this;
        var children;
        var props = this.getResource();
        if (this.config.props) {
            Object.keys(this.config.props).forEach(function (key) { return (props[key] = _this.config.props[key]); });
        }
        var newProps = this.transform(props);
        if (this.config.parsysFactory) {
            children = this.config.parsysFactory(this, newProps);
        }
        else if (!!this.config.parsys) {
            children = this.renderChildren(this.config.parsys.path, this.config.parsys.childClassName, this.config.parsys.childElementName, this.config.parsys.includeOptions);
        }
        var finalProps = __assign({}, newProps, this.props.extraProps);
        return React.createElement(this.config.component, finalProps, children);
    };
    Wrapper.prototype.renderBody = function () {
        return this.create();
    };
    Wrapper.prototype.isSkipData = function () {
        return true;
    };
    Wrapper.prototype.renderLoading = function () {
        var loadingComponent = this.config.loadingComponent;
        if (loadingComponent) {
            return React.createElement(loadingComponent, this.props);
        }
        return React.createElement("span", null, "Loading");
    };
    Wrapper.prototype.transform = function (props) {
        var existingProps = this.getContainer().cache.getTransform(this.getPath(), this.getSelectors());
        if (existingProps) {
            return existingProps;
        }
        var javaApi = this.getContainer().createJavaApi(this.getPath(), this.getSelectors());
        var newProps = this.config.transform
            ? this.config.transform(props, javaApi)
            : props;
        this.getContainer().cache.putTransform(this.getPath(), this.getSelectors(), newProps);
        return newProps;
    };
    return Wrapper;
}(ResourceComponent_1.ResourceComponent));
exports.Wrapper = Wrapper;
var WrapperFactory = (function () {
    function WrapperFactory() {
    }
    /**
     *
     * @param config
     * @param resourceType
     * @return {TheWrapper}
     */
    WrapperFactory.createWrapper = function (config, resourceType) {
        return (function (_super) {
            __extends(TheWrapper, _super);
            function TheWrapper(props, context) {
                return _super.call(this, config, props, context) || this;
            }
            TheWrapper.prototype.getResourceType = function () {
                return resourceType;
            };
            return TheWrapper;
        }(Wrapper));
    };
    return WrapperFactory;
}());
exports.WrapperFactory = WrapperFactory;
//# sourceMappingURL=WrapperFactory.js.map