"use strict";
// tslint:disable no-any
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
var chai_1 = require("chai");
var ResourceComponent_1 = require("../../component/ResourceComponent");
var Cache_1 = require("../Cache");
var ClientSling_1 = require("../ClientSling");
describe('ClientSling', function () {
    it('should include resource', function () {
        var html = '<div></div>';
        var cache = new Cache_1.Cache();
        var sling = new ClientSling_1.ClientSling(cache, null);
        cache.putIncluded('/test', null, html);
        var actualHtml = sling.includeResource('/test', null, '/component/test', {});
        chai_1.expect(actualHtml).to.equal(html);
    });
    it('should include dialog', function () {
        var dialog = { element: 'el' };
        var cache = new Cache_1.Cache();
        var sling = new ClientSling_1.ClientSling(cache, null);
        cache.putScript('/test', dialog);
        var actualDialog = sling.renderDialogScript('/test', '/component/test');
        chai_1.expect(actualDialog).to.deep.equal(dialog);
    });
    it('should subscribe to cached resource', function () {
        var resource = {};
        var cache = new Cache_1.Cache();
        var sling = new ClientSling_1.ClientSling(cache, null);
        var path = '/test';
        cache.put(path, resource);
        var actualResource;
        var listener = new (function (_super) {
            __extends(MockResourceComponent, _super);
            function MockResourceComponent() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            MockResourceComponent.prototype.changedResource = function (_resource) {
                actualResource = _resource;
            };
            MockResourceComponent.prototype.renderBody = function () {
                /* */
            };
            return MockResourceComponent;
        }(ResourceComponent_1.ResourceComponent))();
        sling.load(listener.changedResource.bind(listener), path, {
            depth: 1,
            selectors: []
        });
        chai_1.expect(actualResource).to.equal(resource);
    });
    it('should subscribe to resource', function () {
        var actualUrl;
        var resource = { data: { text: 'hi' }, depth: 1 };
        var resources = { resources: { '/test': resource } };
        var cache = new Cache_1.Cache();
        var sling = new ClientSling_1.ClientSling(cache, '/url', {
            fetch: function (url, options) {
                actualUrl = url;
                return {
                    then: function (cb) {
                        return cb({
                            json: function () {
                                return {
                                    then: function (cb2) {
                                        cb2(resources);
                                    }
                                };
                            }
                        });
                    }
                };
            }
        });
        var path = '/test';
        var actualResource;
        var listener = function (_resource) {
            actualResource = _resource;
        };
        sling.load(listener, path, {
            depth: 1,
            selectors: []
        });
        chai_1.expect(actualUrl).to.equal('/url/test.json.html');
        chai_1.expect(actualResource).to.deep.equal(resource.data);
    });
});
//# sourceMappingURL=ClientSlingTest.js.map