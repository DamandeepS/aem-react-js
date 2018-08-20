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
var Sling_1 = require("./Sling");
var ServerSling = (function (_super) {
    __extends(ServerSling, _super);
    function ServerSling(cache, sling) {
        var _this = _super.call(this) || this;
        _this.cache = cache;
        _this.sling = sling;
        return _this;
    }
    ServerSling.prototype.load = function (listener, path, options) {
        if (options === void 0) { options = { selectors: [] }; }
        var depth = typeof options.depth !== 'number' ? -1 : options.depth;
        var skipData = !!options.skipData;
        var resource = this.cache.get(path, depth);
        if (!resource) {
            resource = JSON.parse(this.sling.getResource(path, depth));
            if (!resource) {
                resource = {};
            }
            if (!skipData) {
                this.cache.put(path, resource, depth);
            }
        }
        listener(resource);
    };
    ServerSling.prototype.renderDialogScript = function (path, resourceType) {
        var script = this.sling.renderDialogScript(path, resourceType);
        var dialog = null;
        if (script) {
            dialog = JSON.parse(script);
        }
        this.cache.putScript(path, dialog);
        return dialog;
    };
    ServerSling.prototype.includeResource = function (path, selectors, resourceType, options) {
        // TODO we are not passing selectors modified within react tree
        var included = this.sling.includeResource(path, resourceType, options && !!options.addSelectors ? options.addSelectors.join(',') : null, options && !!options.selectors ? options.selectors.join(',') : null, options && typeof options.decorationTagName === 'string'
            ? options.decorationTagName
            : null);
        this.cache.putIncluded(path, selectors, included, options || {});
        return included;
    };
    ServerSling.prototype.getRequestPath = function () {
        return this.sling.getPagePath();
    };
    return ServerSling;
}(Sling_1.AbstractSling));
exports.ServerSling = ServerSling;
//# sourceMappingURL=ServerSling.js.map