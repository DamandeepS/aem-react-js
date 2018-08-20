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
var ResourceInclude_1 = require("../ResourceInclude");
var ResourceUtils_1 = require("../ResourceUtils");
var Sling_1 = require("../store/Sling");
var compare_1 = require("../utils/compare");
var AemComponent_1 = require("./AemComponent");
var EditDialog_1 = require("./EditDialog");
var STATE;
(function (STATE) {
    STATE[STATE["LOADING"] = 0] = "LOADING";
    STATE[STATE["LOADED"] = 1] = "LOADED";
    STATE[STATE["FAILED"] = 2] = "FAILED";
})(STATE = exports.STATE || (exports.STATE = {}));
/**
 * Provides base functionality for components that are
 */
var ResourceComponent = (function (_super) {
    __extends(ResourceComponent, _super);
    function ResourceComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ResourceComponent.prototype.getChildContext = function () {
        return {
            path: this.getPath(),
            selectors: this.getSelectors(),
            wcmmode: this.getWcmmode()
        };
    };
    ResourceComponent.prototype.shouldComponentUpdate = function (nextProps, nextState, nextCtx) {
        return (!compare_1.shallowEqual(this.props, nextProps) ||
            !compare_1.shallowEqual(this.state, nextState) ||
            !compare_1.shallowEqual(this.context.path, nextCtx.path));
    };
    ResourceComponent.prototype.componentWillUpdate = function (newProps, newState, newContext) {
        this.loadIfNecessary(this.createPath(newProps, newContext), newProps.selectors);
    };
    ResourceComponent.prototype.componentWillMount = function () {
        this.load(this.getPath(), this.props.selectors);
    };
    ResourceComponent.prototype.loadIfNecessary = function (path, selectors) {
        if (path !== this.getPath()) {
            // TODO compare selectors
            this.loadingState = undefined;
            this.getAemContext().container.sling.load(this.changedResource.bind(this), path, {
                depth: this.getDepth(),
                selectors: selectors,
                skipData: this.isSkipData() || false
            });
            if (this.loadingState !== STATE.LOADED) {
                this.loadingState = STATE.LOADING;
            }
        }
    };
    ResourceComponent.prototype.load = function (path, selectors) {
        this.loadingState = undefined;
        this.getAemContext().container.sling.load(this.changedResource.bind(this), path, {
            depth: this.getDepth(),
            selectors: selectors,
            skipData: this.isSkipData() || false
        });
        if (this.loadingState !== STATE.LOADED) {
            this.loadingState = STATE.LOADING;
        }
    };
    ResourceComponent.prototype.getSelectors = function () {
        return this.props.selectors || this.context.selectors || [];
    };
    ResourceComponent.prototype.getWcmmode = function () {
        return this.props.wcmmode || this.context.wcmmode;
    };
    ResourceComponent.prototype.getPath = function () {
        return this.createPath(this.props, this.context);
    };
    ResourceComponent.prototype.render = function () {
        var child;
        if (this.loadingState === STATE.LOADING) {
            child = this.renderLoading();
        }
        else if (!!this.props.skipRenderDialog) {
            return this.renderBody();
        }
        else {
            child = this.renderBody();
        }
        return (React.createElement(EditDialog_1.EditDialog, { path: this.getPath(), resourceType: this.getResourceType(), className: this.props.className }, child));
    };
    ResourceComponent.prototype.getRegistry = function () {
        return this.context.aemContext.registry;
    };
    ResourceComponent.prototype.getResource = function () {
        return this.resource;
    };
    ResourceComponent.prototype.getResourceType = function () {
        return this.context.aemContext.registry.getResourceType(this);
    };
    ResourceComponent.prototype.changedResource = function (resource) {
        if (this.loadingState === STATE.LOADING) {
            // assuming that load has only set the state to
            // LOADING if the method was called asynchronuously after load.
            this.loadingState = STATE.LOADED;
            this.resource = resource;
            this.forceUpdate();
        }
        else {
            this.loadingState = STATE.LOADED;
            this.resource = resource;
        }
    };
    ResourceComponent.prototype.renderLoading = function () {
        return React.createElement("span", null, "Loading");
    };
    ResourceComponent.prototype.getDepth = function () {
        return 0;
    };
    ResourceComponent.prototype.isSkipData = function () {
        return false;
    };
    ResourceComponent.prototype.renderChildren = function (path, childClassName, childElementName, includeOptions) {
        var _this = this;
        if (childClassName === void 0) { childClassName = ''; }
        if (includeOptions === void 0) { includeOptions = {}; }
        if (path && path.match(/^\//)) {
            throw new Error('path must be relative. was ' + path);
        }
        var childrenResource = !!path
            ? this.getResource()[path]
            : this.getResource();
        var children = ResourceUtils_1.ResourceUtils.getChildren(childrenResource);
        var childComponents = [];
        var basePath = !!path ? path + '/' : '';
        // TODO alternatively create a div for each child
        // and set className/elementName there
        Object.keys(children).forEach(function (nodeName, childIdx) {
            var resource = children[nodeName];
            var resourceType = resource['sling:resourceType'];
            var actualPath = basePath + nodeName;
            var componentType = _this.getRegistry().getComponent(resourceType, Sling_1.calculateSelectors(_this.getSelectors(), includeOptions));
            if (childElementName) {
                if (componentType) {
                    var props = {
                        key: nodeName,
                        path: actualPath,
                        reactKey: path,
                        resource: resource
                    };
                    childComponents.push(React.createElement(childElementName, {
                        className: childClassName,
                        key: nodeName
                    }, React.createElement(componentType, props)));
                }
                else {
                    childComponents.push(React.createElement(childElementName, {
                        className: childClassName,
                        key: nodeName
                    }, React.createElement(ResourceInclude_1.ResourceInclude, {
                        key: nodeName,
                        options: includeOptions,
                        path: actualPath,
                        resourceType: resourceType
                    })));
                }
            }
            else {
                if (componentType) {
                    var props = {
                        className: childClassName,
                        key: nodeName,
                        path: basePath + nodeName,
                        reactKey: path,
                        resource: resource
                    };
                    childComponents.push(React.createElement(componentType, props));
                }
                else {
                    childComponents.push(React.createElement(ResourceInclude_1.ResourceInclude, { className: childClassName, element: childElementName, path: actualPath, key: nodeName, resourceType: resourceType, options: includeOptions }));
                }
            }
        }, this);
        var newZone = null;
        if (this.isWcmEnabled()) {
            var parsysPath = path ? path + '/*' : '*';
            var resourceType = 'foundation/components/parsys/new';
            newZone = (React.createElement(ResourceInclude_1.ResourceInclude, { key: "newZone", element: "div", path: parsysPath, resourceType: resourceType }));
            childComponents.push(newZone);
        }
        return childComponents;
    };
    ResourceComponent.prototype.createPath = function (props, context) {
        return ResourceUtils_1.ResourceUtils.createPath(context.path, props.path);
    };
    ResourceComponent.childContextTypes = {
        path: PropTypes.string.isRequired,
        selectors: PropTypes.arrayOf(PropTypes.string),
        wcmmode: PropTypes.string
    };
    return ResourceComponent;
}(AemComponent_1.AemComponent));
exports.ResourceComponent = ResourceComponent;
//# sourceMappingURL=ResourceComponent.js.map