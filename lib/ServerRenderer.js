"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactDom = require("react-dom/server");
var RootComponent_1 = require("./component/RootComponent");
var TextPool_1 = require("./component/text/TextPool");
var TextUtils_1 = require("./component/text/TextUtils");
var ServerRenderer = (function () {
    function ServerRenderer(registry, container) {
        this.registry = registry;
        this.container = container;
    }
    ServerRenderer.prototype.renderReactComponent = function (path, resourceType, wcmmode, renderAsJson, reactContext, selectors) {
        if (renderAsJson === void 0) { renderAsJson = false; }
        if (reactContext === void 0) { reactContext = { rootNo: 1, textPool: new TextPool_1.TextPool() }; }
        if (selectors === void 0) { selectors = []; }
        var component = this.registry.getComponent(resourceType, selectors);
        if (!component) {
            throw new Error('Cannot find component for resourceType: ' + resourceType);
        }
        var ctx = {
            container: this.container,
            registry: this.registry
        };
        // TODO we must safe this value in reactContext and increment it everytime
        var id = String(reactContext.rootNo);
        var root = this.registry.rootDecorator(React.createElement(RootComponent_1.RootComponent, { aemContext: ctx, component: component, id: id, path: path, wcmmode: wcmmode, selectors: selectors, renderRootDialog: !!renderAsJson }));
        var html = ReactDom.renderToString(root);
        var state = renderAsJson
            ? JSON.stringify(this.container.cache.getFullState())
            : JSON.stringify(this.container.cache.getFullState(), TextUtils_1.replaceFactory(this.container.textPool));
        return { html: html, state: state, reactContext: reactContext };
    };
    return ServerRenderer;
}());
exports.ServerRenderer = ServerRenderer;
//# sourceMappingURL=ServerRenderer.js.map