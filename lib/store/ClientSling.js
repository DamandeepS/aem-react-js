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
/**
 * ClientSling gets all data from the cache.
 * If the data is not available then it will get the part of the cache which
 * corresponds to the given component from the server.
 */
var ClientSling = (function (_super) {
    __extends(ClientSling, _super);
    function ClientSling(cache, origin, fetchWindow, delayInMillis) {
        var _this = _super.call(this) || this;
        _this.cache = cache;
        _this.origin = origin;
        _this.fetchWindow = !fetchWindow
            ? window
            : fetchWindow;
        return _this;
    }
    ClientSling.prototype.load = function (listener, path, options) {
        var _this = this;
        if (options === void 0) { options = { selectors: [] }; }
        if (options.skipData) {
            listener({});
            return;
        }
        var depth = !options || typeof options.depth === 'undefined' || options.depth === null
            ? 0
            : options.depth;
        var resource = this.cache.get(path, depth);
        if (resource === null || typeof resource === 'undefined') {
            // const depthAsString = depth < 0 ? 'infinity' : options.depth + '';
            // TODO what about depth as string??
            var url = "" + this.origin + path + ".json.html";
            // + depthAsString + ".json";
            var serverRenderingParam = 'serverRendering=disabled';
            var serverRendering = window.location.search.indexOf(serverRenderingParam) >= 0;
            if (serverRendering) {
                url += '?' + serverRenderingParam;
            }
            return this.fetchWindow
                .fetch(url, { credentials: 'same-origin' })
                .then(function (response) {
                if (response.status === 404) {
                    return {};
                }
                else {
                    /* istanbul ignore if  */
                    if (_this.delayInMillis) {
                        var promise = new Promise(function (resolve, reject) {
                            window.setTimeout(function () {
                                resolve(response.json());
                            }, _this.delayInMillis);
                        });
                        return promise;
                    }
                    return response.json();
                }
            })
                .then(function (json) {
                _this.cache.mergeCache(json);
                listener(_this.cache.get(path, depth));
            });
        }
        else {
            listener(resource);
        }
    };
    ClientSling.prototype.renderDialogScript = function (path, resourceType) {
        // TODO Can we get the script from the server too?.
        // This will probably not work as the returned script is
        // not executed as in the initial server rendering case.
        // For react router we need to do a reload anyways.
        return this.cache.getScript(path);
    };
    ClientSling.prototype.includeResource = function (path, selectors, resourceType, options) {
        // Currently cannot be loaded from server alone.
        return this.cache.getIncluded(path, selectors, options);
    };
    ClientSling.prototype.getRequestPath = function () {
        return window.location.pathname;
    };
    return ClientSling;
}(Sling_1.AbstractSling));
exports.ClientSling = ClientSling;
//# sourceMappingURL=ClientSling.js.map